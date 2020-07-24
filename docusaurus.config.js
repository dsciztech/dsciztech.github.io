module.exports = {
  title: 'DSC IZTECH',
  tagline: 'Developer Student Clubs at Izmir Institute of Technology',
  url: 'https://dsciztech.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'dsciztech', // Usually your GitHub org/user name.
  projectName: 'dsciztech', // Usually your repo name.
  themeConfig: {
    defaultMode: 'dark',
    colorMode: {
      defaultMode: 'dark',
    },
    navbar: {
      title: 'DSC IZTECH',
      logo: {
        alt: 'DSC IZTECH logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Bilgiler',
          position: 'left',
        },
        {to: 'blog', label: 'Yazılar', position: 'left'},
        {
          href: 'https://github.com/dsciztech',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Bilgiler',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          "title": "Topluluk",
          "items": [
            {
              "label": "Twitter",
              "href": "https://twitter.com/dsciztech"
            },
            {
              "label": "Instagram",
              "href": "https://instagram.com/dsciztech"
            }
          ]
        },
        {
          "title": "Dahası",
          "items": [
            {
              "label": "Yazılar",
              "to": "blog"
            },
            {
              "label": "GitHub",
              "href": "https://github.com/dsciztech"
            }
          ]
        },
      ],
      copyright: `${new Date().getFullYear()} Developer Student Clubs at Izmir Institute of Technology. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'uyelik',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/dsciztech/dsciztech.github.io/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/dsciztech/dsciztech.github.io/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
