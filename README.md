# Zheng Chengchao Portfolio

This frontend portfolio is designed for internship and entry-level developer opportunities. It includes the shared site layout, Home page, reusable Portfolio cards and draft Project Detail views.

## Run the site

```powershell
pnpm install
pnpm dev
```

Open the local URL printed by Vite. It is usually `http://localhost:5173/`.

## Check a change

```powershell
pnpm lint
pnpm build
```

## Where to edit content

- `src/data/projects.js` is the single source for project cards and Project Detail content. Pending fields are deliberately marked with `status: 'pending'`.
- `src/components/ProjectCard.jsx` renders each reusable Portfolio card.
- `src/components/ProjectDetail.jsx` renders the Project Detail sections and pending-content states.
- `src/App.jsx` contains the shared navigation, Home sections, view state, focus areas and footer.
- `src/styles.css` contains the colour system, typography, component styling and responsive breakpoints.
- `portfolio_logo.png` is the original ZC monogram used by the interface and browser icon.

Project details, screenshots, skills and contact links are deliberately labelled as placeholders until verified content is available.
