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
          label: "Руководство пользователя (RU)",
          collapsed: false,
          items: ["manual/ru"],
        },
        {
          label: "用户手册 (ZH)",
          collapsed: false,
          items: [
            "manual/zh",
            {
              label: "入门",
              collapsed: true,
              items: [
                "manual/zh/概要",
                "manual/zh/快速上手",
                "manual/zh/服务器基础配置",
                "manual/zh/模块介绍",
                "manual/zh/基础安装",
              ],
            },
            {
              label: "运维",
              collapsed: true,
              items: [
                {
                  label: "配置索引",
                  collapsed: true,
                  items: [
                    "manual/zh/config/配置列表",
                    "manual/zh/config/backend-server",
                    "manual/zh/config/database",
                    "manual/zh/config/messages",
                    "manual/zh/config/modules",
                    "manual/zh/config/misc",
                    "manual/zh/config/remap",
                    "manual/zh/config/offline-auth",
                    "manual/zh/config/offlinematch",
                    "manual/zh/config/yggd-entry",
                    "manual/zh/config/profile-skin",
                    "manual/zh/config/safe",
                    "manual/zh/config/merge-am",
                    "manual/zh/config/merge-ml",
                  ],
                }, 
                "manual/zh/迁移数据",
                "manual/zh/常见问题", 
                "manual/zh/问题反馈"
              ],
            }
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
