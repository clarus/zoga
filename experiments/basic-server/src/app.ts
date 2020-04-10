import * as express from "express";
import * as bodyParser from 'body-parser';

import { Location, UserEvent } from './types'
import conf from './conf'


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hi');
});

app.post('/sensor', (req,res) => {
  res.send(`user id ${req.body['id']} sent ${req.body}`)
});

app.listen(conf.PORT, () => {
  console.log('Server started!')
});
