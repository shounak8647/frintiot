import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import {appUrl} from '../config';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/poly_background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.bar}></View>
      <View style={styles.title}>
        <Text style={styles.title_text}>Apartment</Text>
      </View>
      <View style={styles.scenes_container}>
        <Text style={styles.scenes_text}>Favourite Scenes</Text>
      </View>
      <View style={styles.devices_container}>
        <Text style={styles.devices_text}>Favourite Devices</Text>
      </View>
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
  bar: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: 45,
    marginTop: 20,
    justifyContent: 'flex-end',
    borderWidth: 0,
    borderColor: 'white',
  },
  title: {
    flex: 3,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 10,
    height: 140,
    borderWidth: 1,
    borderColor: 'red',
  },
  title_text: {
    alignSelf: 'flex-start',
    marginStart: 12,
    fontSize: 38,
    color: 'white',
    fontWeight: 'bold',
  },
  scenes_container: {
    flex: 4,
    borderWidth: 1,
    borderColor: 'red',
    marginBottom: 10,
  },
  scenes_text: {
    alignSelf: 'flex-start',
    marginStart: 12,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  devices_container: {
    flex: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  devices_text: {
    marginStart: 12,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  add_icon: {
    marginStart: 100,
    alignSelf: 'center',
    width: 38,
    height: 38,
    marginEnd: 12,
  },
});

//export default HomeScreen;
