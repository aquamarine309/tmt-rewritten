# TMT Rewritten

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Vue](https://img.shields.io/badge/Vue-3.5.28-42b883.svg)

A modern, Vue 3 powered rewrite of The Modding Tree (TMT) – the flexible framework for building incremental games.

This project is a clean-room implementation inspired by the original The Modding Tree by Acamaeda. It retains the core concepts (layers, upgrades, challenges, etc.) while embracing modern frontend technologies to provide a better developer experience, improved performance, and greater flexibility.

---

## ✨ Features

- 🧩 **Component-based UI** – Build your game's interface using Vue 3 single-file components (`.vue`). No more string‑based `tabFormat` DSL.
- ⚡ **Reactive by design** – Leverage Vue's fine‑grained reactivity for automatic UI updates, only when needed.
- 📦 **Rich built‑in components** – Pre‑made components for upgrades, milestones, challenges, buyables, bars, grids, and more – all ready to be used or extended (coming soon).
- 🔧 **Simple JavaScript configuration** – Write your layers in plain JavaScript with full access to Vue's Composition API.
- 🚀 **Performance optimized** – Virtual scrolling for large grids, on‑demand component loading, and minimal re‑renders.
- 🌈 **Customizable theming** – Use CSS variables to quickly change the look of your game, or write your own styles.

> Note: This project does not copy any code from the original TMT. It is a ground‑up rewrite using modern web technologies, while preserving the familiar design patterns that made TMT so popular.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Basic knowledge of Vue 3 (Composition API recommended)

### Installation

```bash
# Clone the repository (or use your own template)
git clone https://github.com/aquamarine/tmt-rewritten.git
cd tmt-rewritten

# Install dependencies
npm install

# Start the development server
npm run dev
