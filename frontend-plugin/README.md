# Port Backstage Frontend Plugin

To use these plugins you need to get a license from [Port](https://backstage-plugin.getport.io/)

## Structure

This frontend plugin is part of a larger workspace that includes both frontend and backend components for integrating Port with Backstage. The workspace structure is as follows:

1. `frontend-plugin` (this package): Contains the frontend implementation of the Port Backstage plugin.
2. `backend-plugin`: Contains the backend implementation of the Port Backstage plugin.

This README focuses on the frontend plugin, which provides the user interface components and functionality for interacting with Port within your Backstage instance.

## Getting Started

### Warning: Beta Status

⚠️ **Please Note**: The Port Backstage plugins are currently in beta. While we are actively developing and improving these plugins, they may not be fully stable or feature-complete. Users may encounter bugs or limitations. We appreciate your patience and feedback as we work towards a stable release.

We encourage users to report any issues or suggestions through our GitHub repository. Your feedback is invaluable in helping us improve these plugins.

### Installation

To integrate the Port Backstage plugins into your Backstage deployment, follow these steps:

1. Install the frontend and backend plugins:

   ```bash
   # In your Backstage root directory
   yarn add --cwd packages/app @port-labs/backstage-plugin-port-frontend
   yarn add --cwd packages/backend @port-labs/backstage-plugin-port-backend
   ```

2. Configure the `app-config.yaml` file:

   Add the following configuration to your `app-config.yaml`:

   ```yaml
   port:
     api:
       baseUrl: https://api.getport.io # Replace with your Port API base URL if different
       auth:
         clientId: YOUR_CLIENT_ID
         clientSecret: YOUR_CLIENT_SECRET
   ```

   Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with the actual credentials provided by Port.

3. Follow the specific setup instructions in the README files of the backend and frontend plugins for additional configuration steps.
