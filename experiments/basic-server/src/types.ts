export type Location = {
  lat: number,
  lng: number,
};

export type UserEvent = {
  id: string,
  isSick: boolean,
  location: Location,
};

export type State = UserEvent[];