import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  StatusBar,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {appUrl, cookie} from '../config';
import IconDetail from '../components/IconDetail';
import {BlurView} from '@react-native-community/blur';
import {roomAdded} from '../components/redux/actions';
import store from '../components/redux/store';

export default function AddRoomScreen({navigation}) {
  const [icons, setIcons] = useState(null);
  const [text, onChangeText] = React.useState('');

  const [data, setData] = useState({
    name: '',
    displayIcon: `${appUrl}/icons/rooms/0120388F53.png`,
    icon: '/icons/rooms/0120388F53.png',
  });

  const textInputChange = val => {
    setData({
      ...data,
      name: val,
    });
  };

  const iconInputChange = val => {
    setData({
      ...data,
      displayIcon: `${appUrl}${val}`,
      icon: val,
    });
  };

  const getData = async () => {
    try {
      const req = await fetch(`${appUrl}/static/icons/rooms`, {
        headers: {
          Cookie: cookie,
        },
      });
      console.log(appUrl, req.status);
      if (req.status == 200) {
        const res = await req.json();
        console.log(res);
        setIcons(res);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const addRoom = async (roomName, userIcon) => {
    try {
      const req = await fetch(
        `${appUrl}/project/60b2976c8ed905d7a7ff9573/create-room`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `Authorization=${cookie}`,
          },
          body: JSON.stringify({
            displayName: roomName,
            icon: userIcon,
          }),
        },
      );
      if (req.status == 200) {
        const res = await req.json();
        console.log(res);
        store.dispatch(roomAdded(roomName, userIcon));
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(getData, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/poly_background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.title}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            margin: 6,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.back_arrow}
            source={require('../assets/back_arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title_text}>Add Room</Text>
      </View>
      <View style={styles.input_container}>
        <View style={styles.roomBackground}>
          <Image style={styles.tinyLogo} source={{uri: data.displayIcon}} />
          <TextInput
            style={styles.room_input}
            placeholder="New Room"
            placeholderTextColor="grey"
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              addRoom(text, data.icon);
              console.log(text, data.icon);
              navigation.goBack();
            }}>
            <Image
              style={styles.forward_arrow}
              source={require('../assets/forward_arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.scroll}>
        <ScrollView style={{flex: 1, borderRadius: 20}}>
          <View style={styles.row}>
            {icons &&
              icons?.result.map(icon => {
                return (
                  <View style={styles.icon_wrapper} key={icon}>
                    <Pressable
                      style={styles.press}
                      onPress={() => {
                        iconInputChange(icon);
                        console.log(icon);
                      }}>
                      <IconDetail icon={`${appUrl}${icon}`} />
                    </Pressable>
                  </View>
                );
              })}
            {!icons && <Text>Loading</Text>}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  press: {
    borderColor: 'red',
    borderWidth: 0,
    color: 'transparent',
  },
  container: {
    backgroundColor: '#000000',
    flexDirection: 'column',
    borderWidth: 0,
    borderColor: 'blue',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    justifyContent: 'center',
  },
  title: {
    height: 100,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'red',
    marginTop: 60,
  },
  back_touch: {
    padding: 12,
    margin: 12,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 0.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back_arrow: {
    height: 42,
    width: 42,
    alignSelf: 'center',
    marginStart: 8,
  },
  title_text: {
    alignSelf: 'center',
    marginStart: 0,
    fontSize: 42,
    color: 'white',
    fontWeight: 'bold',
  },
  input_container: {
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 0,
    borderColor: 'white',
    marginTop: 60,
    marginBottom: 30,
  },
  forward_arrow: {
    alignSelf: 'center',
    margin: 10,
    height: 34,
    width: 34,
  },
  roomBackground: {
    flex: 1,
    borderRadius: 8,
    height: 60,
    alignSelf: 'center',
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'row',
    backgroundColor: '#1f1f1faa',
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginStart: 10,
    alignSelf: 'center',
  },
  submit: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: 'white',
  },
  scroll: {
    borderRadius: 20,
    marginBottom: 20,
    marginStart: 20,
    marginEnd: 20,
    borderColor: 'yellow',
    alignSelf: 'center',
    height: 400,
    backgroundColor: '#1f1f1faa',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0,
    borderColor: 'white',
  },
  room_input: {
    flex: 1,
    padding: 15,
    color: 'white',
    fontSize: 20,
  },
  icon_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderColor: 'red',
    borderWidth: 0,
    alignSelf: 'center',
    width: '33.33%',
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
