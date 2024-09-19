const path = require('path');

module.exports = {
  entry: './assets/javascript/index.js',
  output: {
    filename: 'index-bundle.js',
    path: path.resolve(__dirname, './static/js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
      },
      {
        test: /\.(ts|tsx)$/, // Add this rule to handle TypeScript files
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add .ts and .tsx extensions
  }
}