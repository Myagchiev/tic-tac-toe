import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// Получаем путь к текущей директории
const __dirname = new URL('.', import.meta.url).pathname;

export default {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // Правильная конфигурация для стилей
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css', // Генерируем отдельный CSS файл
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'],
  },
  devServer: {
    static: path.resolve(process.cwd(), 'dist'),
    open: true,
    port: 3000,
    hot: true, // Включаем поддержку горячей перезагрузки
  },
};
