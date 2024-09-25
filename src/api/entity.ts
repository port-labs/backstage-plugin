import { PortEntity } from "./types";

export default async function getEntity(
  backendApiUrl: string,
  entityId: string,
  blueprintId: string
): Promise<PortEntity> {
  const response = await fetch(
    `${backendApiUrl}/api/proxy/getport/blueprints/${blueprintId}/entities/${entityId}`,
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
