import * as express from "express";
import * as bodyParser from 'body-parser';

import { Location, UserEvent } from './types'
import conf from './conf'
import { request } from "http";


const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hi');
});

// Sensor routes
app.post('/sensor', (req,res) => {
  let { lat, lng } = req.body['location']
  let txt = `user id ${req.body['id']} sent ${lat} ${lng}`
  console.log(txt)
  res.send({success: 'ok'})
});

// "Analytics" routes
app.get('/user/:user_id', (req, res) => {
  res.send(`user id ${req.params['user_id']} wants to know his/her score`)
})


app.listen(conf.PORT, () => {
  console.log('Server started!')
});

export default app