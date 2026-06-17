# Dynamic Robotics And Integration — Website

Marketing site for **Dynamic Robotics And Integration** (Springfield, MO). **React 18 + Vite + React Router**. Fully responsive.

## Run
\`\`\`bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
\`\`\`

## Routes
- \`/\` Home · \`/services\` multi-select gallery → quote CTA · \`/contact\` pre-filled form → confirmation

## Deploy (GitHub Pages)
Pushing to \`main\` builds and publishes automatically via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. The site then publishes to `https://austin-s-howell.github.io/dynamic-robotics-website/`.

- **Base path:** set in [vite.config.js](vite.config.js) (`/dynamic-robotics-website/`). It must match the repo name.
- **Deep links:** the build copies `index.html` → `404.html` so refreshing `/services` works (GitHub Pages has no server rewrites). `BrowserRouter` uses `basename={import.meta.env.BASE_URL}`.
- **Custom domain:** add a `public/CNAME` file containing the bare domain and set `VITE_BASE=/` (the site then serves from root).

## Responsive
Below 820px: hamburger nav, single-column grids, centered + full-width CTAs. Hook: \`src/hooks/useIsMobile.js\`.

## Customize
- Machines/photos: \`src/data/machines.js\` (add an \`image\` URL per item)
- Tokens: \`src/styles/tokens/\` · Logo: \`public/assets/\` · Favicons: \`public/\` + [index.html](index.html)
- **Contact form:** submits via [Web3Forms](https://web3forms.com) to your inbox. Get a free access key (using your email) and replace \`WEB3FORMS_ACCESS_KEY\` in [src/pages/Contact.jsx](src/pages/Contact.jsx), or set \`VITE_WEB3FORMS_KEY\` at build time.
