// next.config.js
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'perso.isima.fr',
                port: '',
                pathname: '/**',

            },
        ],
    },
};
