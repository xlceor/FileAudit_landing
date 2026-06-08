import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { signLicenseToken } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const { key, fingerprint } = await request.json();

    if (!key || !fingerprint) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('license_key', key)
      .single();

    if (error || !license) {
      return NextResponse.json({ error: 'Invalid License Key' }, { status: 403 });
    }

    if (license.status === 'revoked') {
      return NextResponse.json({ error: 'License Key Revoked' }, { status: 403 });
    }

    if (license.status === 'activated' && license.machine_fingerprint !== fingerprint) {
      return NextResponse.json({ error: 'Machine Mismatch' }, { status: 403 });
    }

    if (license.status === 'unused') {
      const { error: updateError } = await supabase
        .from('licenses')
        .update({ status: 'activated', machine_fingerprint: fingerprint, last_validated_at: new Date().toISOString() })
        .eq('id', license.id);
      
      if (updateError) throw updateError;
    } else {
      await supabase
        .from('licenses')
        .update({ last_validated_at: new Date().toISOString() })
        .eq('id', license.id);
    }

    const token = signLicenseToken({ key, fingerprint });

    return NextResponse.json({ lease_token: token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
