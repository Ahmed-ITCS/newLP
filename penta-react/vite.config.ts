import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { submitLead } from "./api/_ghl.js";

/**
 * Local-development stand-in for the Vercel function in `api/contact.js`.
 * In production the real serverless function handles /api/contact.
 */
function devContactApi(): Plugin {
  return {
    name: "dev-contact-api",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/contact", (req, res) => {
        res.setHeader("Content-Type", "application/json");

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", async () => {
          let data: Record<string, unknown>;
          try {
            data = JSON.parse(body || "{}");
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid JSON" }));
            return;
          }

          // Honeypot
          if (typeof data.website === "string" && data.website.trim()) {
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
            return;
          }

          if (typeof data.name !== "string" || typeof data.email !== "string") {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid form data" }));
            return;
          }

          try {
            const result = await submitLead({
              name: data.name,
              email: data.email,
              phone: typeof data.phone === "string" ? data.phone : "",
              message: typeof data.message === "string" ? data.message : "",
              source: "pentacipher.com (dev)",
            });

            if (!result.ok) {
              res.statusCode = 502;
              res.end(JSON.stringify({ error: "Could not submit your inquiry" }));
              return;
            }

            console.log("\n[dev] Lead submitted to GHL via", result.via, "\n");
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true }));
          } catch {
            res.statusCode = 502;
            res.end(
              JSON.stringify({ error: "Contact service temporarily unavailable" }),
            );
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Expose server-side env vars to the Node process used by the dev middleware.
  process.env.GHL_API_TOKEN ??= env.GHL_API_TOKEN;
  process.env.GHL_LOCATION_ID ??= env.GHL_LOCATION_ID;
  process.env.GHL_NOTIFY_EMAIL ??= env.GHL_NOTIFY_EMAIL;
  process.env.GHL_WEBHOOK_URL ??= env.GHL_WEBHOOK_URL;

  return {
    plugins: [react(), devContactApi()],
    server: {
      host: true,
      port: 5173,
    },
  };
});
