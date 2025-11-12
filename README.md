# homepage3D

A modern single-page portfolio / homepage built with React, TypeScript, Vite and Three.js — polished with Tailwind CSS and small interactive components (3D canvas, chat assistant, and more).

This repository includes a lightweight on-page ChatBot widget that takes a snapshot of the current page and asks an LLM (OpenRouter by default) for answers about the site or its owner.

---

## Quick overview

- Framework: React 18 + Vite
- Language: TypeScript
- Styling: Tailwind CSS
- 3D: react-three-fiber + drei + custom canvas components
- Motion: Framer Motion
- Chat assistant: Client-side widget that collects page text and sends a query to an LLM (OpenRouter)

---

## Features

- Responsive portfolio UI with 3D canvas sections.
- Floating, animated ChatBot with open/close toggle and unread badge.
- Chat uses a page snapshot (title, url and visible text excerpt) to provide context to the LLM.
- Tailwind-based styling for consistent, small CSS output.

---

## Local setup (dev)

Prerequisites:
- Node.js (16+ recommended) and npm/yarn
- A terminal (Windows: WSL/Bash works well)

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Environment variables

This project reads secrets from a `.env` file (Vite loads `VITE_*` variables). Example variables used in this repo:

- `VITE_OPENROUTER_API_KEY` — (optional) OpenRouter API key if you want the ChatBot to call OpenRouter directly from the browser.
- `VITE_OPENAI_API_KEY` — (optional) OpenAI key (present if you plan to call OpenAI directly).
- Other service keys (emailjs etc.) may also be present: `VITE_SERVICE`, `VITE_TEMPLATE`, `VITE_PUBLIC_KEY`, `VITE_EMAIL`.

Important: DO NOT commit `.env` or any secret keys to a public repository. The project currently contains a `.env` file for local development, but you should remove or rotate any real API keys before publishing.

---

## ChatBot details

File: `src/components/ChatBot.tsx`

Behavior summary:
- When mounted, the ChatBot collects an excerpt of the page's visible text (title, url, and body text up to a character cap).
- The user types a question and submits it using the chat input.
- The client builds a `system` message embedding the page excerpt, then sends a chat request to the configured LLM provider (OpenRouter by default).
- The assistant reply is appended to the conversation in the UI.

Notes & security:
- Calling LLMs directly from the browser exposes your API key to end users. For production, it's strongly recommended to implement a small server-side proxy endpoint (e.g. `POST /api/chat`) that holds the key server-side and relays requests.
- The ChatBot currently tries to parse several possible response shapes from the provider (to tolerate minor response format differences). If you control the backend, normalize the provider's response shape in one place.

---

## Why TypeScript was upgraded

Some third-party libraries (for example `zod` v4) publish `.d.cts` / modern declaration files which require a more recent TypeScript compiler to parse. If you encounter errors referencing `node_modules/*/.d.cts` files, upgrade dev TypeScript to a 5.x release (this repository uses `typescript` ^5.x). The project already contains this upgrade in `package.json`.

---

## Troubleshooting

- If the build fails with errors in node_modules (zod, etc.), ensure your local TypeScript version matches the project's `devDependencies` and reinstall:

```bash
npm install
```

- Audit vulnerabilities (optional):

```bash
npm audit
npm audit fix
```

- If the ChatBot shows `Error: No assistant reply received` or an auth error, check your `.env` keys and consider switching to a server-side proxy.

---

## Recommended improvements (next steps)

- Add a small server-side proxy (`/api/chat`) to keep API keys secret and centralize request parsing.
- Add token-aware truncation of the page snapshot (approximate tokens or use a tokenizer) to guarantee the prompt fits available model limits.
- Improve page snapshot filtering (skip form inputs, hidden elements, redact emails or PII).
- Add tests for chat message parsing and an end-to-end smoke test that ensures the client can reach your proxy.

---

## Contributing

Contributions are welcome. Please open issues or PRs for UI improvements, accessibility fixes, or security hardening (especially anything involving how data is collected and sent to external APIs).

---

## License

This project is provided as-is. Add a LICENSE file if you plan to publish or share the project under a specific license.

---

If you want I can:
- Add a server-side example (Express or Vite server) that proxies the chat request to OpenRouter (keeps your key secret).
- Add a short script to redact emails / tokens from the page snapshot.
- Add a small `README` section showing how to rotate/revoke keys quickly.

Which of those would you like next?
