---
title: Dev Daily Plugin
description: A dashboard that consolidates developers' daily activities like pull requests, tasks and reviews to help plan and manage their day.
sidebar_position: 2
---

# Dev Daily Plugin

The Dev Daily Plugin provides developers with a consolidated dashboard of their daily development activities, including pull requests, tasks, and reviews. This plugin helps developers efficiently plan and manage their day by bringing together key information in one place.

![Dev Daily Plugin Dashboard](/img/dev-daily/plan-my-day.png)

## Prerequisites

- Complete the [Getting Started](/getting-started) guide
- Jira and Github accounts

## Install

```bash
yarn --cwd packages/app add @port-labs/backstage-plugin-dev-daily
```

Next, add the `DevDailyPage` component to your Backstage instance.

In the file `packages/app/src/App.tsx`, add the route:

```tsx
import { DevDailyPluginPage } from "@port-labs/backstage-plugin-dev-daily";
// ...
<Route path="/dev-daily" element={<DevDailyPluginPage />} />;
```

Then add the link to the NavBar, in the file: `packages/app/src/components/Root/Root.tsx`:

```tsx
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
// ...
<SidebarItem icon={AssignmentTurnedInIcon} to="dev-daily" text="Plan My Day" />;
```
