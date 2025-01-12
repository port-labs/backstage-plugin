import { ApiHooks } from '@port-labs/backstage-plugin-framework';

export type Plugin = {
  title: string;
  status: string;
  owner: string;
  type: string;
  uptime: number;
  scorecards: Record<string, string>;
  datadog_uptime: string;
};

const blueprintId = 'backstage_plugins';
export function usePlugins() {
  const {
    data: pluginsRawData,
    loading,
    error,
  } = ApiHooks.useSearchQuery({
    combinator: 'and',
    rules: [
      {
        property: '$blueprint',
        operator: '=',
        value: blueprintId,
      },
    ],
  });
  const { data: scorecards } = ApiHooks.useScorecardsByBlueprint(blueprintId);

  const plugins: Plugin[] = (pluginsRawData ?? [])
    .map(item => ({
      title: item.title ?? '',
      status: (item.properties.status ?? 'Not Running') as string,
      owner: item.team?.[0] ?? '',
      type: (item.properties.type ?? '') as string,
      uptime: (item.properties.uptime ?? 0) as number,
      version: (item.properties.version ?? '') as string,
      datadog_uptime: (item.properties.uptime ?? '') as string,
      scorecards: Object.fromEntries(
        scorecards?.map(scorecard => [
          scorecard.title,
          item.scorecards?.[scorecard.identifier]?.level ?? 'Basic',
        ]) ?? [],
      ),
    }))
    .sort(a => (a.type !== 'unknown' ? -1 : 1));

  return {
    plugins,
    loading,
    error,
  };
}
