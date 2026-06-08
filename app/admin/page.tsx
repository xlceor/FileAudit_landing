'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [licenses, setLicenses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLicenses() {
      const { data } = await supabase.from('licenses').select('*');
      setLicenses(data || []);
    }
    fetchLicenses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">License Administration</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Key</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Last Validated</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((lic) => (
            <tr key={lic.id}>
              <td className="border p-2">{lic.license_key}</td>
              <td className="border p-2">{lic.status}</td>
              <td className="border p-2">{lic.last_validated_at || 'Never'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
