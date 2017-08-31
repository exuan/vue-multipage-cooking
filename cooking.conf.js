var path = require('path');
var cooking = require('cooking');
var build = require('./build');
var constant = require('./constant');
var webpack = require('webpack');
var isProduction = process.env.NODE_ENV === 'production';

cooking.set({
    entry: build.entries(),
    dist: constant.distPath,
    template: build.templates(),
    devServer: {
        port: 3200,
        publicPath: '/',
        proxy: {
            // see https://webpack.github.io/docs/webpack-dev-server.html#proxy
        }
    },
    hash: true,
    sourceMap: true,
    minimize: true,
    chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    postcss: [
        // require('...')
    ],
    clean: true,
    publicPath: constant.publicPath,
    static: constant.staticPath,
    urlLoaderLimit: 10000,

    extractCSS: isProduction ? 'static/[name].css' : true,
    alias: {
        'src': path.join(__dirname, 'src'),
        //'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery')
    },
    extends: ['vue2', 'buble', 'sass']
});

/*cooking.add('plugin.Provide', new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
}));*/


isProduction && cooking.add('output.filename', 'static/[name].js');
module.exports = cooking.resolve();
