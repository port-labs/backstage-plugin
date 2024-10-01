import { PORT_PROXY_PATH } from "./consts";
import { Action, GlobalAction } from "./types";

export default async function getActions(
  backendApiUrl: string,
  blueprintId: string
): Promise<(GlobalAction | Action)[]> {
  const response = await fetch(
    `${backendApiUrl}${PORT_PROXY_PATH}/actions?blueprint_identifier=${blueprintId}&version=v2`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();

  return json.actions;
}

const cleanupEmptyProperties = (properties: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, v]) => v !== "")
  );
};

export async function executeAction(
  backendApiUrl: string,
  actionId: string,
  entityId: string,
  properties: Record<string, string> = {}
): Promise<Response> {
  const response = await fetch(
    `${backendApiUrl}${PORT_PROXY_PATH}/actions/${actionId}/runs`,
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
