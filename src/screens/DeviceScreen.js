import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {appUrl, cookie} from '../config';
import DeviceDetail from '../components/DeviceDetail';
import {BlurView} from '@react-native-community/blur';

export default function DeviceScreen({navigation}) {
  const [device, setDevice] = useState(null);
  const pid = '60b2976c8ed905d7a7ff9573';
  const rid = '60edc33f9a6f2e34714f64d7';

  const getData = async (projectId, roomId) => {
    try {
      const req = await fetch(`${appUrl}/widget/${pid}/${rid}`, {
        headers: {
          Cookie: `Authorization=${cookie}`,
          'Content-Type': 'application/json',
        },
      });
      if (req.status == 200) {
        const res = await req.json();
        setDevice(res);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(getData, []);

  if (!device)
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
        <Text style={styles.title_text}>Widgets</Text>
        <View style={styles.iconContainer}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Add Device')}
              style={styles.iconOutline}>
              <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={1}
                reducedTransparencyFallbackColor="white"
              />
              <Image
                source={require('../assets/add256.png')}
                style={styles.add_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          {device.result.map(device => {
            return (
              <View style={styles.room_wrapper} key={device._id}>
                <DeviceDetail
                  roomId={device.roomId}
                  projectId={device.projectId}
                  deviceId={device.deviceId}
                  displayName={device.displayName}
                  icon={`${appUrl}${device.icon}`}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    justifyContent: 'center',
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
  title: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginTop: 60,
    marginStart: 20,
    marginEnd: 20,
    height: 100,
    borderWidth: 0,
    borderColor: 'red',
  },
  title_text: {
    flex: 3,
    alignSelf: 'center',
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    borderWidth: 0,
    borderColor: 'white',
  },
  iconContainer: {
    borderWidth: 0,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconOutline: {
    height: 48,
    width: 48,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 0,
    borderColor: 'white',
    padding: 0,
  },
  add_icon: {
    alignSelf: 'center',
    width: 20,
    height: 20,
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
