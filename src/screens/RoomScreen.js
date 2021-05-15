import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RoomDetail from '../components/RoomDetail'

export default function DeviceScreen() {

  return(
    <View style={styles.container}>
      <RoomDetail 
        title="Living Room" 
        imageSource={require('../assets/forest.jpg')} />
      <RoomDetail 
        title="Kid's Room" 
        imageSource={require('../assets/beach.jpg')}/>
      <RoomDetail 
        title="Master Bedroom" 
        imageSource={require('../assets/mountain.jpg')}/>
      <RoomDetail 
        title="Kitchen" 
        imageSource={require('../assets/forest.jpg')}/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#333'
    },
});