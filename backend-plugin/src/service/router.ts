import { MiddlewareFactory } from "@backstage/backend-defaults/rootHttpRouter";
import {
  LoggerService,
  RootConfigService,
} from "@backstage/backend-plugin-api";
import express from "express";
import Router from "express-promise-router";
import { createProxyMiddleware } from "http-proxy-middleware";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../lib/api/auth";
import { getBaseUrl } from "../lib/api/consts";

export interface RouterOptions {
  logger: LoggerService;
  config: RootConfigService;
}

function isTokenExpired(token: string): boolean {
  if (!token) {
    return true;
  }

  const decodedToken = jwt.decode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  if (typeof decodedToken === "string") {
    return true;
  }
  if (!decodedToken?.exp) {
    return true;
  }
  return decodedToken.exp < currentTime;
}

export function createAuthMiddleware(options: {
  logger: LoggerService;
  config: RootConfigService;
}) {
  const { logger, config } = options;
  const baseUrl = config.getString("port.api.baseUrl");
  const clientId = config.getString("port.api.auth.clientId");
  const clientSecret = config.getString("port.api.auth.clientSecret");

  const router = Router();
  logger.info("Creating auth middleware");

  let accessToken: string | null = null;

  router.use(async (req, _, next) => {
    if (!accessToken || isTokenExpired(accessToken)) {
      logger.info("Creating access token");
      accessToken = await createAccessToken({
        clientId,
        clientSecret,
        domain: baseUrl,
      });
    }

    req.headers.authorization = `Bearer ${accessToken}`;
    next();
  });

  return router;
}

export function createPortProxyMiddleware(options: {
  logger: LoggerService;
  config: RootConfigService;
}) {
  const { logger, config } = options;
  const baseUrl = config.getString("port.api.baseUrl");

  const target = getBaseUrl(baseUrl);

  return createProxyMiddleware({
    target,
    logger,
    changeOrigin: true,
  });
}

export async function createRouter(
  options: RouterOptions
): Promise<express.Router> {
  const { logger, config } = options;
  const baseUrl = config.getString("port.api.baseUrl");
  const clientId = config.getString("port.api.auth.clientId");
  const clientSecret = config.getString("port.api.auth.clientSecret");

  const router = Router();
  router.use(express.json());

  router.get("/health", (_, response) => {
    logger.info("PONG!");
    response.json({ status: "ok" });
  });

  router.post("/auth/token", async (_, response) => {
    const accessToken = await createAccessToken({
      clientId,
      clientSecret,
      domain: baseUrl,
    });
    response.json({ accessToken });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());

  router.use(
    "/proxy",
    createAuthMiddleware(options),
    createPortProxyMiddleware(options)
  );
  return router;
}
