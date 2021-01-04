module.exports = {
  title: 'My Open Source journey',
  tagline: 'Discover Open Source Software through concrete examples. A publication every week.',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ayshiff', // Usually your GitHub org/user name.
  projectName: 'my-open-source-journey', // Usually your repo name.
  url: 'https://myopensourcejourney.com', // Your website URL
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-186339279-1',
    },
    navbar: {
      title: 'Home',
      logo: {
        alt: 'My Open Source journey',
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
          to: 'docs/contributions/backstage3794',
          activeBasePath: 'docs/contributions/backstage3794',
          label: 'Contributions',
          position: 'left',
        },
        {
          to: 'docs/projects/backstage',
          activeBasePath: 'docs/projects/backstage',
          label: 'Projects',
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
          title: 'Content',
          items: [
            {
              label: 'Concept presentation',
              to: 'docs/presentation',
            },
            {
              label: 'Contributions',
              to: 'docs/contributions/backstage3794',
            },
            {
              label: 'Projects',
              to: 'docs/projects/backstage',
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
