# Anvesh Sai Vemuri — Portfolio

A responsive recruiter-facing portfolio for a Data and AI Engineer focused on scalable data platforms, distributed processing, cloud analytics, and applied AI.

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

The production Vercel project redeploys from the `main` branch.

## Where to update content later

All portfolio content currently lives near the top of `src/App.jsx` in plain data arrays:

- `profile`
- `metrics`
- `experiences`
- `skillGroups`
- `projects`
- `foundations`

When you begin your PhD, add it to `foundations` or create a dedicated AI / Research section without redesigning the whole site.

## GitHub Pages later

The site is Vite-compatible and can be moved to GitHub Pages later. For a project-site URL such as `anveshsvemuri.github.io/anvesh-portfolio/`, the Vite `base` path and a GitHub Actions deployment workflow should be added at that time. A custom domain can use `/` as the base.
