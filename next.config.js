/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         headers: [
//           { key: 'Access-Control-Allow-Credentials', value: 'true' },
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: 'https://https://pencilai.netlify.app',
//           },
//           {
//             key: 'Access-Control-Allow-Methods',
//             value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//           },
//           {
//             key: 'Access-Control-Allow-Headers',
//             value:
//               'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//           },
//         ],
//       },
//     ];
//   },
// };
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://https://pencilai.netlify.app/:path*',
      },
    ];
  },
};
