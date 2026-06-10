import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { signLicenseToken } from '@/lib/jwt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(request: Request) {
  try {
    const { fingerprint } = await request.json();

    if (!fingerprint) {
      return NextResponse.json({ error: 'Missing fingerprint' }, { status: 400 });
    }

    // Check if trial already exists for this fingerprint
    const existing = await sql`
      SELECT * FROM trials 
      WHERE machine_fingerprint = ${fingerprint}
      LIMIT 1
    `;

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Trial already used' }, { status: 403 });
    }

    // Register trial
    await sql`
      INSERT INTO trials (machine_fingerprint, start_date)
      VALUES (${fingerprint}, NOW())
    `;

    // Generate trial JWT
    const token = signLicenseToken(
      { 
        trial: true, 
        fingerprint, 
        max_files: 50 
      }, 
      { expiresIn: '7d' }
    );

    return NextResponse.json({ lease_token: token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
