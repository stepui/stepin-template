import express from 'express';
import sqlite3 from 'better-sqlite3';
import bodyParser from 'body-parser';
import { expressjwt as jwt } from 'express-jwt';
import { formParser } from './form-parser.js';
import menuController from './controller/menu.js';
import accountController from './controller/account.js';

const db = sqlite3('service/db/stepin.sqlite', { verbose: console.log });
const app = express();
app.use(bodyParser.json());
app.use(formParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwt({ secret: 'secret key1', algorithms: ['HS256'] }).unless({ path: '/login' }));

function register(...controllers) {
  controllers.forEach((ctrl) => ctrl(app, db));
}

register(menuController, accountController);

app.listen(8080, () => {
  console.log(`express server started on port 8080`);
});
