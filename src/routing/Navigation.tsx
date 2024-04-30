import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Components/LoginScreen';
import MainScreen from '../Components/MainScreen';
import StockDetails from '../Components/StockDetails';
import OpenToOrder from '../Components/OpenToOrder';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Stocks"
          component={MainScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Stock_Details"
          component={StockDetails}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Open_To_Order"
          component={OpenToOrder}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
