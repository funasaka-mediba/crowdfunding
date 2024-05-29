const path = require('path');

    module.exports = {
      mode: 'development',  // または 'production'
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
            exclude: /node_modules/,
          },
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      devtool: 'source-map'
    };
