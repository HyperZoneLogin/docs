import cloudflare from "@astrojs/cloudflare";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import d2 from "astro-d2";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [
    // Save Markdown renderer configuration to globals for use by the on-demand renderer.
    {
      name: "docs:config-md",
      hooks: {
        "astro:config:setup": ({ config }) => {
          globalThis.markdownConfig = { ...config.markdown };
        },
      },
    },
    starlight({
      title: "HyperZoneLogin Docs",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/HyperZoneLogin/docs" }],
      customCss: [
        "@fontsource/poppins/400.css",
        "@fontsource/jetbrains-mono/400.css",
        "@fontsource/jetbrains-mono/600.css",
        "./src/styles/custom.css",
      ],
      components: {
        PageFrame: "./src/components/overrides/PageFrame.astro",
        Sidebar: "./src/components/overrides/Sidebar.astro",
      },
      sidebar: [
        {
          label: "Navigation",
          collapsed: true,
          items: ["index", "manual/en", "manual/ru", "manual/zh", "developer"],
        },
        {
          label: "User Manual (EN)",
          collapsed: false,
          items: ["manual/en"],
        },
        {
          label: "User Manual (RU)",
          collapsed: false,
          items: ["manual/ru"],
        },
        {
          label: "User Manual (ZH)",
          collapsed: false,
          items: [
            "manual/zh",
            {
              label: "Getting Started",
              collapsed: true,
              items: ["manual/zh/0概要", "manual/zh/1服务器基础配置", "manual/zh/2模块介绍", "manual/zh/3基础安装"],
            },
            {
              label: "Operations",
              collapsed: true,
              items: ["manual/zh/4配置摘要", "manual/zh/5问题反馈", "manual/zh/6常见问题"],
            },
            {
              label: "Backlog",
              collapsed: true,
              items: ["manual/zh/需要补充"],
            },
          ],
        },
        {
          label: "Developer Docs",
          collapsed: false,
          items: ["developer"],
        },
      ],
    }),
    svelte(),
    d2({
      pad: 50,
      experimental: {
        useD2js: true,
      },
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
});
