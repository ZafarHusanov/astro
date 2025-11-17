import type { APIRoute } from "astro";
import fetch from "node-fetch";

const clientId = 'Ov23liWBillPJHIpfzWy';
const clientSecret = 'd59c3f282a4a5e23690f417e6d0c1d0e98341404';

export const get: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  const tokenRes = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: code || "",
    }),
  });

  const tokenData = await tokenRes.json();

  return new Response(JSON.stringify(tokenData), {
    headers: { "Content-Type": "application/json" },
  });
};
