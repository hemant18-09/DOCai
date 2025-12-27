# Vercel Deployment Setup Guide

## Overview
This guide walks through deploying the DOC-AI frontend to Vercel with Firebase configuration.

## Prerequisites
- Vercel account: https://vercel.com
- Firebase project with Web SDK credentials
- GitHub repository: https://github.com/hemant18-09/DOCAI

## Step 1: Gather Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Settings** (gear icon) → **Project settings**
3. Under **Your apps**, find your Web app → click the config icon
4. Copy these values:
   - `apiKey` → `VITE_FIREBASE_API_KEY`
   - `authDomain` → `VITE_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `VITE_FIREBASE_PROJECT_ID`
   - `storageBucket` → `VITE_FIREBASE_STORAGE_BUCKET`
   - `messagingSenderId` → `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `appId` → `VITE_FIREBASE_APP_ID`
   - `measurementId` → `VITE_FIREBASE_MEASUREMENT_ID` (optional)

## Step 2: Deploy to Vercel

### Option A: Connect GitHub (Recommended)
1. Visit https://vercel.com/new
2. Click **Import Git Repository**
3. Select your GitHub repository: `hemant18-09/DOCAI`
4. Configure project:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - Click **Continue**

### Option B: Manual Setup
1. Install Vercel CLI: `npm i -g vercel`
2. In repo root: `vercel`
3. Follow prompts

## Step 3: Add Environment Variables

After project creation, go to **Project Settings** → **Environment Variables**:

Add each Firebase variable:
```
VITE_FIREBASE_API_KEY = <your_api_key>
VITE_FIREBASE_AUTH_DOMAIN = <your_auth_domain>
VITE_FIREBASE_PROJECT_ID = <your_project_id>
VITE_FIREBASE_STORAGE_BUCKET = <your_storage_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID = <your_sender_id>
VITE_FIREBASE_APP_ID = <your_app_id>
VITE_FIREBASE_MEASUREMENT_ID = <your_measurement_id>
```

**Important:** Vercel will automatically re-deploy once env vars are saved.

## Step 4: Verify Deployment

1. Wait for build to complete (logs visible in Deployment tab)
2. Visit the Vercel URL (e.g., `docai.vercel.app`)
3. Check browser console (F12) for any errors
4. If successful, you should see the login screen

## Troubleshooting

### Build fails: "vite: command not found"
- Ensure `Root Directory` is set to `frontend` (not root)
- Check that `frontend/package.json` exists and has `vite` in devDependencies

### Error: "Missing Firebase env vars"
- Confirm environment variables are saved in Vercel dashboard
- Redeploy manually: **Deployments** → **...' → **Redeploy**

### Firebase initialization fails at runtime
- Verify all 4 required Firebase keys are set (API key, Auth domain, Project ID, App ID)
- Check Firebase Web SDK is enabled in your project

### Blank page or errors in console
- Open browser DevTools (F12)
- Check Console tab for specific error messages
- Verify all environment variables match your Firebase config exactly

## Local Development

For local testing without Vercel, create `frontend/.env.local`:
```
VITE_FIREBASE_API_KEY=<value>
VITE_FIREBASE_AUTH_DOMAIN=<value>
VITE_FIREBASE_PROJECT_ID=<value>
VITE_FIREBASE_STORAGE_BUCKET=<value>
VITE_FIREBASE_MESSAGING_SENDER_ID=<value>
VITE_FIREBASE_APP_ID=<value>
VITE_FIREBASE_MEASUREMENT_ID=<value>
```

Then:
```bash
cd frontend
npm install
npm run dev
```

## Next Steps

After frontend is live:
- Deploy backend to Render (see [RENDER_SETUP.md](./RENDER_SETUP.md))
- Update `frontend/.env` backend API URL if backend domain changes
- Configure CORS in backend to allow Vercel domain

## Support

For issues, check:
- Vercel docs: https://vercel.com/docs
- Firebase docs: https://firebase.google.com/docs
- GitHub issues: https://github.com/hemant18-09/DOCAI/issues
