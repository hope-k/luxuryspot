const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config()



module.exports = {

    reactStrictMode: false,
    env: {

    },
    images: {
        domains: ['a0.muscache.com', 'res.cloudinary.com'],
    }
}
