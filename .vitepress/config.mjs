import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TMT Rewritten",
  description: "A modern, Vue 3 powered rewrite of The Modding Tree – the flexible framework for building incremental games.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: {
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aquamarine309/tmt-rewritten' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 aquamarine'
    }
  }
})