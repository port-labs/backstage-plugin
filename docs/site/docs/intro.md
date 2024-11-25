---
sidebar_position: 1
---

# Getting Started

Let's discover **Port's Backstage plugin in less than 5 minutes**.

### Prerequisites

- A Backstage instance
- A Port account
  - Visit [Port's website](https://www.getport.io) to create your **free** account.
  - Follow the onboarding process to set up your organization.

### Configure Credentials

1. In Port, on the top right, click on the `...` (three dots) and select **Credentials**.
2. Generate API credentials (Client ID and Client Secret)
3. Add these credentials to your Backstage's `app-config.yaml`:

   ```yaml
   port:
     api:
       baseUrl: https://api.getport.io
       auth:
         clientId: YOUR_CLIENT_ID
         clientSecret: YOUR_CLIENT_SECRET
   ```

<br />

Read more [find your Port credentials](https://docs.getport.io/build-your-software-catalog/custom-integration/api/#find-your-port-credentials)

### Install Plugins

Install frontend and backend plugins using yarn:

```bash
# Install backend plugin
yarn add --cwd packages/backend @port-labs/backstage-plugin-port-backend

# Install frontend plugin
yarn add --cwd packages/app @port-labs/backstage-plugin-port-frontend
```

Then register the backend plugin in `packages/backend/src/index.ts`:

```typescript
backend.add(import("@port-labs/backstage-plugin-port-backend"));
```

Finally, add components as you like from the frontend plugin to your Backstage instance.

For example, let's add the Scorecard component to the NavBar:

in the file: `packages/app/src/App.tsx`, add the route:

```typescript
<Route path="/scorecards" element={<ScorecardsPage />} />
```

and then add the link to the NavBar, in the file: `packages/app/src/components/Root/Root.tsx`:

```typescript
<SidebarItem icon={DoneAllIcon} to="scorecards" text="Scorecards" />
```

![Scorecards page](/img/scorecards.png)

## Extend your Backstage instance

Take your Backstage instance to the next level by integrating with Port's powerful API.

Start by reviewing our frontend plugin documentation to see what's possible. You can:

- Query Port's API to bring rich data into your Backstage views
- Create custom visualizations using Port's flexible data models
- Build tailored experiences for your teams

For complete API capabilities, check out our comprehensive [API documentation](https://docs.getport.io/api-reference/port-api).
