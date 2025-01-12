import { ApiHooks } from '@port-labs/backstage-plugin-framework';

export type ScorecardStats = {
  name: string;
  levels: {
    [key: string]: number;
  };
};

export function useInitiatives() {
  const blueprintId = 'backstage_plugins';
  const {
    data: scorecards,
    loading,
    error,
  } = ApiHooks.useScorecardsByBlueprint(blueprintId);
  const { data: pluginsRawData } = ApiHooks.useSearchQuery({
    combinator: 'and',
    rules: [
      {
        property: '$blueprint',
        operator: '=',
        value: blueprintId,
      },
    ],
  });

  const stats: ScorecardStats[] =
    scorecards?.map(scorecard => {
      const levels: Record<string, number> = {};

      pluginsRawData?.forEach(plugin => {
        const level =
          plugin.scorecards?.[scorecard.identifier]?.level ?? 'default';
        levels[level] = (levels[level] ?? 0) + 1;
      });

      return {
        name: scorecard.title,
        levels,
      };
    }) ?? [];

  return {
    stats,
    loading,
    error,
  };
}
