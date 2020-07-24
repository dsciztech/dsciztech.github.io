module.exports = {
  title: 'DSC IZTECH',
  tagline: 'Developer Student Clubs at Izmir Institute of Technology',
  url: 'https://dsciztech.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/logo.png',
  organizationName: 'dsciztech',
  projectName: 'dsciztech',
  themeConfig: {
    defaultMode: 'light',
    colorMode: {
      defaultMode: 'light',
    },
    navbar: {
      title: 'DSC IZTECH',
      logo: {
        alt: 'DSC IZTECH logo',
        src: 'img/logo.png',
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
              label: 'DSC IZTECH',
              to: 'docs/',
            },
            {
              label: 'IZTECH',
              to: 'docs/iztech/',
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
