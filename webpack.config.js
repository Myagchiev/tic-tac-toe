const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // точка входа для JS
  output: {
    filename: 'bundle.js', // итоговый файл с кодом
    path: path.resolve(__dirname, 'dist'), // директория для вывода
    publicPath: '/my-project-template/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // для обработки CSS
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // для обработки изображений
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline', // для обработки шрифтов
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // шаблон для HTML
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'), // теперь используется static вместо contentBase
    open: true, // автоматически открывать браузер
    port: 3000, // порт для сервера
  },  
  resolve: {
    extensions: ['.js', '.css'], // разрешаем расширения для импорта
  },
};
