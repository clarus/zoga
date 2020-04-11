import React, { Component } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import Config from 'react-native-config';
import Index from './src/Index';
import store from './src/store';

export default class App extends Component {
  componentDidMount(): void {
    console.log('Application started');
    console.log('Config', Config.API_URL);
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}
