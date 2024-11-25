import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Port Backstage Plugin",
  tagline: "Combine all your integrations in one plugin",
  favicon: "img/icon.svg",

  url: "https://backstage-plugin.getport.io/",
  baseUrl: "/",

  organizationName: "port-labs",
  projectName: "backstage-plugin",
  trailingSlash: false,

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/port-labs/backstage-plugin/tree/main/docs/site/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/icon.svg",
    navbar: {
      title: "Port Backstage Plugin",
      logo: {
        alt: "Port Logo",
        src: "img/icon.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          href: "https://docs.getport.io/api-reference/port-api",
          label: "API Reference",
          position: "left",
        },
        {
          href: "https://github.com/port-labs/backstage-plugin",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: "https://www.getport.io/community",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/tweetsbyport",
            },
            {
              label: "Linkedin",
              href: "https://www.linkedin.com/company/getport/",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              href: "https://www.getport.io/blog",
            },
            {
              label: "Demo",
              href: "https://demo.getport.io",
            },
            {
              label: "GitHub",
              href: "https://github.com/port-labs",
            },
            {
              label: "Port",
              href: "https://getport.io",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Terms of Service",
              href: "https://getport.io/legal/terms-of-service",
            },
            {
              label: "Privacy Policy",
              href: "https://getport.io/legal/privacy-policy",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Port, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
