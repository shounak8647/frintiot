import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {useState} from 'react/cjs/react.development';
import {appUrl, cookie} from '../config';
import {BlurView} from '@react-native-community/blur';

export default function SandboxDetail(props) {
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    setIcon(props.icon);
  }, [props.icon]);

  console.log(props.icon);
  return (
    <View style={styles.room}>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <Image
        style={styles.icon}
        source={{uri: props.icon}}
        resizeMode={'contain'}
      />
      <Text style={styles.text}>{props.room.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  room: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderColor: 'silver',
    borderWidth: 0,
    borderRadius: 20,
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
    width: 50,
    height: 50,
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
