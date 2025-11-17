import type { APIRoute } from "astro";
import fetch from "node-fetch";

const clientId = import.meta.env.GITHUB_CLIENT_ID!;
const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET!;

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
