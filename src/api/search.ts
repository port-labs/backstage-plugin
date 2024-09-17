export type PortEntity = {
  identifier: string;
  team: string[];
  icon: string;
  title: string;
  properties: Record<string, unknown>;
  relations: Record<string, string[] | string>;
};

export default async function search(
  backendApiUrl: string,
  searchQuery: object
): Promise<PortEntity[]> {
  const response = await fetch(
    `${backendApiUrl}/api/proxy/getport/entities/search`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchQuery),
    }
  );
  const json = await response.json();

  return json.entities;
}
