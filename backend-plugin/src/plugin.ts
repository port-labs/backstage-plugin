import {
  coreServices,
  createBackendPlugin,
} from "@backstage/backend-plugin-api";
import { createRouter } from "./service/router";

/**
 * portPlugin backend plugin
 *
 * @public
 */
export const portPlugin = createBackendPlugin({
  pluginId: "port",
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        config: coreServices.rootConfig,
      },
      async init({ httpRouter, logger, config }) {
        httpRouter.use(
          await createRouter({
            logger,
            config,
          })
        );
        httpRouter.addAuthPolicy({
          path: "/", // TODO: support auth
          allow: "unauthenticated",
        });
      },
    });
  },
});
