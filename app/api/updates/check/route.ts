import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const version = searchParams.get('version');
    
    // Fetch the latest active release from the database
    const [latestRelease] = await sql`
      SELECT version, download_url, sha256 
      FROM releases 
      WHERE is_active = true 
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    if (!latestRelease) {
      return NextResponse.json({ update_available: false, message: 'No active releases available' });
    }

    if (!version || version === latestRelease.version) {
      return NextResponse.json({ update_available: false });
    }

    return NextResponse.json({
      update_available: true,
      latest_version: latestRelease.version,
      required_update: false,
      download_url: latestRelease.download_url,
      sha256: latestRelease.sha256
    });
  } catch (error: any) {
    console.error('Error checking updates:', error);
    return NextResponse.json({ error: 'Internal server error checking updates' }, { status: 500 });
  }
}
