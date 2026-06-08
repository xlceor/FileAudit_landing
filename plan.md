# FileMaster Roadmap & Implementation Plan

This document maps out the progressive engineering steps required to evolve **FileMaster** from a modern single-machine licensed desktop ecosystem into a resilient, automated, and secure enterprise SaaS.

---

## 1. Phase 1: Security & Licensing Refinements

### 1.1 Short-Lived Rolling Lease Model
*   **Problem**: Active JWT leases last for 365 days. A revoked license continues to function offline until the lease naturally expires.
*   **Solution**: transition to a **14-day rolling lease window**.
    *   **API Action**: `POST /api/verify` issues a JWT with `exp` set to `now + 14 days`.
    *   **Client Action**:
        *   On application startup, attempt a silent, non-blocking check-in if an internet connection is available.
        *   If the check-in succeeds, swap the local lease file with a fresh 14-day token.
        *   If offline, allow execution as long as the local lease token's `exp` timestamp is in the future.
        *   If the lease has expired, halt launch and display the `LicensePrompt` interface.

### 1.2 Sandbox & Virtual Machine (VM) Detection
To counter multi-workstation cloning over hypervisors, integrate hardware hypervisor checks within the client-side Python signature generator:
*   Inspect CPU flags for hypervisor presence (e.g., `hypervisor` flag, standard virtualization strings).
*   Add virtualization checks to platform-specific modules:
    *   *Windows*: Registry check on `SystemBiosVersion` and `VideoBiosVersion` searching for strings like `VBOX`, `VMWARE`, `XEN`, `QEMU`.
    *   *Linux*: Read `/proc/cpuinfo` looking for hypervisor identifiers.
*   Fail signature validation or append a `is_virtualized: true` flag in the payload sent to `POST /api/verify`.

---

## 2. Phase 2: Web Portal & Business Operations

### 2.1 Route Map additions (Next.js App Router)
To automate customer success and subscription hooks, the following route maps will be introduced:

```
app/
├── (public)/
│   ├── license-lookup/
│   │   └── page.tsx            # Self-service key status lookup
│   └── download/
│       └── page.tsx            # Protected download route for authenticated licensees
├── api/
│   ├── webhooks/
│   │   └── stripe/
│   │       └── route.ts        # Stripe webhook to generate & mail keys on payment success
│   └── updates/
│       └── check/
│           └── route.ts        # Desktop client update checks (OTA endpoint)
```

### 2.2 Stripe Hook Integration Workflow
```
[ Stripe Checkout Success ] ──► POST /api/webhooks/stripe
                                         │
                                         ▼
                             Parse customer email & tier
                                         │
                                         ▼
                            Generate standard key: FM-XXXX...
                                         │
                                         ▼
                            Insert row into Supabase:
                            - status: 'unused'
                            - email_bound: customer_email
                                         │
                                         ▼
                            Email license key to customer 
                            (Resend/SendGrid integration)
```

### 2.3 Customer Self-Service License Reset
*   Avoid support overhead when users upgrade physical workstations.
*   Provide a `/license-lookup` dashboard where customers input their email and license key.
*   Send a temporary security token to the registered email. On confirmation, reset the database record:
    ```sql
    UPDATE licenses 
    SET status = 'unused', machine_fingerprint = NULL, last_validated_at = NULL 
    WHERE license_key = :key AND status != 'revoked';
    ```
*   Limit self-service resets to **2 occurrences per year** per key to protect against license sharing.

---

## 3. Phase 3: Extended Admin Features

*   **Detailed Handshake Logs**: Create a sub-table `license_logs` to capture every handshake hit, logging IP address, location, client version, and validation outcome for diagnostic purposes.
*   **Bulk Operations UI**: Admin panel support for importing lists of enterprise orders and bulk-revoking keys.
*   **Key Export**: Simple button to export selected rows in clean CSV formats conforming to corporate accounting templates.
*   **Global Server Analytics Dashboard**: Interactive charts showing active activations over time, lookup rate-limiting counters, and geographic map distributions of client footprints.

---

## 4. Phase 4: Secure Over-The-Air (OTA) Updating System

To update PyArmor-obfuscated desktop applications smoothly without forcing manual reinstalls, a native **Launcher/Bootstrap updater pattern** is recommended.

### 4.1 Update System Architecture

```
[ Local Desktop Launcher ] ──(Queries)──► GET /api/updates/check?version=1.2.0
                                                     │
                                                     ▼
                                          Compare local version 
                                          with current database manifest
                                                     │
                             ┌───────────────────────┴───────────────────────┐
                             ▼                                               ▼
                     [ Up to date ]                                  [ New Version Info ]
                             │                                               │
                       Boot Core App                                         ▼
                                                                     Download update ZIP
                                                                             │
                                                                             ▼
                                                                   Validate payload hash
                                                                      (SHA-256 Match)
                                                                             │
                                                                             ▼
                                                                   Extract and overwrite
                                                                     /core directories
                                                                             │
                                                                             ▼
                                                                       Boot Core App
```

### 4.2 API Endpoint: `/api/updates/check`
Accepts query parameters for current client operating system and version:
*   **Endpoint**: `GET /api/updates/check?version=1.2.0&platform=Windows`
*   **Payload Output**:
    ```json
    {
      "update_available": true,
      "latest_version": "1.3.0",
      "required_update": false,
      "download_url": "https://cdn.filemaster.enterprise/updates/v1.3.0/win_patch.zip",
      "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
    ```

### 4.3 Secure Client Overwrite Mechanics (Python Launcher Code Spec)
The desktop package will ship with a lightweight bootstrapper launcher (`filemaster_launcher.py`) that executes first, handles checking and extraction, then invokes the main compiled Tkinter binary:

```python
import os
import sys
import shutil
import hashlib
import urllib.request
import zipfile

CURRENT_VERSION = "1.2.0"
UPDATE_CHECK_URL = "https://filemaster.enterprise/api/updates/check"

def compute_sha256(filepath):
    sha = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(8192):
            sha.update(chunk)
    return sha.hexdigest()

def apply_update(download_url, expected_hash):
    temp_zip = "patch_download.zip"
    try:
        # Download payload safely
        urllib.request.urlretrieve(download_url, temp_zip)
        
        # Verify cryptographically signed file hash
        downloaded_hash = compute_sha256(temp_zip)
        if downloaded_hash != expected_hash:
            raise ValueError("Cryptographic update verification failed. Hash mismatch.")
        
        # Extract files cleanly, bypassing/overwriting core application modules
        with zipfile.ZipFile(temp_zip, 'r') as zip_ref:
            zip_ref.extractall(".")
            
        print("Update applied successfully. Booting client core modules...")
    except Exception as e:
        print(f"Update failed: {e}")
    finally:
        if os.path.exists(temp_zip):
            os.remove(temp_zip)
```

---

## 5. Phase 5: Extended Desktop Operations

### 5.1 Fuzzy Reconciliation Engine (Similarity Matching)
*   **Algorithm**: Integrate Python's `difflib.SequenceMatcher` or rapid fuzz matching (`rapidfuzz`).
*   **UI Integration**: In addition to standard "Found", "Missing", and "Extra", show a dynamic list of **"Partial Matches" (Coincidencias Parciales)**.
*   **Logic**: If file `plate123b.pdf` is on disk, and Excel expects `plate123`:
    *   Compute similarity ratio: `ratio("plate123", "plate123b") = 93%`.
    *   If similarity $> 85\%$, map it to the partial list, offering a quick option in the Results screen to accept or reject the match.

### 5.2 Direct SQL/Database Ingestion Module
*   Instead of working exclusively with Excel, CSV, or JSON sources, permit database reconciliation.
*   Add connection fields inside the Tkinter GUI asking for host parameters:
    *   Connection Type: PostgreSQL, MySQL, SQL Server, Oracle.
    *   Dynamic queries to read target master records.
*   Execute comparison algorithms locally against SQL rows, maintaining strict local privacy pipelines.

### 5.3 Cloud Bucket Connectivity
*   Allow folder sources to exist inside Amazon S3, Google Cloud Storage, or Microsoft Azure Blob Storage.
*   Enforce streamed block validation using AWS boto3 chunks to map directory trees on cloud endpoints without draining massive local workstation memory buffers.
