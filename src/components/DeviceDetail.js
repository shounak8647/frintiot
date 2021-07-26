import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';

export default function DeviceDetail(props) {
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
      <Text style={styles.text}>{props.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    borderRadius: 12,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  room: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 12,
    width: 170,
    height: 170,
    justifyContent: 'center',
    borderColor: 'silver',
    borderWidth: 0,
    borderRadius: 20,
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
