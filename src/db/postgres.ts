import dotenv from "dotenv";
import path from "path";
import { neon } from "@neondatabase/serverless";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

export const sql = neon(process.env.DATABASE_URL!);