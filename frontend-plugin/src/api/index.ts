import { ConfigApi, createApiRef, FetchApi } from "@backstage/core-plugin-api";
import { PORT_PROXY_PATH } from "./consts";
import { Action, GlobalAction } from "./types";

export const portApiRef = createApiRef<PortAPI>({
  id: "plugin.port.service",
});

type Options = {
  fetchApi: FetchApi;
  configApi: ConfigApi;
};

export class PortAPI {
  private readonly fetchApi: FetchApi;
  private readonly configApi: ConfigApi;
  private readonly backendApiUrl: string;

  constructor(options: Options) {
    this.fetchApi = options.fetchApi;
    this.configApi = options.configApi;

    this.backendApiUrl = this.configApi.getString("backend.baseUrl");
  }

  private getUrl(path: string) {
    return `${this.backendApiUrl}${PORT_PROXY_PATH}${path}`;
  }

  async getActions(blueprintId: string): Promise<(GlobalAction | Action)[]> {
    const response = await this.fetchApi.fetch(
      this.getUrl(`/actions?blueprint_identifier=${blueprintId}&version=v2`),
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch actions (${response.status}): ${response.statusText}`
      );
    }
    const json = await response.json();

    return json.actions;
  }

  async executeAction(
    actionId: string,
    entityId: string,
    properties: Record<string, string> = {}
  ): Promise<Response> {
    const cleanupEmptyProperties = (properties: Record<string, string>) => {
      return Object.fromEntries(
        Object.entries(properties).filter(([_, v]) => v !== "")
      );
    };

    const response = await this.fetchApi.fetch(
      this.getUrl(`/actions/${actionId}/runs`),
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entity: entityId,
          properties: cleanupEmptyProperties(properties),
        }),
      }
    );

    return response;
  }
}
