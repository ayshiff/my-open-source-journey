module.exports = {
  title: 'My Open Source journey',
  tagline: 'Discover Open Source Software through concrete examples. A publication every week.',
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
        alt: 'My Open Source journey',
        src: 'img/new_logo.svg',
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
          title: 'Presentation',
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
              href: 'https://stackoverflow.com/users/8914348/r%c3%a9mi-doreau?tab=profile',
            },
            {
              label: 'Linkedin',
              href: 'https://www.linkedin.com/in/r%C3%A9mi-doreau-b53902153/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/remi_doreau',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'About me',
              to: 'about',
            },
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
      copyright: `Copyright © ${new Date().getFullYear()} My Open Source journey. Built with Docusaurus.`,
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
