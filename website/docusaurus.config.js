
/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'react-use',
  tagline: 'Collection of essential React Hooks',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  // baseUrl: '/react-use/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.ico',
  organizationName: 'streamich',
  projectName: 'react-use',
  themeConfig: {
    navbar: {
      title: 'react-use',
      logo: {
        alt: 'react-use Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'Usage',
          position: 'right',
          label: 'Docs',
        },
        {
          href: 'https://github.com/streamich/react-use',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
            },
          ],
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl: 'https://github.com/facebook/flux/edit/master/docs/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

