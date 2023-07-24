/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:8080/api/:path*'
            : '/api/',
      },
    ]
  },
}

module.exports = nextConfig