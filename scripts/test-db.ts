import postgres from 'postgres';
import * as dotenv from 'dotenv';
import path from 'path';
 
// Explicitly load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
 
console.log("Checking POSTGRES_URL:", process.env.POSTGRES_URL ? "FOUND" : "NOT FOUND");
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function test() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("Database connected successfully:", result[0]);
  } catch (err) {
    console.error("Connection details:", {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
    });
    console.error("Database connection failed:", err);
  }
  process.exit();
}
 
test();