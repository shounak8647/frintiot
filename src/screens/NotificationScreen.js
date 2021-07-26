import React from 'react';
import {View, Text, Pressable, Button} from 'react-native';
import {AuthContext} from '../components/context';

export default function NotificationScreen() {
  const {signOut} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notifications</Text>
      <Button
        onPress={() => {
          signOut();
        }}
        title="Sign Out"
      />
    </View>
  );
}
