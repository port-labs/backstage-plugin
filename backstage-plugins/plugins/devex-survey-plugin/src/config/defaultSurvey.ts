import { Survey } from '../components/SurveyForm';

export const defaultSurvey: Survey = {
  questions: [
    {
      id: 'primary_blocker',
      type: 'radio',
      title: "What's Blocking Your Flow The Most?",
      description:
        'Which of the following challenge spaces causes the most difficulty or is the most time-consuming in your daily workflows?',
      options: [
        {
          value: 'work_planning',
          label: 'Work Planning (e.g., managing tickets, PRs, prioritization)',
        },
        {
          value: 'development_process',
          label:
            'Development Process (e.g., local/remote environment setup, testing, configurations)',
        },
        {
          value: 'shipping_features',
          label: 'Shipping New Features (e.g., deploying, running migrations)',
        },
        {
          value: 'managing_production',
          label:
            'Managing Production (e.g., troubleshooting outages, service health monitoring)',
        },
      ],
      required: true,
    },
    {
      id: 'work_planning_challenges',
      type: 'radio',
      title: 'Work Planning Challenges',
      description:
        'Which challenge in the Work Planning space impacts you the most?',
      options: [
        {
          value: 'managing_tickets_prs',
          label: 'Managing Tickets and PRs',
        },
        {
          value: 'resolving_bugs',
          label: 'Resolving Bugs',
        },
        {
          value: 'prioritizing_tasks',
          label: 'Prioritizing Tasks or Security Issues',
        },
        {
          value: 'fragmented_communication',
          label: 'Fragmented Communication Across Tools',
        },
      ],
      required: true,
    },
    {
      id: 'development_process_challenges',
      type: 'radio',
      title: 'Development Process Challenges',
      description:
        'Which challenge in the Development Process space impacts you the most?',
      options: [
        {
          value: 'maintaining_environment',
          label: 'Maintaining Local/Dev Environment',
        },
        {
          value: 'first_time_setup',
          label: 'First-Time Setup of a Local/Dev Environment',
        },
        {
          value: 'finding_documentation',
          label: 'Finding Documentation or Service Owners',
        },
        {
          value: 'context_switching',
          label: 'Context Switching Between Tools',
        },
      ],
      required: true,
    },
    {
      id: 'shipping_features_challenges',
      type: 'radio',
      title: 'Shipping Features Challenges',
      description:
        'Which challenges impact you the most when shipping features?',
      options: [
        {
          value: 'manual_deployments',
          label: 'Manual Deployments or Rollbacks',
        },
        {
          value: 'pipeline_failures',
          label: 'Debugging Pipeline Failures',
        },
        {
          value: 'running_migrations',
          label: 'Running Migrations',
        },
        {
          value: 'feature_toggles',
          label: 'Managing Feature Toggles or Canaries',
        },
      ],
      required: true,
    },
    {
      id: 'managing_production_challenges',
      type: 'radio',
      title: 'Managing Production Challenges',
      description:
        'Which challenges impact you the most when managing production environments?',
      options: [
        {
          value: 'service_health',
          label: 'Understanding Service Health',
        },
        {
          value: 'troubleshooting_outages',
          label: 'Troubleshooting Outages and Conducting Root Cause Analysis',
        },
        {
          value: 'understanding_infrastructure',
          label: 'Understanding Infrastructure Dependencies and Architecture',
        },
        {
          value: 'accessing_permissions',
          label: 'Accessing Critical Permissions (e.g., Databases)',
        },
      ],
      required: true,
    },
    {
      id: 'feedback',
      type: 'text',
      title: 'Any other general feedback?',
      description:
        'Please share any other general feedback that you have about the platform and your developer experience.',
      multiline: true,
      rows: 4,
    },
  ],
};
