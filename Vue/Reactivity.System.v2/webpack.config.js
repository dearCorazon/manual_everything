const path = require('path');
console.log("Webpack configuration is loaded!");

module.exports = {
  mode: 'development',
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, // 匹配 .js 或 .mjs 文件
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader', // 使用 babel-loader 来处理 ES6 语法
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.mjs'], // 解析文件时自动添加 .js 和 .mjs 后缀
  },
};
