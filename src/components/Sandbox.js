import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {BlurView} from '@react-native-community/blur';
import SandboxDetail from '../components/SandboxDetail';
import {appUrl, cookie} from '../config';
import {FlatList} from 'react-native-gesture-handler';

export default function Sandbox() {
  const [project, setProject] = useState(null);

  const getData = async () => {
    try {
      const req = await fetch(`${appUrl}/project/60b2976c8ed905d7a7ff9573`, {
        headers: {
          Cookie: cookie,
        },
      });
      console.log(appUrl, req.status);
      if (req.status == 200) {
        const res = await req.json();
        console.log(res);
        setProject(res);
      } else {
        alert('Something alert');
      }
    } catch (err) {
      alert(err);
    }
  };

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
      <View style={styles.modal}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            {project.result.rooms.map(room => {
              return (
                <View style={styles.room_wrapper} key={room._id}>
                  <SandboxDetail
                    roomId={room._id}
                    projectId={room.projectId}
                    devices={room.devices}
                    room={room}
                    icon={`${appUrl}${room.icon}`}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    justifyContent: 'center',
  },
  add_icon: {
    flex: 1,
    alignSelf: 'center',
    width: 30,
    height: 30,
    borderWidth: 0,
    borderColor: 'white',
    marginStart: 22,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
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
  bar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: 45,
    marginTop: 50,
    justifyContent: 'flex-end',
    borderWidth: 0,
    borderColor: 'white',
  },
  title: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 40,
    height: 100,
    borderWidth: 0,
    borderColor: 'red',
  },
  title_text: {
    flex: 3,
    alignSelf: 'center',
    marginStart: 5,
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    borderWidth: 0,
    borderColor: 'white',
  },
  scroll: {
    flexDirection: 'column',
    borderWidth: 0,
    borderColor: 'yellow',
    marginStart: 10,
    marginEnd: 10,
    borderWidth: 0,
    borderColor: 'yellow',
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'red',
  },
  room_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    width: '50%',
    maxWidth: '50%',
    borderWidth: 1,
    borderColor: 'yellow',
  },
  loading: {
    alignSelf: 'center',
  },
});
