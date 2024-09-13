import { PORT_PROXY_PATH } from "./consts";

export async function getAllScorecardDefinitions(
  backendApiUrl: string
): Promise<Response> {
  const response = await fetch(
    `${backendApiUrl}${PORT_PROXY_PATH}/scorecards`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}
