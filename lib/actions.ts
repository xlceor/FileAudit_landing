'use server';

import { auth, signOut } from '@/auth';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Help generate standard license keys: FM-XXXX-XXXX-XXXX-XXXX (Hexadecimal chunks)
function generateRandomHexChunk(size: number): string {
  const chars = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < size; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateLicenseKeyString(): string {
  return `FM-${generateRandomHexChunk(4)}-${generateRandomHexChunk(4)}-${generateRandomHexChunk(4)}-${generateRandomHexChunk(4)}`;
}

// Authenticate session
async function checkAdminAuth() {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized access');
  }
}

/**
 * Bulk Key Generator
 */
export async function generateLicensesAction(count: number) {
  try {
    await checkAdminAuth();
    if (count <= 0 || count > 100) {
      throw new Error('Key count must be between 1 and 100');
    }

    const keys: string[] = [];
    for (let i = 0; i < count; i++) {
      keys.push(generateLicenseKeyString());
    }

    // Insert keys as 'unused'
    for (const key of keys) {
      await sql`
        INSERT INTO licenses (license_key, status)
        VALUES (${key}, 'unused')
      `;
    }

    revalidatePath('/admin');
    return { success: true, count: keys.length };
  } catch (error: any) {
    console.error('Failed to generate license keys:', error);
    return { success: false, error: error.message || 'Failed to generate keys' };
  }
}

/**
 * Reset License (Migration workflow)
 * SET status = 'unused', machine_fingerprint = NULL
 */
export async function resetLicenseAction(licenseId: string) {
  try {
    await checkAdminAuth();
    await sql`
      UPDATE licenses
      SET status = 'unused', machine_fingerprint = NULL, last_validated_at = NULL
      WHERE id = ${licenseId}
    `;
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to reset license:', error);
    return { success: false, error: error.message || 'Failed to reset license' };
  }
}

/**
 * Revoke License
 */
export async function revokeLicenseAction(licenseId: string) {
  try {
    await checkAdminAuth();
    await sql`
      UPDATE licenses
      SET status = 'revoked'
      WHERE id = ${licenseId}
    `;
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to revoke license:', error);
    return { success: false, error: error.message || 'Failed to revoke license' };
  }
}

/**
 * Restore License to Unused or Activated depending on whether it has fingerprint
 */
export async function restoreLicenseAction(licenseId: string) {
  try {
    await checkAdminAuth();
    
    // Check if it has a fingerprint to decide status
    const result = await sql`
      SELECT machine_fingerprint FROM licenses WHERE id = ${licenseId} LIMIT 1
    `;
    const license = result[0];
    if (!license) {
      throw new Error('License not found');
    }

    const status = license.machine_fingerprint ? 'activated' : 'unused';

    await sql`
      UPDATE licenses
      SET status = ${status}
      WHERE id = ${licenseId}
    `;
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to restore license:', error);
    return { success: false, error: error.message || 'Failed to restore license' };
  }
}

/**
 * Delete License completely
 */
export async function deleteLicenseAction(licenseId: string) {
  try {
    await checkAdminAuth();
    await sql`
      DELETE FROM licenses
      WHERE id = ${licenseId}
    `;
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete license:', error);
    return { success: false, error: error.message || 'Failed to delete license' };
  }
}

/**
 * Sign out Action
 */
export async function logoutAction() {
  await signOut({ redirectTo: '/' });
}


/**
 * Add / Publish a new release version for Over-The-Air updates
 */
export async function createReleaseAction(version: string, downloadUrl: string, sha256: string, makeActive: boolean) {
  try {
    await checkAdminAuth();

    if (!version || !downloadUrl || !sha256) {
      throw new Error('All fields (version, download URL, SHA-256) are required.');
    }

    // Insert new release
    await sql`
      INSERT INTO releases (version, download_url, sha256, is_active)
      VALUES (${version}, ${downloadUrl}, ${sha256}, ${makeActive})
    `;

    // If making it active, turn off other releases' active status
    if (makeActive) {
      await sql`
        UPDATE releases
        SET is_active = false
        WHERE version != ${version}
      `;
    }

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to create release:', error);
    return { success: false, error: error.message || 'Failed to create release' };
  }
}

/**
 * Toggle Active Status of a release
 */
export async function toggleReleaseActiveAction(releaseId: string, currentStatus: boolean) {
  try {
    await checkAdminAuth();

    const newStatus = !currentStatus;

    if (newStatus) {
      // First, set all other releases to inactive
      await sql`
        UPDATE releases
        SET is_active = false
      `;
    }

    await sql`
      UPDATE releases
      SET is_active = ${newStatus}
      WHERE id = ${releaseId}
    `;

    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to toggle release active status:', error);
    return { success: false, error: error.message || 'Failed to toggle active status' };
  }
}

/**
 * Delete a release from the update manifest
 */
export async function deleteReleaseAction(releaseId: string) {
  try {
    await checkAdminAuth();
    await sql`
      DELETE FROM releases
      WHERE id = ${releaseId}
    `;
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete release:', error);
    return { success: false, error: error.message || 'Failed to delete release' };
  }
}
