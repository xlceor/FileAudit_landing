# Roadmap: FileMaster Web & Licensing Server

This roadmap outlines the development of the Next.js application that serves the landing page and manages licensing for the FileMaster desktop application.

## Phase 1: Infrastructure & Database Setup
- [ ] Initialize Supabase project.
- [ ] Implement database schema (`licenses` table).
- [ ] Configure environment variables (RSA Keys, Supabase URL/Key).
- [ ] Set up Next.js project structure with architectural separation (public, admin, server).

## Phase 2: Server-Side Licensing Logic
- [ ] Create API route: `POST /api/verify`.
- [ ] Implement RSA signing logic for JWT tokens.
- [ ] Add hardware fingerprint validation logic.
- [ ] Implement rate-limiting middleware for API security.

## Phase 3: Administration Panel
- [ ] Implement Supabase Authentication (Admin login).
- [ ] Build License Dashboard (List, view, filter keys).
- [ ] Implement License Management actions:
    - [ ] Create/Generate new keys.
    - [ ] Reset license (unlock from hardware).
    - [ ] Revoke license.

## Phase 4: Public Landing Page
- [ ] Design and build the landing page promoting FileMaster features.
- [ ] Add "Download" and "Buy/Activate" information.
- [ ] Optimize for SEO and performance.

## Phase 5: Testing & Deployment
- [ ] E2E testing of the licensing flow (Client request -> Server validation -> JWT return).
- [ ] Security audit of API endpoints.
- [ ] Deployment to Vercel.
