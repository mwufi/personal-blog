/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    devIndicators: {
        appIsrStatus: false
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