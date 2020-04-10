import * as express from "express";
import * as bodyParser from 'body-parser';

import { Location, UserEvent } from './types'
import conf from './conf'


const app = express();
app.use(bodyParser.json());

//const router = express.Router();

app.get('/', (req, res) => {
  res.send('hi');
});

// Sensor routes
app.post('/sensor', (req,res) => {
  res.send(`user id ${req.params['id']} sent ${req.body}`)
});

// "Analytics" routes
app.get('/user/:user_id', (req, res) => {
  res.send(`user id ${req.params['user_id']} wants to know his/her score`)
})


app.listen(conf.PORT, () => {
  console.log('Server started!')
});
