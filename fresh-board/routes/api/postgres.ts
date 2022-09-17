import { HandlerContext } from "$fresh/server.ts";

// deno run --allow-net --allow-read mod.ts
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

export const handler = async (_req: Request, _ctx: HandlerContext) => {
  const config = "postgresql://postgres:Hodogaya502@db.uffutgvhycnzromcrulu.supabase.co:5432/postgres"
  const client = new Client(config);

  await client.connect();
  const result = await client.queryArray('select * from post');
  console.log(result.rows);
  await client.end();

  return new Response("supabase!");
};
