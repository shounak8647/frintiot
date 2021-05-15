import React from 'react';
import { View, Text } from 'react-native';
import DeviceDetail from '../components/DeviceDetail'

export default function DeviceScreen() {

  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DeviceDetail room="Living Room" type="Light" status="On"/>
      <DeviceDetail room="Kid's Room" type="AC" status="Off"/>
      <DeviceDetail room="Master Bedroom" type="AC" status="On"/>
      <DeviceDetail room="Kitchen" type="Light" status="Off"/>
    </View>
  );
}