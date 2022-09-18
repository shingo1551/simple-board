import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

const config = {
  database: "postgres",
  hostname: "db.uffutgvhycnzromcrulu.supabase.co",
  password: "Hodogaya502",
  port: 5432,
  user: "postgres",
  tls: {
    caCertificates: [
      await Deno.readTextFile(
        new URL("../prod-ca-2021.crt", import.meta.url),
      ),
    ],
    enabled: false,
  },
}

export const client = new Client(config);
await client.connect();
console.log('postgres connected!');

// await client.end();
