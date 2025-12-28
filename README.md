# Blackrose Dashboard

A simple responsive dashboard application built with Vue 3 and Vite developed as a technical assessment project.

## Features

* Modern Vue 3 Composition API with `<script setup>` syntax
* Fast development server and optimized production builds via Vite
* Utility-first styling with Tailwind CSS
* Component-based architecture for maintainability
* Hot Module Replacement (HMR) for rapid iteration

## Tech Stack

**Frontend Framework:** Vue 3  
**Build Tool:** Vite  
**Styling:** Tailwind CSS, PostCSS  
**Language:** JavaScript

### Dependencies

Core dependencies are managed in `package.json`. The project uses:
- Vue 3 with Single File Components (SFC)
- Vite for build tooling and dev server
- Tailwind CSS for utility-based styling
- PostCSS for CSS processing

## Getting Started

### Prerequisites

* Node.js (v16 or higher recommended)
* npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/P1YU5H-50N1/Blackrose-dash.git
cd Blackrose-dash
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
npm run build
```

This generates optimized static files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```


## Development Setup

**Recommended IDE:**  
VS Code with the following extensions:
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 language support (disable Vetur if installed)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) - TypeScript support for Vue

## Architecture

The application follows Vue 3's component-based architecture. Vite serves as the build tool, providing fast cold starts and instant HMR during development. Tailwind CSS is configured via `tailwind.config.js` and processed through PostCSS for utility-first styling. The build process compiles SFCs into optimized JavaScript bundles for production deployment.

## License

This project is available for public use. Check repository settings for specific license details.
