import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  StatusBar,
  Image,
} from 'react-native';
import {appUrl, cookie} from '../config';
import {BlurView} from '@react-native-community/blur';
import {Svg} from 'react-native-svg';
import Email from '../assets/email.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
//import CookieManager from 'react-native-cookies';

import {AuthContext} from '../components/context';

export default function LoginScreen({navigation}) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const textInputChange = val => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const [text, setText] = useState('');
  const [pass, setPass] = useState('');

  const login = async () => {
    try {
      const req = await fetch(`${appUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: text,
          password: pass,
        }),
      });
      if (req.status == 200) {
        const res = await req.body();
        console.log(res);
        alert(res);
      } else {
        alert('Some alert');
      }
    } catch (err) {
      alert(err);
    }
  };

  const forgotPassword = async () => {
    alert('You forgot your password dummy');
  };

  const loginHandler = (email, password) => {
    signIn(email, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/poly_background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.title}>
        <Text style={styles.title_text}>Log in</Text>
      </View>
      <View style={styles.login_view}>
        <View style={styles.emailView}>
          <Image
            style={styles.emailIcon}
            source={require('../assets/email.png')}
          />
          <Text style={styles.emailTag}>Email</Text>
        </View>
        <View style={styles.emailBackground}>
          <TextInput
            style={styles.email_input}
            placeholder="Enter your email"
            placeholderTextColor="grey"
            textContentType="emailAddress"
            onChangeText={val => textInputChange(val)}
            defaultValue={text}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.passView}>
          <Image
            style={styles.passIcon}
            source={require('../assets/padlock.png')}
          />
          <Text style={styles.passTag}>Password</Text>
        </View>
        <View style={styles.passBackground}>
          <TextInput
            style={styles.pass_input}
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholder="Enter your password"
            placeholderTextColor="grey"
            textContentType="password"
            onChangeText={val => handlePasswordChange(val)}
            defaultValue={pass}
            autoCapitalize="none"
          />
        </View>
        <Pressable style={styles.forgot_pass_touch} onPress={forgotPassword}>
          <Text style={{color: 'white'}}>Forgot Password?</Text>
        </Pressable>
        <View style={styles.login_button}>
          <Pressable
            style={styles.login_pressable}
            onPress={() => {
              loginHandler(data.email, data.password);
            }}
            title="Login"
            accessibilityLabel="Press to login">
            <Text style={styles.login_text}>Log in</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{color: 'white'}}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    height: 80,
    borderWidth: 0,
    borderColor: 'red',
    marginTop: 60,
  },
  title_text: {
    alignSelf: 'center',
    marginStart: 20,
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
  login_view: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    borderWidth: 0,
    borderColor: 'red',
  },
  emailView: {
    marginStart: 20,
    marginEnd: 20,
    marginTop: 80,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  emailIcon: {
    marginStart: 10,
    height: 20,
    width: 20,
  },
  emailTag: {
    marginStart: 8,
    color: 'white',
    fontSize: 18,
  },
  emailBackground: {
    borderWidth: 2,
    borderColor: 'silver',
    flexDirection: 'row',
    height: 56,
    borderRadius: 14,
    marginTop: 8,
    marginStart: 20,
    marginEnd: 20,
  },
  email_input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 16,
  },
  passView: {
    marginTop: 22,
    marginEnd: 20,
    marginStart: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  passIcon: {
    marginStart: 10,
    height: 20,
    width: 20,
  },
  passTag: {
    color: 'white',
    marginStart: 8,
    fontSize: 18,
  },
  passBackground: {
    borderWidth: 2,
    borderColor: 'silver',
    flexDirection: 'row',
    height: 56,
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 10,
    marginStart: 20,
    marginEnd: 20,
  },
  pass_input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    padding: 16,
  },
  forgot_pass_touch: {
    flexDirection: 'row',
    color: 'white',
    alignSelf: 'flex-end',
    marginEnd: 32,
    marginBottom: 30,
  },
  login_button: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'silver',
    height: 56,
    borderRadius: 14,
    color: 'white',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: 'silver',
  },
  login_text: {
    marginTop: 0,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  login_pressable: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 0,
    borderColor: 'red',
    color: '#841584',
    justifyContent: 'center',
  },
  signUp: {
    color: 'white',
    fontWeight: 'bold',
    marginStart: 5,
  },
  absolute: {
    position: 'absolute',
    borderRadius: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
