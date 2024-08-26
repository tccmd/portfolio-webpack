const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "./src/index.html"),
    // }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_YERIM_LEE_ART_STAY_SEOUL/index.html',
      template: './src/DIVE_IN_YERIM_LEE_ART_STAY_SEOUL/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_BOMIN_KIM_ART_STAY_SEOUL/index.html',
      template: './src/DIVE_IN_BOMIN_KIM_ART_STAY_SEOUL/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_PANMOOK_KIM_ART_STAY_SEOUL_1/index.html',
      template: './src/DIVE_IN_PANMOOK_KIM_ART_STAY_SEOUL_1/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_DARAE_JEON_ART_STAY_SEOUL/index.html',
      template: './src/DIVE_IN_DARAE_JEON_ART_STAY_SEOUL/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_JIAE_LEE_ART_STAY_SEOUL_2/index.html',
      template: './src/DIVE_IN_JIAE_LEE_ART_STAY_SEOUL_2/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_YURINA_ART_STAY_SEOUL_2/index.html',
      template: './src/DIVE_IN_YURINA_ART_STAY_SEOUL_2/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_PANMOOK_KIM_ART_STAY_SEOUL_2/index.html',
      template: './src/DIVE_IN_PANMOOK_KIM_ART_STAY_SEOUL_2/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_CACOL_ART_STAY_SEOUL/index.html',
      template: './src/DIVE_IN_CACOL_ART_STAY_SEOUL/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_HAPPY_HARIN_ART_STAY_SEOUL/index.html',
      template: './src/DIVE_IN_HAPPY_HARIN_ART_STAY_SEOUL/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_JIAE_LEE_ART_STAY_SEOUL_1/index.html',
      template: './src/DIVE_IN_JIAE_LEE_ART_STAY_SEOUL_1/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'DIVE_IN_JAEBUM_JOO_ART_STAY_SEOUL/index.html',
      template: './src/DIVE_IN_JAEBUM_JOO_ART_STAY_SEOUL/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/css", to: "./css" },
        { from: "./src/viewtagicons", to: "./viewtagicons" },
        { from: "./src/modules", to: "./modules" },
      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // CSS 파일에 대해서만
        use: ['style-loader', 'css-loader'], // style-loader와 css-loader를 사용
      },
      {
        test: /\.mp4$/, // mp4 파일에 대해서만
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // 파일 이름 유지
              // outputPath: 'media/', // 출력 폴더 지정 (임의의 폴더 이름)
            },
          },
        ],
      }
    ]
  },
  devServer: {
    static: [path.resolve(__dirname, "static")],
    port: 8080
  },
  mode: 'production',
  // 빌드 시 주석 제거 플러그인 (js 파일)
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  }
};