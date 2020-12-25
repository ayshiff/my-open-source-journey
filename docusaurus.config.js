module.exports = {
  title: 'The Open Source with Remi',
  tagline: 'Discover the open source through concrete examples. A publication every week.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Home',
      logo: {
        alt: 'The Open Source with Remi',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/presentation',
          activeBasePath: 'docs/presentation',
          label: 'Presentation',
          position: 'left',
        },
        {
          to: 'docs/backstage3794',
          activeBasePath: 'docs/backstage3794',
          label: 'Articles',
          position: 'left',
        },
        {
          to: 'about',
          label: 'About Me',
          position: 'right',
        },
        {
          href: 'https://github.com/ayshiff',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Articles',
          items: [
            {
              label: 'Why contribute to Open Source ?',
              to: 'docs/contribute',
            },
            {
              label: 'Concept presentation',
              to: 'docs/presentation',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ayshiff',
            },
            {
              label: 'Blog',
              href: 'https://remidoreau.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} The Open Source with Remi, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
