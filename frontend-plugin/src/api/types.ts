export interface IWithChangeLog {
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

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

type JQQuery = { jqQuery: string };

export type UserInputs = {
  properties: Record<string, any>;
  order?: string[];
  required?: string[];
};

export type CalculatedUserInputs = {
  properties: Record<string, any>;
  order?: string[];
  required?: unknown;
};

type NotificationFormat = "json" | "slack";

export type ActionTrigger = {
  operation: "CREATE" | "DELETE" | "DAY-2";
  userInputs: UserInputs;
};

export type Action = {
  id: string;
  identifier: string;
  blueprint: string;
  trigger: ActionTrigger;
  description?: string;
  approvalNotification?:
    | { type: "email" }
    | { type: "webhook"; url: string; format?: NotificationFormat };
  userInputs: UserInputs;
  requiredApproval?: boolean | { type: "ANY" | "ALL" };
  invocationMethod:
    | { type: "KAFKA" }
    | {
        type: "WEBHOOK";
        agent?: boolean;
        url: string;
        synchronized?: boolean;
        method?: "POST" | "DELETE" | "PATCH" | "PUT";
      }
    | {
        type: "GITHUB";
        org: string;
        repo: string;
        workflow: string;
        omitPayload?: boolean;
        omitUserInputs?: boolean;
        reportWorkflowStatus?: boolean;
      }
    | {
        type: "GITLAB";
        projectName: string;
        groupName: string;
        omitPayload?: boolean;
        omitUserInputs?: boolean;
        defaultRef?: string;
        agent: boolean;
      }
    | {
        type: "AZURE-DEVOPS";
        webhook: string;
        org: string;
      }
    | { type: "MOCK" };
  title?: string;
  icon?: string;
} & IWithChangeLog;

export type GlobalActionSelfServiceTrigger = {
  type: "self-service";
  blueprintIdentifier?: string;
  userInputs: UserInputs;
} & (
  | {
      operation: "CREATE";
    }
  | {
      operation: "DELETE" | "DAY-2";
      condition?: {
        type: "SEARCH";
        combinator: "and" | "or";
        rules: any;
      };
    }
);

export type GlobalActionAutomationTrigger = {
  type: "automation";
  event: StrictUnion<
    | {
        type: "ENTITY_CREATED";
        blueprintIdentifier: string;
      }
    | {
        type: "ENTITY_UPDATED";
        blueprintIdentifier: string;
      }
    | {
        type: "ENTITY_DELETED";
        blueprintIdentifier: string;
      }
    | {
        type: "TIMER_PROPERTY_EXPIRED";
        blueprintIdentifier: string;
        propertyIdentifier: string;
      }
    | {
        type: "ANY_ENTITY_CHANGE";
        blueprintIdentifier: string;
      }
    | {
        type: "RUN_CREATED";
        actionIdentifier: string;
      }
    | {
        type: "RUN_UPDATED";
        actionIdentifier: string;
      }
    | {
        type: "ANY_RUN_CHANGE";
        actionIdentifier: string;
      }
  >;
  condition?: {
    type: "JQ";
    expressions: string[];
    combinator?: "and" | "or";
  };
};

type KafkaInvocationAction = {
  type: "KAFKA";
  payload?: string | unknown[] | Record<string, any>;
};

type WebhookInvocationAction = {
  type: "WEBHOOK";
  url: string;
  agent?: boolean | string;
  synchronized?: boolean | string;
  method?: string;
  headers?: Record<string, string>;
  body?: string | unknown[] | Record<string, any>;
};

type GithubInvocationAction = {
  type: "GITHUB";
  org: string;
  repo: string;
  workflow: string;
  reportWorkflowStatus?: boolean | string;
  workflowInputs?: Record<string, any>;
};

type GitlabInvocationAction = {
  type: "GITLAB";
  projectName: string;
  groupName: string;
  defaultRef?: string;
  pipelineVariables?: Record<string, any>;
};

type AzureDevopsInvocationAction = {
  type: "AZURE_DEVOPS";
  webhook: string;
  org: string;
  payload?: string | unknown[] | Record<string, any>;
};

export type UpsertEntityInvocationAction = {
  type: "UPSERT_ENTITY";
  blueprintIdentifier: string;
  mapping: {
    identifier?: string;
    title?: string;
    team?: string | string[];
    icon?: string;
    properties?: Record<string, any>;
    relations?: Record<string, string | string[] | null>;
  };
};

export type ActionInvocationType = StrictUnion<
  | KafkaInvocationAction
  | WebhookInvocationAction
  | GithubInvocationAction
  | GitlabInvocationAction
  | AzureDevopsInvocationAction
  | UpsertEntityInvocationAction
>;

type UnionKeys<T> = T extends T ? keyof T : never;
type StrictUnionHelper<T, TAll> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<TAll>, keyof T>, undefined>>
  : never;
export type StrictUnion<T> = StrictUnionHelper<T, T>;

export type GlobalAction<
  T extends StrictUnion<ActionInvocationType> = ActionInvocationType
> = Pick<
  Action,
  | "identifier"
  | "title"
  | "icon"
  | "description"
  | "requiredApproval"
  | "approvalNotification"
> & {
  id: string;
  trigger: StrictUnion<
    GlobalActionSelfServiceTrigger | GlobalActionAutomationTrigger
  >;
  invocationMethod: T;
  publish?: boolean;
} & IWithChangeLog;
