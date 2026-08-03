# linkCompressor client

React frontend for linkCompressor, built with [Vite](https://vitejs.dev/).
Originally scaffolded with Create React App; migrated to Vite for faster
dev server startup/HMR and to support React 19.

## Available Scripts

In this directory (`client/`), you can run:

### `npm run dev` (or `npm start`)

Runs the app in development mode with hot module reload.
Vite defaults to [http://localhost:3000](http://localhost:3000); if that port
is busy it automatically falls back to the next free one (3001, 3002, ...)
and prints the actual URL to the console.

API requests to `/api` and `/t` are proxied to the backend at
`http://localhost:5000` (configured in `vite.config.js`).

### `npm run build`

Builds the app for production into the `build/` folder, minified with
content-hashed filenames.

### `npm run preview`

Serves the production build locally for a quick smoke test.

## Notes on the CRA → Vite migration
- `index.html` now lives at the project root (`client/index.html`) instead
  of `client/public/index.html`, per Vite convention.
- `react-scripts`, `serviceWorker.js`, and `setupTests.js` were removed;
  there is no CRA-style test runner configured currently.
- Source files use the `.js` extension but contain JSX. `vite.config.js`
  configures esbuild/the React plugin to treat `.js` files under `src/` as
  JSX so this keeps working without renaming files to `.jsx`.
- `react-router-dom` was upgraded from v5 to v7 (route definitions in
  `src/routes.js` use the current `react-router-dom` v7 API).

## Learn More
- [Vite documentation](https://vitejs.dev/guide/)
- [React documentation](https://react.dev/)
