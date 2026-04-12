import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import d2 from "astro-d2";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
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
      sidebar: [
        {
          label: "用户手册",
          items: [
            "用户手册",
            "用户手册/0概要",
            "用户手册/1服务器基础配置",
            "用户手册/2模块介绍",
            "用户手册/3基础安装",
            "用户手册/4配置摘要",
            "用户手册/5问题反馈",
            "用户手册/6常见问题",
            "用户手册/需要补充",
          ],
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
