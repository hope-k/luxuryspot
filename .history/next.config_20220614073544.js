const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config()



module.exports = {

    reactStrictMode: false,
    webpack(config) {
        config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
        return config
    },
    env: {

    },
    images: {
        domains: ['a0.muscache.com', 'res.cloudinary.com'],
    }
}
