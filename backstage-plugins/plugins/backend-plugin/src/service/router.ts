import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import {
  LoggerService,
  RootConfigService,
} from '@backstage/backend-plugin-api';
import express from 'express';
import Router from 'express-promise-router';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import jwt from 'jsonwebtoken';
import { createAccessToken, PortApiAuth } from '../lib/api/auth';
import { buildPortUrl, getBaseUrl } from '../lib/api/consts';

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
  if (typeof decodedToken === 'string') {
    return true;
  }
  if (!decodedToken?.exp) {
    return true;
  }
  return decodedToken.exp < currentTime;
}

export function createAuthMiddleware(options: {
  logger: LoggerService;
  baseUrl: string;
  clientId: string;
  clientSecret: string;
}) {
  const { logger, baseUrl, clientId, clientSecret } = options;

  const router = Router();
  logger.info('Creating auth middleware');

  let accessToken: string | null = null;

  router.use(async (req, _, next) => {
    if (!accessToken || isTokenExpired(accessToken)) {
      logger.info('Creating access token');
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

async function isSuccessfulConfig({
  clientId,
  clientSecret,
  domain,
}: PortApiAuth) {
  const accessToken = await createAccessToken({
    clientId,
    clientSecret,
    domain,
  });

  const response = await fetch(buildPortUrl(domain, '/blueprints'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      identifier: 'plugin-framework-test',
      title: 'Plugin Framework Test',
      schema: {
        properties: {},
      },
    }),
  });

  return response.ok || response.status === 409; // 409 is returned if the blueprint already exists
}

export function createPortProxyMiddleware(options: {
  logger: LoggerService;
  baseUrl: string;
}) {
  const { logger, baseUrl } = options;

  const target = getBaseUrl(baseUrl);

  return createProxyMiddleware({
    target,
    logger,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
    },
  });
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Handler> {
  const { logger, config } = options;
  const portConfig = config.getConfig('port');
  const baseUrl = portConfig.getString('api.baseUrl');
  const clientId = portConfig.getString('api.auth.clientId');
  const clientSecret = portConfig.getString('api.auth.clientSecret');

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.post('/auth/token', async (_, response) => {
    const accessToken = await createAccessToken({
      clientId,
      clientSecret,
      domain: baseUrl,
    });
    response.json({ accessToken });
  });

  if (await isSuccessfulConfig({ clientId, clientSecret, domain: baseUrl })) {
    logger.info('Port API is configured successfully');
  } else {
    logger.error('Port API is not configured successfully');
  }

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());

  router.use(
    '/proxy',
    createAuthMiddleware({ logger, baseUrl, clientId, clientSecret }),
    createPortProxyMiddleware({ logger, baseUrl }),
  );
  return router;
}
