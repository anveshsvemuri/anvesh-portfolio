# Anvesh Sai Vemuri — Portfolio

A premium, responsive portfolio for a Data Engineer focused on scalable data platforms, distributed processing, cloud analytics, and applied AI.

## Stack

- React
- Vite
- CSS (no UI framework required)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Replace your existing repo files

The simplest approach is to copy these files into the existing `anvesh-portfolio` repository, replacing the current `src`, `index.html`, `package.json`, `vite.config.js`, and `public/resume/AnveshSVemuri_Resume.pdf`.

Then run:

```bash
npm install
npm run build
git add .
git commit -m "Redesign portfolio"
git push origin main
```

Your existing Vercel project should redeploy from the repository automatically if it is still connected to `main`.

## Where to update content later

All portfolio content currently lives near the top of `src/App.jsx` in plain data arrays:

- `profile`
- `systemStages`
- `metrics`
- `experiences`
- `skillGroups`
- `projects`
- `foundations`

When you begin your PhD, add it to `foundations` or create a dedicated AI / Research section without redesigning the whole site.

## GitHub Pages later

The site is Vite-compatible and can be moved to GitHub Pages later. For a project-site URL such as `anveshsvemuri.github.io/anvesh-portfolio/`, the Vite `base` path and a GitHub Actions deployment workflow should be added at that time. A custom domain can use `/` as the base.
