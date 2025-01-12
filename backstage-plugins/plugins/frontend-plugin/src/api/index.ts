import { UserEntity } from '@backstage/catalog-model';
import {
  ConfigApi,
  createApiRef,
  FetchApi,
  IdentityApi,
} from '@backstage/core-plugin-api';
import { CatalogApi } from '@backstage/plugin-catalog-react';
import yaml from 'yaml';
import {
  Action,
  Blueprint,
  GlobalAction,
  Integration,
  PortEntity,
  Scorecard,
} from './types';

export const PORT_PROXY_PATH = '/api/port/proxy';

export const portApiRef = createApiRef<PortAPI>({
  id: 'plugin.port.service',
});

type Options = {
  fetchApi: FetchApi;
  configApi: ConfigApi;
  identityApi: IdentityApi;
  catalogApi: CatalogApi;
};

export interface CreateEntityOptions {
  upsert?: boolean;
  merge?: boolean;
  validation_only?: boolean;
  create_missing_related_entities?: boolean;
  run_id?: string;
}

export interface CreateEntityPayload {
  identifier?: string;
  title?: string;
  icon?: string;
  team?: string | string[];
  properties: Record<string, any>;
  relations?: Record<string, string>;
}

export class PortAPI {
  private readonly fetchApi: FetchApi;
  private readonly configApi: ConfigApi;
  private readonly identityApi: IdentityApi;
  private readonly catalogApi: CatalogApi;
  private readonly backendApiUrl: string;

  constructor(options: Options) {
    this.fetchApi = options.fetchApi;
    this.configApi = options.configApi;
    this.identityApi = options.identityApi;
    this.catalogApi = options.catalogApi;
    this.backendApiUrl = this.configApi.getString('backend.baseUrl');
  }

  async getUserInfo() {
    const identity = await this.identityApi.getBackstageIdentity();
    const user = (await this.catalogApi.getEntityByRef(
      identity.userEntityRef,
    )) as UserEntity | undefined;

    if (!user) {
      return null;
    }
    return user;
  }

  private getUrl(path: string) {
    return `${this.backendApiUrl}${PORT_PROXY_PATH}${path}`;
  }

  async getActions(blueprintId: string): Promise<(GlobalAction | Action)[]> {
    const response = await this.fetchApi.fetch(
      this.getUrl(`/actions?blueprint_identifier=${blueprintId}&version=v2`),
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch actions (${response.status}): ${response.statusText}`,
      );
    }
    const json = await response.json();

    return json.actions;
  }

  async executeAction(
    actionId: string,
    entityId: string,
    properties: Record<string, string> = {},
  ): Promise<Response> {
    const cleanupEmptyProperties = (properties: Record<string, string>) => {
      return Object.fromEntries(
        Object.entries(properties).filter(([_, v]) => v !== ''),
      );
    };

    const response = await this.fetchApi.fetch(
      this.getUrl(`/actions/${actionId}/runs`),
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entity: entityId,
          properties: cleanupEmptyProperties(properties),
        }),
      },
    );

    return response;
  }

  async getEntity(entityId: string, blueprintId: string): Promise<PortEntity> {
    const response = await this.fetchApi.fetch(
      this.getUrl(`/blueprints/${blueprintId}/entities/${entityId}`),
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch entity (${response.status}): ${response.statusText}`,
      );
    }

    const json = await response.json();
    return json.entity;
  }

  async getAllScorecardDefinitions(): Promise<Response> {
    const response = await this.fetchApi.fetch(this.getUrl(`/scorecards`), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  }

  async getScorecardsByBlueprint(blueprintId: string): Promise<Scorecard[]> {
    const response = await this.fetchApi.fetch(
      this.getUrl(`/blueprints/${blueprintId}/scorecards`),
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const json = await response.json();

    return json.scorecards;
  }

  async search(searchQuery: object, include?: string[]): Promise<PortEntity[]> {
    const response = await this.fetchApi.fetch(
      this.getUrl(
        `/entities/search${
          include
            ? `?${include
                .map(i => `include=${encodeURIComponent(i)}`)
                .join('&')}`
            : ''
        }`,
      ),
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchQuery),
      },
    );
    const json = await response.json();

    return json.entities;
  }

  async createBlueprint(blueprint: string): Promise<any> {
    const response = await this.fetchApi.fetch(this.getUrl(`/blueprints/`), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: blueprint,
    });

    if (!response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText, {
        cause: response.status,
      });
    }

    const json = await response.json();

    return json.ok;
  }

  async getBlueprints(): Promise<Blueprint[]> {
    const response = await this.fetchApi.fetch(this.getUrl(`/blueprints/`), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    return json.blueprints;
  }

  async getIntegrations(): Promise<Integration[]> {
    const response = await this.fetchApi.fetch(this.getUrl(`/integration/`), {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    return json.integrations;
  }

  async updateIntegration(
    identifier: string,
    configYAML: string,
  ): Promise<any> {
    const config = yaml.parse(configYAML);
    const response = await this.fetchApi.fetch(
      this.getUrl(`/integration/${identifier}/config`),
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      },
    );

    if (!response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText, {
        cause: response.status,
      });
    }

    const json = await response.json();

    return json.ok;
  }

  async createEntity(
    blueprintId: string,
    entity: CreateEntityPayload,
    options: CreateEntityOptions = {},
  ): Promise<Response> {
    const queryParams = new URLSearchParams();

    if (options.upsert) queryParams.append('upsert', 'true');
    if (options.merge) queryParams.append('merge', 'true');
    if (options.validation_only) queryParams.append('validation_only', 'true');
    if (options.create_missing_related_entities)
      queryParams.append('create_missing_related_entities', 'true');
    if (options.run_id) queryParams.append('run_id', options.run_id);

    const response = await this.fetchApi.fetch(
      this.getUrl(
        `/blueprints/${blueprintId}/entities${
          queryParams.toString() ? `?${queryParams.toString()}` : ''
        }`,
      ),
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entity),
      },
    );

    if (!response.ok) {
      console.log(response.statusText);
      throw new Error(response.statusText, {
        cause: response.status,
      });
    }

    return response;
  }
}
