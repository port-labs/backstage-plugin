---
sidebar_position: 4
---

# Port SDK

The Port Backstage plugin is designed with flexibility in mind, allowing you to fully customize how data is presented in your Backstage instance. Since the Port SDK returns standard JavaScript objects, you have complete control over the presentation layer.

## Understanding the Data Structure

When you fetch data using the Port SDK, you receive plain JavaScript objects that you can manipulate and render however you prefer.

For example the following code fetches an entity from Port of type `SERVICE_BLUEPRINT_ID` with the identifier `SERVICE_NAME`:

```typescript
// Example of data returned from Port SDK
const { data: entityData } = useEntityQuery(SERVICE_NAME, SERVICE_BLUEPRINT_ID);
```

<details>
<summary>The data structure returned from the Port SDK hook</summary>

```typescript
const examplePortEntity: PortEntity = {
  identifier: "backend-service-001",
  title: "Backend Service API",
  team: ["backend-team", "platform-team"],
  icon: "api",
  blueprint: "microservice-blueprint",
  properties: {
    language: "typescript",
    version: "1.2.0",
    deploymentRegion: "us-east-1",
    isPublic: false,
  },
  relations: {
    "depends-on": ["database-001", "cache-service"],
    "maintained-by": "backend-team",
    "monitored-by": null,
  },
  scorecards: {
    "security-checks": {
      rules: [
        {
          identifier: "dependency-scan",
          status: "SUCCESS",
          level: "critical",
          ruleResults: [
            {
              result: true,
              condition: {
                property: "vulnerabilities",
                operator: "=",
                value: 0,
              },
            },
          ],
        },
        {
          identifier: "authentication-check",
          status: "FAILURE",
          level: "high",
          ruleResults: [
            {
              result: false,
              condition: {
                property: "auth-method",
                operator: "contains",
                value: "oauth2",
              },
            },
          ],
        },
      ],
      level: "critical",
    },
    "performance-checks": {
      rules: [
        {
          identifier: "response-time",
          status: "SUCCESS",
          level: "medium",
          ruleResults: [
            {
              result: true,
              condition: {
                property: "avg-response-time",
                operator: "<",
                value: 200,
              },
            },
          ],
        },
      ],
      level: "medium",
    },
  },
};
```

</details>

## Creating Custom Components

You can create your own components to display Port data in ways that match your organization's needs:

```typescript
import { useEntityQuery } from "@port-labs/backstage-plugin-port-frontend";

const CustomEntityCard = () => {
  const { data: entity, loading } = useEntityQuery("entity-id", "blueprint-id");

  if (loading) return <LoadingComponent />;

  return (
    <YourCustomCard>
      {/* Render entity data however you want */}
      <Title>{entity.title}</Title>
      <StatusBadge status={entity.properties.status} />
      {/* Add your custom styling and components */}
    </YourCustomCard>
  );
};
```

## Customization Examples

### 1. Custom Scorecard Visualization

Instead of using the default scorecard view, you can create your own visualization:

```typescript
const CustomScorecard = () => {
  const { scorecard } = usePortScorecard("scorecard-id");

  return (
    <CustomChart
      score={scorecard.score}
      rules={scorecard.rules}
      // Add your custom styling and logic
    />
  );
};
```

### 2. Custom Entity List

Create your own layout for displaying multiple entities:

```typescript
const CustomEntityList = () => {
  const { entities } = usePortEntities();

  return (
    <CustomGrid>
      {entities.map((entity) => (
        <CustomCard
          key={entity.id}
          title={entity.title}
          metrics={entity.properties.metrics}
          // Add your custom styling and components
        />
      ))}
    </CustomGrid>
  );
};
```

## Integration with Existing Components

You can easily integrate Port data with your existing Backstage components:

```typescript
import { Table } from "@backstage/core-components";

const PortDataTable = () => {
  const { entities } = usePortEntities();

  const columns = [
    { title: "Name", field: "title" },
    { title: "Owner", field: "properties.owner" },
    // Add more columns as needed
  ];

  return (
    <Table
      data={entities}
      columns={columns}
      // Use existing Backstage table features
    />
  );
};
```

## Best Practices

1. **Data Transformation**

   - Create utility functions to transform Port data into your preferred format
   - Keep transformation logic separate from presentation components

2. **Component Reusability**

   - Build reusable components that can handle different types of Port entities
   - Use TypeScript interfaces to ensure type safety

3. **Performance**

   - Implement proper loading states
   - Consider pagination for large data sets
   - Use memoization when appropriate

4. **Error Handling**
   - Add proper error boundaries
   - Provide meaningful feedback to users when data loading fails

## Available Hooks

The Port frontend plugin provides several hooks to help you access and manipulate data:

- `useEntityQuery`: Fetch a single entity. API Reference: [Get an Entity](https://docs.getport.io/api-reference/get-an-entity)
- `useSearchQuery`: Search for entities with a given query. API Reference: [Search Entities](https://docs.getport.io/api-reference/search-entities)
- `useActionRun`: Executes an action. API Reference: [Execute a Self-Service Action](https://docs.getport.io/api-reference/execute-a-self-service-action)
- `useActionsQuery`: Fetch available actions. API Reference: [List Actions](https://docs.getport.io/api-reference/get-actions-automations)
- And more...
