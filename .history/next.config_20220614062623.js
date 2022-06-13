const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config()



module.exports = {

    reactStrictMode: false,
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
        return config
    },
    env: {
        NEXTAUTH_URL=luxuryspot.vercel.app,
NEXT_PUBLIC_URL=luxuryspot.vercel.app
    }
    images: {
        domains: ['a0.muscache.com', 'res.cloudinary.com'],
    }
}
