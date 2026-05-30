import path from "node:path";
import Database from "better-sqlite3";

export const dbPath = path.join(process.cwd(), "database.db");

export const connectDB = () => new Database(dbPath);
