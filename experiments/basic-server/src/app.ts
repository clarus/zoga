import * as express from "express";

type Location = {
  lat: number,
  lng: number,
};

type UserEvent = {
  id: string,
  isSick: boolean,
  location: Location,
};

type State = UserEvent[];

const app = express();

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(3000, () => {
  console.log('Server started!')
});
