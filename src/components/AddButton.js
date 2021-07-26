import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';

export default CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: 15,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 18,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: 'white',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({});
