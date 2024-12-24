---
title: Dev Daily Plugin
description: A dashboard that consolidates developers' daily activities like pull requests, tasks and reviews to help plan and manage their day.
sidebar_position: 2
---

import JiraIntegration from "../integrations/jira.mdx";
import GithubIntegration from "../integrations/github.mdx";

# Dev Daily Plugin

The Dev Daily Plugin provides developers with a consolidated dashboard of their daily development activities, including pull requests, tasks, and reviews. This plugin helps developers efficiently plan and manage their day by bringing together key information in one place.

![Dev Daily Plugin Dashboard](/img/dev-daily/plan-my-day.png)

## Prerequisites

- Complete the [Getting Started](/getting-started) guide
- Jira and Github accounts with the necessary permissions
  - For Jira obtain a [API Token](https://id.atlassian.com/manage-profile/security/api-tokens)

## Setup integrations

In your Backstage instance, click the **Settings** button on the bottom left and click on the **Port** tab.

![Port Settings](/img/settings-page.png)

Yours will be empty, so you'll need to add your Jira and Github integrations.

Click on the **Add Integration** button, and follow the instructions to add both Jira and Github integrations.

<GithubIntegration />

<JiraIntegration />

## Setup the mappings & blueprints

In your Backstage instance, click the **Settings** button on the bottom left and click on the **Port** tab.

### Add the blueprints - Pull Request & Task

Click on **Add Blueprint** and add the following two blueprints:

<details>
<summary>Pull Request Blueprint</summary>

```json
{
  "identifier": "dev-daily-pull-request",
  "title": "Pull Request",
  "icon": "Github",
  "schema": {
    "properties": {
      "creator": {
        "title": "Creator",
        "type": "string"
      },
      "assignees": {
        "title": "Assignees",
        "type": "array"
      },
      "reviewers": {
        "title": "Reviewers",
        "type": "array"
      },
      "status": {
        "title": "Status",
        "type": "string",
        "enum": ["merged", "open", "closed"],
        "enumColors": {
          "merged": "purple",
          "open": "green",
          "closed": "red"
        }
      },
      "closedAt": {
        "title": "Closed At",
        "type": "string",
        "format": "date-time"
      },
      "updatedAt": {
        "title": "Updated At",
        "type": "string",
        "format": "date-time"
      },
      "mergedAt": {
        "title": "Merged At",
        "type": "string",
        "format": "date-time"
      },
      "link": {
        "format": "url",
        "type": "string"
      }
    },
    "required": []
  },
  "mirrorProperties": {},
  "calculationProperties": {},
  "aggregationProperties": {},
  "relations": {}
}
```

</details>

<details>
<summary>Task Blueprint</summary>

```json
{
  "identifier": "dev-daily-task",
  "title": "Task",
  "icon": "Jira",
  "schema": {
    "properties": {
      "assignee": {
        "type": "string",
        "title": "Assignee"
      },
      "status": {
        "icon": "DefaultProperty",
        "title": "Status",
        "type": "string",
        "enum": ["To Do", "In Progress", "Done"],
        "enumColors": {
          "To Do": "turquoise",
          "In Progress": "yellow",
          "Done": "green"
        }
      },
      "link": {
        "type": "string",
        "title": "Link",
        "format": "url"
      }
    },
    "required": ["assignee", "status", "link"]
  },
  "mirrorProperties": {},
  "calculationProperties": {},
  "aggregationProperties": {},
  "relations": {}
}
```

</details>

### Add the mappings

Click on the `MAPPING` button near the **GitHub** integration. and paste the following YAML:

<details>
<summary>Pull Request Mapping</summary>

```yaml
resources:
  - kind: pull-request
    selector:
      query: "true"
    port:
      entity:
        mappings:
          identifier: .head.repo.name + (.id|tostring)
          title: .title
          blueprint: '"dev-daily-pull-request"'
          properties:
            creator: .user.login
            assignees: "[.assignees[].login]"
            reviewers: "[.requested_reviewers[].login]"
            status: .status
            closedAt: .closed_at
            updatedAt: .updated_at
            mergedAt: .merged_at
            prNumber: .id
            link: .html_url
```

</details>

Now click on the `MAPPING` button near the **Jira** integration. and paste the following YAML:

<details>
<summary>Task Mapping</summary>

```yaml
deleteDependentEntities: true
createMissingRelatedEntities: true
enableMergeEntity: true
resources:
  - kind: issue
    selector:
      query: "true"
      jql: (created >= -1w) OR (updated >= -1w)
    port:
      entity:
        mappings:
          identifier: .key
          title: .fields.summary
          blueprint: '"dev-daily-task"'
          properties:
            link: (.self | split("/") | .[:3] | join("/")) + "/browse/" + .key
            status: .fields.status.statusCategory.name
            creator: .fields.creator.emailAddress
            created: .fields.created
            updated: .fields.updated
            resolutionDate: .fields.resolutiondate
            assignee: .fields.assignee.emailAddress
```

</details>

:::note
If you already have a mapping configured you should append the new mapping to the existing one.
:::

## Install the plugin

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

## See the plugin in action

![Dev Daily Plugin Dashboard](/img/dev-daily/plan-my-day.png)

:::note
You might need to wait 5-10 minutes for the integration setup to complete before you see the data in the plugin.
:::

## Troubleshooting

If you don't see the data in the plugin, you can check the following:

- Check if the integration setup is complete.
  - Login to Port dashboard, and check [data sources page](https://app.getport.io/settings/data-sources).
  - You will see a green checkmark next to the integration name.
- It could be that the plugin does not recognize the user you are logged in with.
  - Check on the top right corner of the page, under the **Viewer email** if the user is logged in with the correct account.
