import 'src/config/bootstrap';

import Express from 'express'
import BodyParser from 'body-parser';
import CORS from 'cors';

import { router } from 'src/config/router'
import { errorHandler } from 'src/config/error-handler'

const app = new Express(); 

app.use(BodyParser.json());
app.use(CORS()); 

app.use(function (req, res, next) { req.payload = {}; next(); });
app.use(router);
app.use(errorHandler);

const port = process.env['PORT'];

app.listen(port, () => {
  console.log('Listening on port ' + port);  
});

export { app }
