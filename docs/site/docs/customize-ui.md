---
sidebar_position: 3
---

# Customize UI

The Port Backstage plugin is designed with flexibility in mind, allowing you to fully customize how data is presented in your Backstage instance. Since the Port SDK returns standard JavaScript objects, you have complete control over the presentation layer.

## Understanding the Data Structure

When you fetch data using the Port SDK, you receive plain JavaScript objects that you can manipulate and render however you prefer. For example:

```typescript
// Example of data returned from Port SDK
const entityData = {
  id: "entity-123",
  title: "My Service",
  properties: {
    owner: "team-a",
    status: "production",
    scorecard: {
      score: 85,
      rules: [
        /* ... */
      ],
    },
  },
};
```

## Creating Custom Components

You can create your own components to display Port data in ways that match your organization's needs:

```typescript
import { usePortEntity } from "@port-labs/backstage-plugin-port-frontend";

const CustomEntityCard = () => {
  const { entity, loading } = usePortEntity("entity-id");

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

- `usePortEntity`: Fetch a single entity
- `usePortEntities`: Fetch multiple entities
- `usePortScorecard`: Fetch scorecard data
- `usePortActions`: Access available actions
- And more...
