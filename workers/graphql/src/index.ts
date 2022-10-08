export interface Env {
  DATABASE_URL: string;
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

import { createServer } from "@graphql-yoga/common";
//import { schema } from "@gspacex/lib-graphql";
import { Settings, configure } from "@gspacex/lib-settings";

export default {
  async fetch(request: Request, env: Settings, ctx: ExecutionContext) {
    configure(env);
    const { schema } = await import("@gspacex/lib-graphql");
    const server = createServer<{ env: Env; ctx: ExecutionContext }>({
      schema,
    });
    return server.handleRequest(request, { env, ctx });
  },
};