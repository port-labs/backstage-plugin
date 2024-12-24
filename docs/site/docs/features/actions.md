---
sidebar_position: 4
---

# Actions

Port's Actions feature allows you to interact with Port's action system directly from your Backstage instance. The plugin provides hooks to both query available actions and execute them.

## Understanding the Data Structure

When you fetch or execute actions using the Port SDK, you work with standard JavaScript objects:

```typescript
// Fetch available actions
const { data: actions } = useActionsQuery("my-blueprint-id");

// Execute an action
const { execute } = useActionRun();
```

<details>
<summary>Example of action data structure</summary>

```typescript
const exampleAction = {
  id: "action-123",
  identifier: "deploy-service",
  title: "Deploy Service",
  blueprint: "service-blueprint",
  trigger: {
    operation: "DAY-2",
    userInputs: {
      properties: {
        version: "string",
        environment: "string",
      },
      required: ["version"],
    },
  },
  invocationMethod: {
    type: "GITHUB",
    org: "my-org",
    repo: "my-repo",
    workflow: "deploy.yml",
  },
};
```

</details>

## Available Hooks

### `useActionsQuery`

Fetches actions associated with a specific blueprint. API Reference: [List Actions](https://docs.getport.io/api-reference/get-actions-automations)

```typescript
const { data, error, loading, execute } = useActionsQuery(blueprintId);
```

#### Parameters

- `blueprintId` (string): The identifier of the blueprint

#### Returns

- `data`: Array of actions (both global and blueprint-specific)
- `error`: Any error that occurred
- `loading`: Request status
- `execute`: Function to manually trigger the query

### `useActionRun`

Executes Port actions. API Reference: [Execute a Self-Service Action](https://docs.getport.io/api-reference/execute-a-self-service-action)

```typescript
const { execute, data, error, loading } = useActionRun();
```

#### Returns

- `execute(actionId, serviceName, formData)`: Function to run an action
- `data`: Execution response data
- `error`: Any error that occurred
- `loading`: Execution status

## Creating Custom Components

You can create your own components to display and execute actions:

```typescript
import {
  useActionsQuery,
  useActionRun,
} from "@port-labs/backstage-plugin-framework";

const CustomActionButton = ({ blueprintId, actionId }) => {
  const { data: actions } = useActionsQuery(blueprintId);
  const { execute, loading } = useActionRun();

  const handleClick = async () => {
    await execute(actionId, "my-service", {
      version: "1.0.0",
      environment: "production",
    });
  };

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? "Executing..." : "Run Action"}
    </Button>
  );
};
```

## Best Practices

1. **Error Handling**

   - Always handle potential errors from action execution
   - Provide meaningful feedback to users

2. **Loading States**

   - Show appropriate loading indicators during action execution
   - Disable action triggers while execution is in progress

3. **Validation**

   - Validate required inputs before executing actions
   - Check blueprint ID availability before querying actions

4. **User Feedback**
   - Display clear success/failure messages
   - Show execution progress when possible

## Integration with Existing Components

You can easily integrate Port actions with existing Backstage components:

```typescript
import { Table } from "@backstage/core-components";

const ActionsList = ({ blueprintId }) => {
  const { data: actions } = useActionsQuery(blueprintId);

  const columns = [
    { title: "Name", field: "title" },
    { title: "Type", field: "trigger.operation" },
    { title: "Description", field: "description" },
  ];

  return <Table data={actions || []} columns={columns} />;
};
```
