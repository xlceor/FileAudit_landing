# Setup Instructions for FileMaster Web Server

Follow these steps to finalize the configuration and deployment of your FileMaster license server.

## Step 1: Database Setup (Supabase)
1. Go to your [Supabase Dashboard](https://app.supabase.com).
2. Open the SQL Editor and run the schema creation code from `license-server.md` (Section 2.5).

## Step 2: Authentication Configuration (Google OAuth)
1. Enable **Supabase Auth** in your project settings.
2. Go to **Authentication > Providers** and configure **Google**.
   - Create a Google Cloud Project [here](https://console.cloud.google.com/).
   - Obtain **Client ID** and **Client Secret**.
   - Paste them into your Supabase Google Auth configuration.
3. In your Google Cloud Console project:
   - Add the **Callback URL** provided by Supabase (found in the Google Auth settings section in Supabase, looks like `https://<your-project-id>.supabase.co/auth/v1/callback`) to your Authorized Redirect URIs.

## Step 3: Environment Variables
Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_PRIVATE_KEY_PEM="-----BEGIN RSA PRIVATE KEY-----\n...your_key_content...\n-----END RSA PRIVATE KEY-----"
```

## Step 4: Admin Access Control
- I have restricted the `/admin` area to `xlceor6@gmail.com`.
- Ensure you sign in with this specific Google account when accessing the admin panel.

## Step 5: Deployment
1. Push your code to your GitHub/GitLab repository.
2. Connect your repository to Vercel.
3. In Vercel, add the environment variables defined in Step 3.
4. Deploy the project.

## Step 6: Integration with Python Client
1. Share the **RSA Public Key** with your Python desktop application.
2. Hardcode the public key in your desktop app's `utils/licensing.py` as `PUBLIC_KEY_PEM`.
3. Point your Python client's API call to your deployed Vercel domain URL.
