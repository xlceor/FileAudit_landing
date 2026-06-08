import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { signLicenseToken } from '@/lib/jwt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(request: Request) {
  try {
    const { key, fingerprint } = await request.json();

    if (!key || !fingerprint) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const licenses = await sql`
      SELECT * FROM licenses 
      WHERE license_key = ${key}
      LIMIT 1
    `;
    const license = licenses[0];

    if (!license) {
      return NextResponse.json({ error: 'Invalid License Key' }, { status: 403 });
    }

    if (license.status === 'revoked') {
      return NextResponse.json({ error: 'License Key Revoked' }, { status: 403 });
    }

    if (license.status === 'activated' && license.machine_fingerprint !== fingerprint) {
      return NextResponse.json({ error: 'Machine Mismatch' }, { status: 403 });
    }

    if (license.status === 'unused') {
      await sql`
        UPDATE licenses 
        SET status = 'activated', machine_fingerprint = ${fingerprint}, last_validated_at = ${new Date().toISOString()}
        WHERE id = ${license.id}
      `;
    } else {
      await sql`
        UPDATE licenses 
        SET last_validated_at = ${new Date().toISOString()}
        WHERE id = ${license.id}
      `;
    }

    const token = signLicenseToken({ key, fingerprint });

    return NextResponse.json({ lease_token: token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
