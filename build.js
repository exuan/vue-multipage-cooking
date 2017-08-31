var path = require('path');
var glob = require('glob');
var constant = require('./constant');
var isProduction = process.env.NODE_ENV === 'production';

var merge = function(a, b) {
    return {
        css: (a.css || []).concat(b.css || []),
        js: (a.js || []).concat(b.js || [])
    }
};

exports.entries = function() {
    var entries = {};
    var basename = '';
    var pathname = '';

    glob.sync(constant.basePath + '/**/**/*.js').forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        pathname = path.dirname(entry).replace(constant.basePath, '');
        entries[(pathname ? pathname.slice(1) + '/': '') + basename] = entry;
    });
    return entries;
};

exports.templates = function() {
    var pages = [];
    var basename = '';
    var pathname = '';
    glob.sync(constant.basePath + '/**/**/*.js').forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        pathname = path.dirname(entry).replace(constant.basePath, '');

        pages.push({
            title: constant.title,
            filename: (pathname ? pathname.slice(1) + '/': '') + basename + (isProduction ? constant.fileExtension : '.html'),
            template: path.resolve(__dirname, 'template.tpl'),
            chunks: ['vendor', 'manifest', (pathname ? pathname.slice(1) + '/': '') + basename]
        });
    });

    return pages;
};