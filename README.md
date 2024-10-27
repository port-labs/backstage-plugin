# Port Backstage Plugins

This repo contains the Port Backstage plugins, which integrate Port's functionality into your Backstage instance.

To use these plugins you need to get a license from [Port](https://backstage-plugin.getport.io/)

## Structure

The repo is organized into two main packages:

1. `backend-plugin`: Contains the backend implementation of the Port Backstage plugin.
2. `frontend-plugin`: Contains the frontend implementation of the Port Backstage plugin.

## Getting Started

## Warning: Beta Status

⚠️ **Please Note**: The Port Backstage plugins are currently in beta. While we are actively developing and improving these plugins, they may not be fully stable or feature-complete. Users may encounter bugs or limitations. We appreciate your patience and feedback as we work towards a stable release.

We encourage users to report any issues or suggestions through our GitHub repository. Your feedback is invaluable in helping us improve these plugins.

## Development

To integrate the Port Backstage plugins into your Backstage deployment, follow these steps:

1. Install the backend and frontend plugins:

   ```bash
   # In your Backstage root directory
   yarn add --cwd packages/backend @port-labs/backstage-plugin-port-backend
   yarn add --cwd packages/app @port-labs/backstage-plugin-frontend-port
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

Please refer to the individual README files in each plugin directory for specific instructions on how to develop, build, and test each plugin.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository or contact Port Labs support.
