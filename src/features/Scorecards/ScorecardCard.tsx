import React, { useMemo } from "react";
import useEntityQuery from "../../hooks/useSearchQuery/useEntityQuery";
import { useServiceName } from "../../hooks/useServiceName";
import Scorecards from "./scorecards";

const SERVICE_BLUEPRINT_ID = "service";

export type ScorecardCardProps = {
  serviceName: string;
};

function ScorecardCard() {
  const serviceName = useServiceName();

  const { data: entityData } = useEntityQuery(
    serviceName,
    SERVICE_BLUEPRINT_ID
  );

  const scorecardComp = useMemo(() => {
    if (!entityData?.scorecards) return null;

    const scorecards = Object.entries(entityData.scorecards).map(
      ([scorecardId, scorecard]) => {
        return {
          name: scorecardId,
          level: scorecard.level as string,
          rules: scorecard.rules.map((rule) => ({
            name: rule.identifier as string,
            status: rule.status as string,
          })),
        };
      }
    );
    return <Scorecards name={serviceName ?? ""} scorecards={scorecards} />;
  }, [entityData, serviceName]);

  return scorecardComp;
}

export default ScorecardCard;
