# Getting Started

Welcome to **tmt rewritten** – a modern, Vue 3 powered rewrite of The Modding Tree (TMT). This guide will help you set up the framework and create your first layer in just a few minutes.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

## Installation

You can start a new project using the official template. We recommend using the template repository on GitHub:

### Using the template (recommended)

1. Go to the [tmt-rewritten template repository](https://github.com/aquamarine309/tmt-rewritten).
2. Click the **"Use this template"** button to create a new repository under your account.
3. Clone your new repository locally:
   ```bash
   git clone https://github.com/your-username/your-new-project.git
   cd your-new-project
   ```

### Using create-tmt-app (if available)

If you have a CLI tool, you can run:
```bash
npm create tmt-app my-game
cd my-game
```

### Install dependencies

Inside the project folder, install the required dependencies:

```bash
npm ci
```
This will install the exact versions specified in the `package-lock.json` file. You can also use `npm install` if you prefer.

## Running the development server

Start the local development server with:

```bash
npm run dev
```

This will start a Vite development server with hot module replacement. Open your browser and navigate to `http://localhost:3300` to see your game in action. Any changes you make to the source files will be instantly reflected in the browser.

## Building for production

When you are ready to publish your game, build the production bundle:

```bash
npm run build
```

The output will be placed in the `dist/` folder. You can then deploy the contents of this folder to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## Project structure

After installation, your project will look like this:

```
my-game/
├── src/
│   ├── components/      # Built-in Vue components
│   ├── core
│   │   ├── layers/          # Your game layers
│   │   ├── stores/          # Pinia stores for game state
│   │   └── ui.js          # Root component
│   ├── utils/
│   └── main.js          # Entry point
├── stylesheets/          # Global CSS and theme variables
├── images/
├── index.html
├── package.json
└── vite.config.js
```

## Next steps

Now that you have the framework up and running, head over to the [Core Concepts](/guide/core-concepts) guide to learn how layers work, and then try [creating your first layer](/guide/layer/basics). Happy modding! 🎮