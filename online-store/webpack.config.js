const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

 module.exports = {
   entry: './src/app.ts',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   mode: 'development',
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: ['style-loader', 'css-loader'],
       },
       {
         test: /\.(png|svg|jpg|jpeg|gif)$/i,
         type: 'asset/resource',
       },
       {
        test: /\.ts$/i,
        use: 'ts-loader',
       },
     ],
   },
   resolve: {
    extensions: ['.ts', '.js'],
   },
   plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/assets/", to: "./assets/" }
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
 };