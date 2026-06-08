# FileMaster: System Overview & Licensing Server Specification

This technical specification document provides an exhaustive, production-ready blueprint of the **FileMaster** desktop application ecosystem. It is specifically written for the backend and full-stack developers responsible for building the **Next.js app** (which hosts both the landing page and the central license server).

This guide covers:
1. **System Overview**: The desktop application's design, modular architecture, core engines (scanner, loader, comparator, styling), and workflows.
2. **Licensing System**: Detailed architectural guidelines for the hardware-locked lifetime license manager, API endpoints, cryptographic signatures (RS256 JWT), security practices, database schemas, and admin panel requirements.

---

## 1. System Overview

### 1.1 Technical Architecture & Capabilities
FileMaster is a modern, enterprise-grade desktop audit tool designed to solve a classic data integrity problem: **reconciling physical or digital files on disk with structured records in databases (such as Excel sheets, CSV, or JSON exports).**

The desktop client is built on a modular **MVC-lite architecture** using **Python** and **Tkinter**, and it implements several key operations:

1. **Operation Modes**:
   - **Folder Export (`export`)**: Traverses a target local directory, collects all filenames, and generates an optimized Excel index listing them.
   - **Folder vs. Master Excel (`compare`)**: Scans a physical local folder and reconciles the filenames found against expected identifiers stored in a "Master Excel" (or CSV/JSON).
   - **Excel vs. Master Excel (`compare_excel`)**: Performs a dataset-to-dataset reconciliation, comparing records from an "Input Excel" (CSV/JSON) against the database records of a "Master Excel".

2. **Advanced Processing Capabilities**:
   - **Recursive Traversal**: Uses Python's `pathlib` with the globbing pattern `**/*` to traverse directory trees to an infinite depth, ignoring directory nodes and extracting only file leaves.
   - **Extension-Agnostic Matching (`ignore_ext`)**: Strips file extensions from physical filenames (using `Path.stem` or regex) to compare the raw names against records (e.g., matching a file `plate123.pdf` on disk with `plate123` in the master file).
   - **Case-Insensitive Matching (`ignore_case`)**: Standardizes all values to lowercase to avoid mismatches caused by capitalization discrepancies (e.g., `DOC-001.pdf` vs `doc-001.PDF`).
   - **Prefix Pre-processing (`preprocess`)**: Extracts the core prefix of a filename before the first hyphen `-` or underscore `_`. For example, a file named `AB123CD-photo.jpg` or `AB123CD_resized.png` is pre-processed into the unified identifier `AB123CD` to facilitate matching against structural records.

3. **High-Performance Comparison Engine**:
   - Built around Python `set` algebra (intersection `&`, difference `-`).
   - Converts the expected and real lists into sets, allowing lookup operations to execute in $O(1)$ average time complexity. This guarantees instantaneous comparisons even for folders with over 100,000 files.
   - Categorizes outcomes into three precise, client-ready states:
     - **Found (Encontrados)**: Identifiers present in both the master list and disk/source.
     - **Missing (Faltantes)**: Identifiers registered in the Master Excel but absent on disk/source.
     - **Extra (Sobrantes)**: Files present on disk/source but unregistered in the Master Excel.

4. **Multi-Format Connectivity & Data Normalization**:
   - The loader (`core/excel_loader.py`) supports `.xlsx`, `.xls` (via `pandas` and `openpyxl`), `.csv` (utilizing automatic separator sniffing for `,`, `;`, `\t` and fallback handling), and `.json` data files.
   - Automatically sanitizes files by dropping empty cells, `NaN` values, and trimming whitespaces. It handles duplicates by retaining the first occurrence.
   - Scans column headers dynamically to find matching identifiers. It prioritizes headers containing `"placa"` or `"placas"` (case-insensitive); if missing, it defaults to the first column (index 0). Unnamed/empty columns are renamed to `"Info"`, `"Info_2"`, etc., avoiding key collision.

5. **Client-Ready Report Generator**:
   - Generates beautifully formatted spreadsheets using `openpyxl`.
   - Each sheet corresponds to a result category and adheres to a specific design template:
     - **"Resumen"**: An executive summary dashboard showing metrics (Esperados, Encontrados, Faltantes, Sobrantes, and % Completitud) with a dedicated color layout (Navy, Green, Red, Orange, Purple) and visible gridlines.
     - **"Encontrados"**: Deep-green thematic style (`#2E7D32` headers, light-green zebra rows).
     - **"Faltantes"**: Dark-red thematic style (`#C62828` headers, light-red zebra rows).
     - **"Sobrantes"**: Vibrant orange style (`#E65100` headers, light-orange zebra rows).
   - Automatically adjusts column widths dynamically with safety padding based on maximum content length. It also supports custom templates (`template_path`) to inject data directly into corporate pre-formatted sheets.

---

### 1.2 Desktop Architecture & Visual Identity
The desktop app features a modern, fluid visual identity that has been migrated away from generic Tkinter styling into a customized theme.

- **Theme & Palettes**: Standardized in `ui/theme.py`, featuring two fully integrated visual systems (Light Mode and Dark Mode). When toggled, the app dynamically changes colors in-place, updating widgets, background layers, text colors, and tree scrollbars:
  - **Light Mode Palette**: Light gray background (`#F8F9FA`), pure white cards (`#FFFFFF`), violet accents (`#5E35B1`), and dark charcoal text (`#212529`).
  - **Dark Mode Palette**: Soft dark background (`#121212`), elevated surface panels (`#1E1E1E`), bright violet accents (`#7E57C2`), and clean gray text (`#E0E0E0`).
- **Drag & Drop Integration**: Uses `tkinterdnd2` native wrapper to allow users to drag folders or Excel files directly from their OS explorer onto the input fields, automatically cleaning brackets `{}` in file paths (managed via `utils/dnd_helper.py`).
- **Internationalization (i18n)**: Fully localized in English (`assets/i18n/en.json`) and Spanish (`assets/i18n/es.json`). Language switches propagate instantly across all widgets without requiring an application restart.
- **Asynchronous Execution Model**: All data-heavy processes (scanning, parsing, comparing, Excel generation) run on background worker threads (`threading.Thread`). This leaves the Tkinter GUI 100% responsive, driving an animated progress bar and logging real-time steps.
- **Centralized Rotating Logs**: Centralized via `utils/logger.py` into a `filemaster.log` file with a maximum size of 5MB and a rotation backlog of 3 backups, ensuring simple remote debugging for administrators.
- **Interactive Results & Analytical Dashboard**:
  - **Results Table**: Renders live search filters for each column, allowing instantaneous search across thousands of rows. It also supports interactive column sorting.
  - **Analytical Dashboard**: Uses raw Tkinter canvas elements to draw high-fidelity graphs natively:
    - *Completion Rate Arc (Donut Chart)*: Displays the completion percentage (Found vs Missing) with colored segments and interactive textual legends.
    - *Distribution Bar Chart*: Generates 2D vertical bars matching the theme color of each subset (Green, Red, Orange) with dynamic background gridlines scaled automatically based on the maximum value.

---

## 2. Licensing System

The licensing system represents a crucial security perimeter designed to prevent unauthorized multi-device sharing while maintaining a smooth user experience.

### 2.1 License Concept: "Lifetime Single-Machine"
FileMaster runs on a **"pay once, use forever"** lifetime model. Each purchased key is valid indefinitely but is bound permanently to the **first device** that activates it. Users are allowed offline usage, but updates or hardware migrations require secure API handshake validation.

### 2.2 Complete Licensing Lifecycle

```
    [ User Inputs Key ]
             │
             ▼
     Generate Hardware
        Fingerprint
             │
             ▼
      POST /api/verify  ◄───────────────────┐ (Online Check)
             │                              │
     ┌───────┴───────┐                      │
     ▼               ▼                      │
[Unused Key]   [Activated Key]              │
     │               │                      │
 Bind Hardware   Does Fingerprint           │
  Fingerprint         Match?                │
     │         ┌─────┴─────┐                │
     │         ▼           ▼                │
     │      [ Match ]  [ Mismatch ]         │
     ▼         │           │                │
Generate Lease │           ▼                │
  JWT Token    │     Deny Activation /      │
 (RS256 Private)│        Update             │
     │         │                            │
     ▼         ▼                            │
  Save JWT Lease Locally (~/.filemaster_lease)
             │
             ▼
       Daily Usage (Offline)
 - Read local Lease file
 - Decode & verify signature (RSA Public Key)
 - Match decrypted fingerprint with host hardware
 - Verify expiration claim (exp)
```

#### A. Initial Activation (First Launch)
1. If the local lease file does not exist, the app halts launch and triggers `LicensePrompt`.
2. The user inputs their alphabetical license key.
3. The app gathers device-specific hardware parameters, computes a SHA-256 hash (Hardware Fingerprint), and sends a payload to `POST /api/verify`.
4. The Next.js server validates the key against Supabase. Since its status is `'unused'`, the server marks it `'activated'`, stores the fingerprint, signs a lease token (JWT), and returns it.
5. The client stores the signed JWT locally inside `~/.filemaster_lease`. The app boots up.

#### B. Daily Verification (Offline Operation)
1. Every time the app launches, it triggers `check_local_lease()` which works **fully offline**.
2. It reads `~/.filemaster_lease` and decodes the JWT locally using the **RSA Public Key** embedded in the Python source code.
3. The client verifies:
   - **Signature Integrity**: Cryptographically ensures the lease was issued by the server and has not been altered.
   - **Expiration (`exp`)**: Ensures the lease token has not expired (the lease is configured with a long duration, e.g., 365 days).
   - **Fingerprint Match**: Computes the hardware fingerprint of the current machine and matches it with the `fingerprint` claim in the decrypted JWT payload.
4. If all checks pass, the client loads; otherwise, it triggers the activation prompt again.

#### C. Updates & Periodic Renewals (Silent Check-in)
- When an update is installed or the lease is nearing its expiration date, the client conducts a silent check-in with the API if internet connection is available.
- If the fingerprint continues to match the one locked in the database, the server returns a renewed JWT lease. If the fingerprint has changed (indicating the user copied the app to a new machine), access is denied.

---

### 2.3 Cryptographic & Security Architecture

1. **Asymmetric Cryptography (RSA)**:
   - Secure verification is achieved through an **asymmetric RSA key pair (2048-bit)**.
   - **RSA Private Key (`private_key.pem`)**: Must reside exclusively in the Next.js server context (e.g., loaded via environment variables inside Vercel). It is **never** bundled or exposed to the client app. It is used to cryptographically sign the JWT lease.
   - **RSA Public Key (`public_key.pem`)**: Safe to expose and is directly hardcoded as a multiline string (`PUBLIC_KEY_PEM`) in the client's `utils/licensing.py`. It is used to verify the signature of the JWT lease.

2. **The Lease JWT Token (Payload Schema)**:
   - Standard headers: `alg: "RS256"`, `typ: "JWT"`.
   - **Claims Payload**:
     ```json
     {
       "key": "FM-XXXX-XXXX-XXXX-XXXX",
       "fingerprint": "7c9e0d4...[SHA-256 hash]",
       "iat": 1700000000,
       "exp": 1731536000
     }
     ```
   - Cryptographically signed with the RSA Private Key (using the `RS256` RSASSA-PKCS1-v1_5 algorithm).

3. **Client-Side Protections**:
   - Because Python bytecode can be easily decompiled or patched (e.g. bypass the `check_local_lease() -> Bool` check), the production build process integrates **PyArmor** code obfuscation.
   - PyArmor encrypts Python bytecode and embeds runtime defense mechanisms to prevent memory manipulation, debugger attachments, and direct bypasses of the licensing functions.

---

### 2.4 Hardware Fingerprint Generation Logic

To ensure the hardware fingerprint is resilient to virtual adapters, VPN connections, or standard system updates while remaining completely unique, the client utilizes a multi-parameter combination.

The Python generation logic is structured as follows:
```python
def get_hardware_fingerprint():
    # Base parameters gathered across all platforms
    info = {
        "processor": platform.processor(),
        "node": platform.node(),
        "system": platform.system(),
        "machine": platform.machine(),
    }
    
    # Platform-specific secure hardware metrics
    if platform.system() == "Windows":
        try:
            # Queries the motherboard's immutable BIOS UUID
            cmd = "wmic csproduct get uuid"
            uuid_str = subprocess.check_output(cmd, shell=True).decode().split('\n')[1].strip()
            info["uuid"] = uuid_str
        except Exception:
            pass

    # Serialize parameters as a single delimited string
    fingerprint_str = "|".join([str(v) for v in info.values()])
    
    # Hash the string using SHA-256
    return hashlib.sha256(fingerprint_str.encode()).hexdigest()
```
*Note for Backend Developers:* The computed fingerprint is a **64-character SHA-256 hexadecimal hash**. The Next.js API must accept and perform exact matches against this string.

---

### 2.5 Database Schema & Setup (Supabase / Postgres)

To support the Next.js API endpoints, configure the following database table in Supabase:

```sql
-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Licenses Table
CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_key TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'unused' CHECK (status IN ('unused', 'activated', 'revoked')),
    machine_fingerprint TEXT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_validated_at TIMESTAMP WITH TIME ZONE NULL
);

-- Index for instant key lookup
CREATE INDEX idx_licenses_key ON licenses (license_key);
```

#### Seed Example (Generating custom license keys)
```sql
INSERT INTO licenses (license_key) VALUES 
('FM-1A8D-9E2F-43B0-C27A'),
('FM-7B0C-2F1E-94A5-E83F'),
('FM-3C9A-5D8B-1E2F-6G7H');
```

---

### 2.6 Next.js API Endpoint Specification: `POST /api/verify`

The API endpoint must reside in the Next.js router at `app/api/verify/route.ts` (or standard Pages API). It must strictly enforce the following sequence of checks:

#### Request Specification
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Payload**:
  ```json
  {
    "key": "FM-1A8D-9E2F-43B0-C27A",
    "fingerprint": "8f3c4e209... [64-character sha256]"
  }
  ```

#### Flow Chart of API Controller Verification Logic
1. **Request Validation**: Verify if both `key` and `fingerprint` strings exist in the request body. Return `400 Bad Request` if parameters are missing.
2. **Database Lookup**: Query the database for the license record:
   ```typescript
   const { data: license, error } = await supabase
     .from('licenses')
     .select('*')
     .eq('license_key', payload.key)
     .single();
   ```
   If no record is found, return `403 Forbidden` with `{ "error": "Invalid License Key" }`.
3. **Status Check & Hardware Binding**:
   - **Case A: Status is `'unused'`**:
     - Bind the hardware fingerprint: update `machine_fingerprint` to the provided `fingerprint`, set `status` to `'activated'`, and set `last_validated_at` to `NOW()`.
   - **Case B: Status is `'activated'`**:
     - Check if the stored `machine_fingerprint` matches the payload's `fingerprint`.
     - If they do **not** match, return `403 Forbidden` with `{ "error": "Machine Mismatch" }`.
     - If they match, update `last_validated_at` to `NOW()`.
   - **Case C: Status is `'revoked'`**:
     - Return `403 Forbidden` with `{ "error": "License Key Revoked" }`.
4. **Lease Signing (JWT generation)**:
   - Retrieve the RSA Private Key from environment variables (e.g. `process.env.JWT_PRIVATE_KEY_PEM`). Ensure formatting (newlines replaced if necessary).
   - Sign the JWT with algorithm `RS256` and set an expiration window (recommended: `365d` or `1y`).
   - Include the payload claims:
     ```typescript
     const payload = {
       key: license.license_key,
       fingerprint: fingerprint
     };
     const token = jwt.sign(payload, privateKey, {
       algorithm: 'RS256',
       expiresIn: '365d'
     });
     ```
5. **Response Delivery**:
   - Return status `200 OK` with payload:
     ```json
     {
       "lease_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJGTS0xQThELTlFMkYtNDNCMC1DMj..."
     }
     ```

---

### 2.7 Administration Panel & Key Management Requirements

The Next.js web application must provide a password-protected administration area (secured by Supabase Auth) for customer support and key management.

#### Core Administration Features
1. **License Generator**:
   - Form to create keys individually or in bulk.
   - Format standard: `FM-[4-char Hex]-[4-char Hex]-[4-char Hex]-[4-char Hex]`. P.ej., `FM-F2A8-94D1-EBC2-0941`.
2. **Key Dashboard**:
   - Table displaying all licenses with filters for status (`unused`, `activated`, `revoked`).
   - Shows creation date, activation date, and associated hardware fingerprints.
3. **License Migration / Reset**:
   - Real-world scenarios often require users to migrate their software to a new machine (due to hardware failure or upgrade).
   - The admin panel must provide a **"Reset License"** button. This action performs:
     ```sql
     UPDATE licenses 
     SET status = 'unused', machine_fingerprint = NULL 
     WHERE license_key = :license_key;
     ```
   - This returns the key to an unused state, allowing the user to reactivate on their new machine (which locks onto the new hardware fingerprint).
4. **Revocation Control**:
   - In cases of chargebacks, subscription cancellations, or abuse, the admin must be able to mark keys as `'revoked'`, instantly preventing the next lease check-in from succeeding.

### 2.8 Rate Limiting & API Security

To secure the license server against key enumeration and brute-force attacks:
- **Rate Limiting**: Integrate rate-limiting middleware on the `/api/verify` endpoint. Use Upstash Redis or a token bucket algorithm to restrict requests by IP address (e.g., maximum 5 requests per minute).
- **HTTPS Enforcement**: Disable HTTP access. Ensure all communications between the Python client and the Vercel API are strictly encrypted over TLS/HTTPS.
- **Header Fingerprinting**: Optionally validate custom User-Agent headers (e.g. `FileMaster-Client/1.2`) to discard generic browser scans.
