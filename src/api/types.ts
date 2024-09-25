export type EntityRelations = Record<string, string | string[] | null>;
export type ScorecardRuleCondition =
  | {
      property: string;
      operator: "=" | "!=" | ">" | "<" | ">=" | "<=";
      value: number;
    }
  | (({ property: string } | { relation: string }) & {
      property: string;
      operator:
        | "="
        | "!="
        | ">"
        | "<"
        | ">="
        | "<="
        | "contains"
        | "containsAny"
        | "beginsWith"
        | "endsWith"
        | "doesNotContains"
        | "doesNotBeginsWith"
        | "doesNotEndsWith"
        | "between"
        | "notBetween";
      value: string | any[];
    })
  | {
      property: string;
      operator: "=" | "!=";
      value: boolean;
    }
  | (({ property: string } | { relation: string }) & {
      operator: "isEmpty" | "isNotEmpty";
    });

export type PortEntity = {
  identifier: string;
  title?: string;
  team?: string[];
  icon?: string;
  blueprint: string;
  properties: Record<string, unknown>;
  relations?: EntityRelations;
  scorecards?: Record<
    string,
    {
      rules: {
        identifier: string;
        status: "SUCCESS" | "FAILURE";
        level: string;
        ruleResults: Array<{
          result: boolean;
          condition: ScorecardRuleCondition;
        }>;
      }[];
      level: string;
    }
  >;
};
