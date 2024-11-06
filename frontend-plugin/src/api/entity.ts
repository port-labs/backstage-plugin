import { PORT_PROXY_PATH } from "./consts";
import { PortEntity } from "./types";

export default async function getEntity(
  backendApiUrl: string,
  entityId: string,
  blueprintId: string,
  fFetch: typeof fetch
): Promise<PortEntity> {
  const response = await fFetch(
    `${backendApiUrl}${PORT_PROXY_PATH}/blueprints/${blueprintId}/entities/${entityId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();

  return json.entity;
}
