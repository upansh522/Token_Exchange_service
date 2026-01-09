import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { neon } from "@neondatabase/serverless";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from one level up (src/.env)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL not found in environment variables.");
  console.error("Looking for .env at:", path.resolve(__dirname, "../.env"));
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Connected to Neon! PostgreSQL Version: ${version}`);
  } catch (err) {
    console.error("Database Error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Database connection failed: " + err.message);
  }
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Environment loaded from:", path.resolve(__dirname, "../.env"));
});