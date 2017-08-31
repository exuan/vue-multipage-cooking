var constant = require('./constant');
const copy = require('copy');
const chalk = require('chalk');

// 两步
copy(constant.distPath + '/**/**/*' + constant.fileExtension, constant.webViewPath, function(err, file) {
    console.log(chalk.green.bold('views success'));
    if (err) return console.error(err);
});
copy(constant.distPath + '/' + constant.staticPath + '/**/**/*.*', constant.webAssetsPath + '/' + constant.staticPath, function(err, file) {
    console.log(chalk.green.bold('assets success'));
    if (err) return console.error(err);
});

