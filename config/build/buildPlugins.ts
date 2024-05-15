import HTMLWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack, { DefinePlugin, HotModuleReplacementPlugin } from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { BuildOptions } from "../build/types/config"

export function buildPlugins ({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HTMLWebpackPlugin({
            template: paths.html,
            favicon: "./public/icons/favicon.png"
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: "css/[name].[contenthash:8].css", chunkFilename: "css/[name].[contenthash:8].css" }),
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev)
        })
    ]

    if (isDev) {
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false
        }))
        plugins.push(new HotModuleReplacementPlugin())
    }

    return plugins
}
