---
title: DevEx Survey Plugin
description: A customizable survey tool to gather and analyze developer experience feedback across your organization.
sidebar_position: 3
---

# DevEx Survey Plugin

#### The only way to improve your platform is to understand the pains of your developers.

The DevEx Survey Plugin enables organizations to collect and analyze feedback about developer workflows, challenges, and productivity blockers. This plugin helps engineering leaders make data-driven decisions to improve developer experience and productivity by systematically identifying pain points across different development phases.

![DevEx Survey](/img/devex-survey/completing.gif)

## Prerequisites

- Complete the [Getting Started](/getting-started) guide
- Port account with admin access

## Setup the blueprint

In your Backstage instance, click the **Settings** button on the bottom left and click on the **Port** tab.

### Add the Survey Results blueprint

Click on **Add Blueprint** and add the following blueprint:

<details>
<summary>Survey Results Blueprint</summary>

```json
{
  "identifier": "survey_results",
  "title": "Survey Results",
  "icon": "Microservice",
  "schema": {
    "properties": {
      "blocking_your_flow": {
        "type": "string",
        "title": "Blocking Your Flow?",
        "enum": [
          "work_planning",
          "development_process",
          "shipping_features",
          "managing_production"
        ],
        "enumColors": {
          "work_planning": "lightGray",
          "development_process": "lightGray",
          "shipping_features": "lightGray",
          "managing_production": "lightGray"
        }
      },
      "work_planning_challenges": {
        "icon": "DefaultProperty",
        "title": "Work Planning Challenges",
        "type": "string",
        "enum": [
          "managing_tickets_prs",
          "resolving_bugs",
          "prioritizing_tasks",
          "fragmented_communication"
        ],
        "enumColors": {
          "managing_tickets_prs": "lightGray",
          "resolving_bugs": "lightGray",
          "prioritizing_tasks": "lightGray",
          "fragmented_communication": "lightGray"
        }
      },
      "development_process_challenges": {
        "type": "string",
        "title": "Development Process Challenges",
        "enum": [
          "maintaining_environment",
          "first_time_setup",
          "finding_documentation",
          "context_switching"
        ],
        "enumColors": {
          "maintaining_environment": "lightGray",
          "first_time_setup": "lightGray",
          "finding_documentation": "lightGray",
          "context_switching": "lightGray"
        }
      },
      "shipping_features_challenges": {
        "type": "string",
        "title": "Shipping Features Challenges",
        "enum": [
          "manual_deployments",
          "pipeline_failures",
          "running_migrations",
          "feature_toggles"
        ],
        "enumColors": {
          "manual_deployments": "lightGray",
          "pipeline_failures": "lightGray",
          "running_migrations": "lightGray",
          "feature_toggles": "lightGray"
        }
      },
      "managing_production_challenges": {
        "type": "string",
        "title": "Managing Production Challenges",
        "enum": [
          "service_health",
          "troubleshooting_outages",
          "understanding_infrastructure",
          "accessing_permissions"
        ],
        "enumColors": {
          "service_health": "lightGray",
          "troubleshooting_outages": "lightGray",
          "understanding_infrastructure": "lightGray",
          "accessing_permissions": "lightGray"
        }
      },
      "other_feedback": {
        "type": "string",
        "title": "Other feedback"
      },
      "email": {
        "type": "string",
        "title": "Email"
      }
    },
    "required": [
      "blocking_your_flow",
      "work_planning_challenges",
      "development_process_challenges",
      "shipping_features_challenges",
      "managing_production_challenges",
      "email"
    ]
  }
}
```

</details>

## Installation

Install the plugin in your Backstage instance:

```bash
yarn --cwd packages/app add @port-labs/backstage-plugin-devex-survey
```

## Configuration

Add the survey plugin page to your Backstage application.

In `packages/app/src/App.tsx`, add the route:

```tsx
import { DevExSurveyPage } from "@port-labs/backstage-plugin-devex-survey";
// ...
<Route path="/devex-survey" element={<DevExSurveyPage />} />;
```

Add the navigation item to `packages/app/src/components/Root/Root.tsx`:

```tsx
import PollIcon from "@material-ui/icons/Poll";
// ...
<SidebarItem icon={PollIcon} to="devex-survey" text="Developer Survey" />;
```

## Usage

### Creating a Survey

1. Navigate to the DevEx Survey page in your Backstage instance
2. Click "Create Survey" in the admin panel
3. Configure your survey questions and response options
4. Set the survey duration and target audience
5. Publish the survey

### Survey Categories

The survey covers four main areas of developer experience:

1. **Work Planning**

   - Managing tickets and PRs
   - Bug resolution
   - Task prioritization
   - Communication challenges

2. **Development Process**

   - Environment maintenance
   - First-time setup
   - Documentation access
   - Context switching

3. **Shipping Features**

   - Deployment processes
   - Pipeline management
   - Database migrations
   - Feature flag handling

4. **Production Management**
   - Service health monitoring
   - Outage troubleshooting
   - Infrastructure understanding
   - Access management

### Viewing Results

Access the results dashboard to view aggregated responses and analytics:

![Survey Results Dashboard](/img/devex-survey/results.png)

The dashboard provides:

- Response distribution across categories
- Trend analysis over time
- Key challenge area identification
- Time-based comparisons

## Best Practices

- Run surveys at regular intervals (e.g., quarterly)
- Share results with the engineering team for transparency
- Use insights to prioritize platform improvements
- Follow up on identified pain points with concrete actions

## Troubleshooting

If you encounter issues:

- Verify your Port configuration in the Backstage settings
- Check that users have the correct permissions
- Ensure your Backstage instance is properly configured with Port
- Contact support if you need additional assistance

## See it in Action

Watch a complete survey flow:

![Survey Completion Demo](/img/devex-survey/completing.gif)
