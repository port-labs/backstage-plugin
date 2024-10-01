# Port Backstage Plugins Workspace

This workspace contains the Port Backstage plugins, which integrate Port's functionality into your Backstage instance.

## Structure

The workspace is organized into two main packages:

1. `backend-plugin`: Contains the backend implementation of the Port Backstage plugin.
2. `frontend-plugin`: Contains the frontend implementation of the Port Backstage plugin.

## Getting Started

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
