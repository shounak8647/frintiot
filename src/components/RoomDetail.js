import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useState} from 'react/cjs/react.development';
import {appUrl, cookie} from '../config';
import {BlurView} from '@react-native-community/blur';

export default function RoomDetail(props) {
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    setIcon(props.icon);
  }, [props.icon]);

  return (
    <View style={styles.room}>
      <Image
        style={styles.icon}
        source={{uri: props.icon}}
        resizeMode={'contain'}
      />
      <Text style={styles.text}>{props.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  room: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
    width: 170,
    height: 170,
    justifyContent: 'center',
    borderColor: 'silver',
    borderWidth: 0,
    backgroundColor: '#1f1f1faa',
  },
  absolute: {
    position: 'absolute',
    borderRadius: 12,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  box: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 40,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  icon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 10,
    color: 'white',
    textTransform: 'capitalize',
  },
});
