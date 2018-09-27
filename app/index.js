import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import devConfig from '../webpack.dev.config';
import prodConfig from '../webpack.prod.config';

const app = express();

let compiler = '';

if (process.env.NODE_ENV !== 'production') {
  compiler = webpack(devConfig);
  app.use(webpackHotMiddleware(compiler));
} else {
  compiler = webpack(prodConfig);
}

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: devConfig.output.publicPath
}));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./app/client/index.html'));
});

export default app;