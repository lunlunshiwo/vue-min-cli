#! /usr/bin/env node
// 解析用户输入的命令
const program = require('commander');
// 拉取github上的文件
const download = require('download-git-repo');
// 改变输出文字的颜色
const chalk = require('chalk');
// 小图标（loading、succeed、warn等）
const ora = require('ora');


/*  .option()
 *
 *  -i 是简写，类似于npm i -g
 *  init后面的[name]可以通过program.init来获取到。
 *  最后一项是描述，一般会在vue-min -h提示
 */
program
    .version('1.0.0')
    .option('-i init [name]', '初始化vue-min-cli项目')
    .parse(process.argv);

if (program.init) {
    // ora().start()可以创建一个loading小图标
    const spinner = ora('正在从github下载template').start();
    // download()从github下载我们需要的项目，默认是master。
    // 参数配置参考download-git-repo
    download('lunlunshiwo/vue-cli-template', program.init, function (err) {
        if (!err) {
            // 可以输出一些项目成功的信息
            // chalk.blueBright()会将输出的文字转化为蓝色
            console.info(
                chalk.blue('\n'),
                chalk.greenBright('模板下载成功\n'),
                chalk.yellow(`\0\0cd ${program.init}\n`),
                chalk.yellow('\0\0npm install\n'),
                chalk.yellow('\0\0npm run start OR npm run build\n'),
            );
            process.exit();
        } else {
            // 可以输出一些项目失败的信息
            console.info(err);
            process.exit(1);
        }
    })
}