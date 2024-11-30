import { buildPortUrl } from "./consts";

export type PortApiAuth = {
  clientId: string;
  clientSecret: string;
  domain: string;
};

const PORT_AUTH_PATH = "/auth/access_token";
export async function createAccessToken({
  clientId,
  clientSecret,
  domain,
}: PortApiAuth) {
  const apiURL = buildPortUrl(domain, PORT_AUTH_PATH);

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      clientId,
      clientSecret,
    }),
  });

  const data = await response.json();
  return data.accessToken as string;
}
