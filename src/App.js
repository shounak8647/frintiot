import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import DeviceScreen from './screens/DeviceScreen';
import ComponentScreen from './screens/ComponentScreen';
import NotificationScreen from './screens/NotificationScreen';
import RoomScreen from './screens/RoomScreen';
import Sandbox from './components/Sandbox';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Rooms" component={RoomScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Sandbox" component={Sandbox} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});