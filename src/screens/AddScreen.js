import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

export default function AddScreen() {
  const [modalVisible, setModalVisible] = useState(true);

  const renderInner = () => <Text>Hello</Text>;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: 400,
    borderRadius: 28,
    backgroundColor: 'black',
    borderWidth: 0,
    borderColor: 'blue',
  },
  pill: {
    width: 60,
    height: 4,
    borderRadius: 35,
    backgroundColor: 'silver',
    alignSelf: 'center',
    marginTop: 10,
  },
  header: {},
  panelHeader: {},
  panelHandle: {},
});
