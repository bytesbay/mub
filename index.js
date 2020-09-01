import { app } from 'src/config/app';

const port = process.env['PORT'] ? process.env['PORT'] : 80;

app.listen(port, () => {
  console.log('Listening on port ' + port);  
});