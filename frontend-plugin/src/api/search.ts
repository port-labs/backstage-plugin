import { PORT_PROXY_PATH } from "./consts";
import { PortEntity } from "./types";

export default async function search(
  backendApiUrl: string,
  searchQuery: object,
  fFetch: typeof fetch,
  include?: string[]
): Promise<PortEntity[]> {
  const response = await fFetch(
    `${backendApiUrl}${PORT_PROXY_PATH}/entities/search${
      include
        ? `?${include.map((i) => `include=${encodeURIComponent(i)}`).join("&")}`
        : ""
    }`,
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
