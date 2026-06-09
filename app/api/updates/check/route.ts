import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const version = searchParams.get('version');
  const platform = searchParams.get('platform');

  // In a real application, you would query your database or a manifest file
  // to determine if an update is available.
  const latestVersion = "1.3.0";

  if (!version || version === latestVersion) {
    return NextResponse.json({ update_available: false });
  }

  return NextResponse.json({
    update_available: true,
    latest_version: latestVersion,
    required_update: false,
    download_url: `https://cdn.filemaster.enterprise/updates/v${latestVersion}/${platform?.toLowerCase()}_patch.zip`,
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  });
}
