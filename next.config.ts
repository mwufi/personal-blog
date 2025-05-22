/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    devIndicators: {
        appIsrStatus: false
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
        {
            protocol: 'https',
            hostname: 'avatar.vercel.sh',
            port: '',
            pathname: '/**',
        },
        ],
    },
    experimental: {
        turbo: {
            resolveAlias: {
                'app': './app',
            },
        },
    },
}

module.exports = nextConfig