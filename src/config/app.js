import 'src/config/bootstrap';

import Express from 'express'
import BodyParser from 'body-parser';
import CORS from 'cors';

import { router } from 'src/config/router'
import { errorHandler } from 'src/config/error-handler'
import { connect } from 'src/config/db'

connect();
const app = new Express(); 

app.use(BodyParser.json());
app.use(CORS()); 

app.use(function (req, res, next) { req.payload = {}; next(); });
app.use(router);
app.use(errorHandler);

export { app }