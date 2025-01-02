# Devex Survey Plugin

Uncover the pains of your developers to improve your platform.

After fully understanding the pains of your developers, and after surveying your organization, we will suggest the best plan to improve your platform.

After the plan is executed, you should execute the survey again to see if the plan has worked. You should execute this survey on a regular basis to get a good understanding of the pains of your developers.

Blueprint:

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
      "email"
    ]
  },
  "mirrorProperties": {},
  "calculationProperties": {},
  "aggregationProperties": {},
  "relations": {}
}
```
