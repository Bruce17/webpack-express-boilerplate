/* eslint no-console: 0 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const host = process.env.HOST || '0.0.0.0';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const commentsFileName = 'data/comments.json';

app.get('/api/comments', function response(req, res) {
  res.write(fs.readFileSync(commentsFileName));
  res.end();
});

app.post('/api/comments', function response(req, res) {
  fs.readFile(commentsFileName, function (err, content) {
    if (err) {
      throw err;
    }

    let json = [];
    try {
      json = JSON.parse(content)
    } catch (ex) {
      console.error('error parsing json: ', ex);
    }

    const newEntry = Object.assign(
      {
        date: new Date()
      },
      req.body
    );

    if (json.length > 0) {
      newEntry.id = (json[json.length - 1].id + 1) || json.length;
    } else {
      newEntry.id = 1;
    }
    json.push(newEntry);

    fs.writeFile(commentsFileName, JSON.stringify(json), function (err) {
      if (err) {
        throw err;
      }

      res.json(json).end();
    });
  });
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, host, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up http://%s:%s/ in your browser.', port, host, port);
});
