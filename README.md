# MindMate AI

## Gemini API setup

Chat replies come from `api/chat.js` (a Vercel serverless function) which reads the key from the `GEMINI_API_KEY` environment variable. The key never reaches the browser. If it's missing, the app falls back to built-in rule-based replies.

1. Create a key in [Google AI Studio](https://aistudio.google.com/apikey).
2. **Deployed (Vercel):** Project → Settings → Environment Variables → add `GEMINI_API_KEY` (Production, Preview, Development) → redeploy.
3. **Local:** copy `.env.example` to `.env.local`, paste your key, and run `npx vercel dev` (plain `npm run dev` doesn't serve `/api`, so chat will use the fallback replies).

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
