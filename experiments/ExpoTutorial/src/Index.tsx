import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Controller from './controller';
import { State } from './model';
import Bluetooth from './bluetooth/Index';
import Home from './home/Index';
import Map from './map/Index';

type Props = {
  dispatch: any;
  state: State;
};

const Stack = createStackNavigator();

class Index extends Component<Props> {
  componentDidMount(): void {
    this.props.dispatch(Controller.setupBackgroundCheck());
  }

  render() {
    const { dispatch, state } = this.props;

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ title: 'Zoga' }}>
            {({ navigation }) => (
              <Home dispatch={dispatch} navigation={navigation} state={state} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Map" options={{ title: 'Map' }}>
            {() => <Map dispatch={dispatch} state={state} />}
          </Stack.Screen>
          <Stack.Screen name="Bluetooth" options={{ title: 'Bluetooth' }}>
            {() => <Bluetooth dispatch={dispatch} state={state} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect((state: State) => ({ state }))(Index);
