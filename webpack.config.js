const env = process.env.NODE_ENV;
const isDev = env !== 'production';
// env !== 'development' ? "production" : "development"
module.exports = function (env = "development") {
    return require(`./webpack/${env}.config.js`)
}
