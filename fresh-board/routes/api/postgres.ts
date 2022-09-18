import { HandlerContext } from "$fresh/server.ts";
import { client } from '../../shared/postgres.ts';

export const handler = async (_req: Request, _ctx: HandlerContext) => {
  const result = await client.queryArray('select * from post');
  console.log(result.rows);

  return new Response("supabase!");
};
