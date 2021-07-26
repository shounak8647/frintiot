import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import RoomDetail from '../components/RoomDetail';
import {appUrl, socketUrl, cookie} from '../config';
import {getRooms} from '../components/GetData';
import AddRoomScreen from './AddRoomScreen';
import {BlurView} from '@react-native-community/blur';
import store from '../components/redux/store';
import {setRoom} from '../components/redux/actions';
import {io} from 'socket.io-client';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SET_ROOM} from '../components/redux/actionTypes';

const Stack = createStackNavigator();

export default function RoomScreen({navigation}) {
  const [project, setProject] = useState(null);
  const socket = io(socketUrl);

  const getData = async () => {
    try {
      const req = await fetch(`${appUrl}/project/60b2976c8ed905d7a7ff9573`, {
        headers: {
          Cookie: `Authorization=${cookie}`,
        },
      });
      //console.log(appUrl, req.status);
      if (req.status == 200) {
        const res = await req.json();
        setProject(res);
        store.dispatch({
          type: SET_ROOM,
          payload: res,
        });
        //console.log(store);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err);
    }
  };

  socket.on('connect', () => {
    console.log(socket.id);
  });

  //console.log(socketUrl);

  //store.subscribe(() => {});

  useEffect(getData, []);

  if (!project)
    return (
      <View style={styles.loader_container}>
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loading}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/poly_background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.title}>
        <View style={styles.header}>
          <Text style={styles.title_text}>Rooms</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Add Room')}
            style={styles.iconOutline}>
            <Image
              source={require('../assets/add256.png')}
              style={styles.add_icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          {project.result.rooms.map(room => {
            return (
              <View style={styles.room_wrapper} key={room._id}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Devices')}>
                  <RoomDetail
                    roomId={room._id}
                    projectId={room.projectId}
                    displayName={room.displayName}
                    icon={`${appUrl}${room.icon}`}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
    borderWidth: 0,
    borderColor: 'white',
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
    marginTop: 0,
    marginStart: 0,
    marginEnd: 0,
    height: 100,
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    width: width,
    justifyContent: 'center',
  },
  title_text: {
    marginTop: 26,
    alignSelf: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    borderWidth: 0,
    borderColor: 'white',
  },
  iconOutline: {
    position: 'absolute',
    start: width - 56,
    bottom: 18,
    height: 36,
    width: 36,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 0,
    borderColor: 'white',
    backgroundColor: '#3f3f3faa',
  },
  add_icon: {
    alignSelf: 'center',
    width: 18,
    height: 18,
    borderWidth: 0,
    borderColor: 'white',
  },
  loader_container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scroll: {
    flexDirection: 'column',
    borderWidth: 0,
    borderColor: 'white',
    marginTop: 10,
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 90,
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    borderWidth: 0,
    borderColor: 'red',
  },
  room_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    width: '50%',
    maxWidth: '50%',
    borderWidth: 0,
    borderColor: 'yellow',
  },
  loading: {
    alignSelf: 'center',
  },
  absolute: {
    borderRadius: 24,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
