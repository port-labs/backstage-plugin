---
sidebar_position: 3
---

# Installation

### Install Plugins

Install frontend and backend plugins using yarn:

```bash
# Install backend plugin
yarn --cwd packages/backend add @port-labs/backstage-plugin-framework-backend

# Install frontend plugin
yarn --cwd packages/app add @port-labs/backstage-plugin-framework
```

Then register the backend plugin in `packages/backend/src/index.ts`:

```typescript
backend.add(import("@port-labs/backstage-plugin-framework-backend"));
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

### Configure Credentials

1. In Port, on the top right, click on the `...` (three dots) and select **Credentials**.
2. Generate API credentials (Client ID and Client Secret)
3. Add these credentials to your Backstage's `app-config.yaml`:

   ```yaml
   port:
     api:
       baseUrl: https://api.getport.io/
       auth:
         clientId: YOUR_CLIENT_ID
         clientSecret: YOUR_CLIENT_SECRET
   ```

<br />

Read more [find your Port credentials](https://docs.getport.io/build-your-software-catalog/custom-integration/api/#find-your-port-credentials)
