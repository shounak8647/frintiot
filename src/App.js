import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Tabs from './navigation/Tabs';
import {appUrl, cookie} from './config';
import {DrawerContent} from './navigation/DrawerContent';

import {AuthContext} from './components/context';

const RootStack = createStackNavigator();

function RootStackScreen({navigation}) {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="SignUp" component={SignUpScreen} />
    </RootStack.Navigator>
  );
}

export default function App() {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  initialLoginState = {
    isLoading: true,
    userEmail: null,
    userToken: null,
  };

  loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userEmail: action.email,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userEmail: action.email,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (userEmail, password) => {
        // setUserToken('wdwd');
        // setIsLoading(false);
        let userToken;
        try {
          const req = await fetch(`${appUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: userEmail,
              password: password,
            }),
          });
          if (req.status == 200) {
            const res = await req.json();
            console.log(res);
            userToken = res.token;
          } else {
            alert('Incorrect email or password.');
          }
        } catch (err) {
          alert(err);
        }
        dispatch({type: 'LOGIN', id: userEmail, token: userToken});
      },
      signOut: () => {
        // setUserToken(null);
        // setIsLoading(false);
        dispatch({type: 'LOGOUT'});
        console.log('logged out');
      },
      signUp: () => {
        // setUserToken('wdwd');
        // setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false);
      let userToken;
      userToken = cookie;
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? <Tabs /> : <RootStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  add_text: {
    color: 'black',
    fontSize: 20,
    marginEnd: 10,
    alignSelf: 'flex-end',
  },
  add_icon: {
    marginStart: 120,
    alignSelf: 'center',
    width: 38,
    height: 38,
    marginEnd: 12,
  },
  bar: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    height: 50,
    justifyContent: 'center',
  },
});
