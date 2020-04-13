import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { State } from './model';
import Home from './home/Index';
import Map from './map/Index';

type Props = {
  dispatch: any,
  state: State,
};

const Stack = createStackNavigator();

function Index(props: Props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{title: 'Zoga'}}
        >
          {({navigation}) =>
            <Home
              dispatch={props.dispatch}
              navigation={navigation}
              state={props.state}
            />
          }
        </Stack.Screen>
        <Stack.Screen
          name="Map"
          options={{title: 'Map'}}
        >
          {() =>
            <Map
              dispatch={props.dispatch}
              state={props.state}
            />
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default connect((state: State) => ({state}))(Index);
