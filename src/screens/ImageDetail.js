import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';
import {appUrl, cookie} from '../config';
import {BlurView} from '@react-native-community/blur';

import {IconContext} from '../components/context';

export default function ImageDetail(props) {
  return (
    <View style={styles.icon}>
      <Image style={styles.test} source={{uri: props.icon}} />
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    borderRadius: 10,
    height: 60,
    width: 60,
    position: 'absolute',
    alignSelf: 'center',
    top: -10,
    left: 0,
    bottom: 0,
    right: 0,
  },
  box: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 40,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  icon: {
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 0,
    width: 60,
    height: 60,
    justifyContent: 'center',
  },
  test: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
});
