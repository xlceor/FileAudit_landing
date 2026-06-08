import { auth } from '@/auth';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './AdminDashboardClient';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

  // Fetch licenses directly in the Server Component
  const licenses = await sql`
    SELECT * FROM licenses 
    ORDER BY created_at DESC
  `;

  // Standardize database outputs for client delivery
  const serializedLicenses = licenses.map((lic: any) => ({
    id: lic.id,
    license_key: lic.license_key,
    status: lic.status,
    machine_fingerprint: lic.machine_fingerprint || null,
    created_at: lic.created_at ? new Date(lic.created_at).toISOString() : null,
    last_validated_at: lic.last_validated_at ? new Date(lic.last_validated_at).toISOString() : null,
  }));

  return (
    <AdminDashboardClient 
      initialLicenses={serializedLicenses} 
      userEmail={session.user?.email || 'admin@filemaster.enterprise'} 
    />
  );
}
