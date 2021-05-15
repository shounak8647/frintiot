import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Touchable } from 'react-native';
import { Button } from '@material-ui/core';
import { appUrl } from '../config';

export default function HomeScreen() {

  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

//export default HomeScreen;
