import postgres from 'postgres';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function createReleasesTable() {
  try {
    console.log('Checking database connection...');
    const dbCheck = await sql`SELECT NOW()`;
    console.log('Connected. Date:', dbCheck[0].now);

    console.log('Creating releases table...');
    await sql`
      CREATE TABLE IF NOT EXISTS releases (
        id SERIAL PRIMARY KEY,
        version VARCHAR(50) NOT NULL UNIQUE,
        download_url TEXT NOT NULL,
        sha256 VARCHAR(64) NOT NULL,
        is_active BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Table "releases" checked/created successfully.');

    // Seed it with initial release if empty
    const existing = await sql`SELECT COUNT(*)::int as count FROM releases`;
    if (existing[0].count === 0) {
      console.log('Seeding initial release...');
      await sql`
        INSERT INTO releases (version, download_url, sha256, is_active)
        VALUES (
          '',
          '',
          '',
          true
        )
      `;
      console.log('Initial release seeded.');
    }
  } catch (error) {
    console.error('Error migrating DB:', error);
  } finally {
    await sql.end();
  }
}

createReleasesTable();
