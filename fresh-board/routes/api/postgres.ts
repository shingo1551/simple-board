import { HandlerContext } from "$fresh/server.ts";

// deno run --allow-net --allow-read mod.ts
import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

export const handler = async (_req: Request, _ctx: HandlerContext) => {
  const config = {
    database: "postgres",
    hostname: "db.uffutgvhycnzromcrulu.supabase.co",
    password: "Hodogaya502",
    port: 5432,
    user: "postgres",
    tls: {
      caCertificates: [
        await Deno.readTextFile(
          new URL("../../prod-ca-2021.crt", import.meta.url),
        ),
      ],
      enabled: false,
    },
  }
  const client = new Client(config);

  await client.connect();
  const result = await client.queryArray('select * from post');
  console.log(result.rows);
  await client.end();

  return new Response("supabase!");
};
