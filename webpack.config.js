


const path = require('path');

module.exports = {
  mode: 'development', 
  entry: './src/index.tsx', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, 
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'] // обработка CSS
      }
    ]
  },
  devServer: {
    static: './dist',
    hot: true,
    port: 3000
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'] // расширения для импорта
  },
  performance: {
    hints: false // отключаем ворчание про размер бандла
  }
};
