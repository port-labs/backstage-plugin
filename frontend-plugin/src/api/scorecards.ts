import { PORT_PROXY_PATH } from "./consts";

export async function getAllScorecardDefinitions(
  backendApiUrl: string,
  fFetch: typeof fetch
): Promise<Response> {
  const response = await fFetch(
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
