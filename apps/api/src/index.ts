import { Elysia, t } from "elysia";
import { CloudflareAdapter } from "elysia/adapter/cloudflare-worker";
import { cors } from "@elysiajs/cors";

export default new Elysia({ adapter: CloudflareAdapter })
  .use(cors({
    origin: ["https://opencut.dacbbox.com", "http://localhost:5173"] // 允许生产环境和本地开发环境跨域请求
  }))
  .get("/", () => ({ status: "ok" }))
  .get("/health", () => ({ healthy: true, timestamp: new Date().toISOString() }))
  .post(
    "/echo",
    ({ body }) => body,
    {
      body: t.Object({ message: t.String() }),
    }
  )
  // .compile() is required — it triggers AoT compilation at startup
  .compile();
