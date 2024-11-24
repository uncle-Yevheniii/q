import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    webpack(config) {
        config.experiments = { ...config.experiments, topLevelAwait: true }
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'ec2-13-49-67-34.eu-north-1.compute.amazonaws.com',
                port: '',
                pathname: '/static/**'
            }
        ]
    }
}

export default nextConfig
// http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com
