/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: true,
  i18n: {
    locales: ['en','ko',"ja","chi"],
    defaultLocale: 'ko',
  },
  webpack: (config) => {
    return config
  },
  async rewrites() {
    return [
        {
            source: '/robots.txt',
            destination: '/api/robots'
        }
    ];
},
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: "Cross-Origin-Embedder-Policy",
          value: "require-corp",
        },
        {
          key: "Cross-Origin-Opener-Policy",
          value: "same-origin",
        },
      ],
    },
  ];
},
}