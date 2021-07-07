// webpack.config.js
const path = require('path')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const TerserJSPlugin = require('terser-webpack-plugin')


const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const get_file_name = (env) => isDev ? `bundle.${env}` : `bundle[hash].${env}`

module.exports = {
    entry: {
      main: path.resolve(__dirname, './src/main.js'),
      //styles: path.resolve(__dirname, "./src/js/styles.js")
    },
    output: {
        path: path.resolve(__dirname, './src/dist'),
        filename: '[name].js'
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      hot: true,
      port: 9000,
      contentBase: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                plugins: [
                  "@babel/plugin-transform-runtime",]
              }
            }
          },
          {
            test: /\.(css)$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          { 
            test: /\.jpg$/, 
            loader: "file-loader",
            options: {
              publicPath: "../img",
              outputPath: 'img',
            }
         }
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css"
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
          template: "./src/index.html",
          filename: 'index.html',
          minify: {
              collapseWhitespace: isProd,
              removeComments: isProd,
          }
      }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserJSPlugin({}),
    ],
  },
}