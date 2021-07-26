import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AddDeviceScreen from '../screens/AddDeviceScreen';
import DeviceScreen from '../screens/DeviceScreen';
import Sandbox from '../components/Sandbox';
import RoomScreen from '../screens/RoomScreen';
import AddRoomScreen from '../screens/AddRoomScreen';
import AddScreen from '../screens/AddScreen';
import CustomTabBarButton from '../components/AddButton';
import {BlurView} from '@react-native-community/blur';

const Tab = createBottomTabNavigator();
const RoomStack = createStackNavigator();

function RoomStackScreen({navigation}) {
  return (
    <RoomStack.Navigator screenOptions={{headerShown: false}}>
      <RoomStack.Screen name="Rooms" component={RoomScreen} />
      <RoomStack.Screen name="Add Room" component={AddRoomScreen} />
      <RoomStack.Screen name="Devices" component={DeviceScreen} />
      <RoomStack.Screen name="Add Device" component={AddDeviceScreen} />
    </RoomStack.Navigator>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: '#1f1f1faa',
          borderRadius: 0,
          height: 90,
          paddingBottom: 40,
          borderWidth: 0,
          borderColor: 'white',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabView}>
              <Image
                source={
                  focused
                    ? require('../assets/home_filled.png')
                    : require('../assets/home_outline.png')
                }
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: focused ? 'white' : 'silver',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={RoomStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabView}>
              <Image
                source={
                  focused
                    ? require('../assets/door_filled.png')
                    : require('../assets/door_outline.png')
                }
                resizeMode="contain"
                style={{
                  width: 32,
                  height: 32,
                  tintColor: focused ? 'white' : 'silver',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabView}>
              <Image
                source={require('../assets/add256.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  bottom: 14,
                  alignSelf: 'center',
                  tintColor: focused ? 'white' : 'silver',
                }}
              />
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabView}>
              <Image
                source={
                  focused
                    ? require('../assets/notification_filled.png')
                    : require('../assets/notification_outline.png')
                }
                resizeMode="contain"
                style={{
                  width: 36,
                  height: 36,
                  tintColor: focused ? 'white' : 'silver',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Sandbox"
        component={Sandbox}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabView}>
              <Image
                source={require('../assets/round_home.png')}
                resizeMode="contain"
                style={{
                  width: 36,
                  height: 36,
                  tintColor: focused ? 'white' : 'silver',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabView: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 14,
  },
});

export default Tabs;
