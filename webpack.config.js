const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let mode = "production";
let mode_index = 0;

process.argv.forEach((val, index) => {
  if (val === "--mode") {
    mode_index = index;
  }
});

process.env.NODE_ENV = process.argv[mode_index + 1];

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name]-bundle.js",
    publicPath: "/",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/, 
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          //{ loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          //"postcss-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["./src/global.module.scss"]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff2?|ttf|svg|pdf)$/,
        type: "asset/resource"
        // use: [
        //   {
        //     loader: "url-loader",
        //     options: {
        //       name: "[name]_[sha512:hash:base64:7].[ext]",
        //       limit: 1024 * 30,
        //       fallback: "file-loader"
        //     }
        //   }
        // ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      title: "Web Portal",
      filename: "index.html",
      favicon: "src/assets/gnu.png"
    }),
    new CopyPlugin({
      patterns: [{ from: "./public" }]
    })
  ],
  devtool: isDev ? "source-map" : undefined,
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },
  watch: isDev ? true : false,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000
  }
};
