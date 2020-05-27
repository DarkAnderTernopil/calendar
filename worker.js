require('dotenv').config();
const next = require('next');
const { setConfig } = require('next/config');
setConfig(require('./next.config'));
const mongoose = require('mongoose');
const express = require('express');
const graphQL = require('express-graphql');
const path = require('path');
const dev = true;
const schema = require('./server/graphql/schema');
const app = next({ dev });
const handle = app.getRequestHandler();

async function start() {
  try {
    await app.prepare();
    const server = express();
    server.use(
      '/graphql',
      graphQL({
        schema,
        graphiql: true,
      }),
    );
    server.use((req, res, next) => {
      res.append('Access-Control-Allow-Origin', [process.env.BASE_URL]);
      next();
    });
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(express.static(path.join(__dirname, 'public')));
    server.get('*', (req, res) => {
      return handle(req, res);
    });
    server.use((error, req, res, next) => {
      if (error.isNext) {
        const queryParams = { status: 404, statusCode: 404, err: new Error(error.message) };
        return req.appNext.render(req, res, '/_error', queryParams);
      }
      console.log(error);
      return res.json({ error: error.message });
    });
    await mongoose.connect('mongodb://localhost:27017/toprent', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
      if (err) throw err;
    });
  } catch (error) {
    console.error(error);
  }
}
start();
