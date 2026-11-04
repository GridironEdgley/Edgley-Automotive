---
name: Vite build environment
description: Keep Vite production builds independent of Replit-only server environment variables.
---

Vite evaluates `vite.config.ts` during both development-server startup and production builds. Server settings such as `PORT` and deployment path settings such as `BASE_PATH` should have safe defaults when missing; continue honoring explicit values supplied by Replit.

**Why:** A Vercel monorepo build can run workspace package builds without Replit service environment variables, and eager checks at config load time stop the build before bundling.

**How to apply:** For Vite artifacts in this workspace, validate provided values but do not fail solely because `PORT` or `BASE_PATH` is absent during a build.
