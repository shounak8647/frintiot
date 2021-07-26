import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  StatusBar,
  Pressable,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {SvgUri} from 'react-native-svg';
import {appUrl, cookie} from '../config';
import IconDetail from '../components/IconDetail';
import {BlurView} from '@react-native-community/blur';

export default function AddDeviceScreen({navigation}) {
  const [icons, setIcons] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState(null);
  const [roomModal, setRoomModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const [type, setType] = useState({
    deviceType: '',
    digitalState: 'dark',
    analogState: 'dark',
  });

  const [data, setData] = useState({
    name: '',
    icon: `${appUrl}/icons/devices/28C134883D.png`,
    deviceType: 'switch',
  });

  const textInputChange = val => {
    setData({
      ...data,
      name: val,
    });
  };

  const iconInputChange = val => {
    setData({
      ...data,
      icon: val,
    });
  };

  const deviceTypeSelect = (val, val2, val3) => {
    setType({
      ...data,
      deviceType: val,
      digitalState: val2,
      analogState: val3,
    });
  };

  const getData = async () => {
    try {
      const req = await fetch(`${appUrl}/static/icons/devices`, {
        headers: {
          Cookie: cookie,
        },
      });
      console.log(appUrl, req.status);
      if (req.status == 200) {
        const res = await req.json();
        console.log(res);
        setIcons(res);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const getRooms = async () => {
    try {
      const req = await fetch(`${appUrl}/project/60b2976c8ed905d7a7ff9573`, {
        headers: {
          Cookie: cookie,
        },
      });
      console.log(appUrl, req.status);
      if (req.status == 200) {
        const res = await req.json();
        console.log(res);
        setRooms(res);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const addDevice = async (deviceName, deviceIcon, projectId, roomId) => {
    try {
      const req = await fetch(`${appUrl}/device/add`, {
        method: 'POST',
        headers: {
          Cookie: cookie,
        },
        body: JSON.stringify({
          icon: deviceIcon,
          projectId: '60b2976c8ed905d7a7ff9573',
          roomId: roomId,
          displayName: deviceName,
          properties: {type: data.deviceType},
        }),
      });
      if (req.status == 200) {
        const res = await req.body();
        console.log(res);
        alert(res);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  useEffect(getData, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require('../assets/poly_background.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.title}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            margin: 6,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.back_arrow}
            source={require('../assets/back_arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title_text}>Add Widget</Text>
      </View>
      <View style={styles.input_container}>
        <View style={styles.roomBackground}>
          <TouchableOpacity
            style={styles.tinyLogo}
            onPress={() => setModalVisible(!modalVisible)}>
            <Image style={styles.tinyLogo} source={{uri: data.icon}} />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                backgroundColor: '#000000aa',
                flex: 1,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{flex: 1, justifyContent: 'center'}}
                onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.modal}>
                  <BlurView
                    style={styles.absolute2}
                    blurType="dark"
                    blurAmount={1}
                    reducedTransparencyFallbackColor="white"
                  />
                  <ScrollView style={styles.scroll}>
                    <View style={styles.row}>
                      {icons &&
                        icons?.result.map(room => {
                          return (
                            <View style={styles.icon_wrapper}>
                              <Pressable
                                style={styles.press}
                                onPress={() => {
                                  iconInputChange(`${appUrl}${room}`);
                                  setModalVisible(!modalVisible);
                                }}>
                                <IconDetail icon={`${appUrl}${room}`} />
                              </Pressable>
                            </View>
                          );
                        })}
                      {!icons && <Text>Loading</Text>}
                    </View>
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
          <TextInput
            style={styles.room_input}
            placeholder="New Device"
            placeholderTextColor="grey"
            onChangeText={val => textInputChange(val)}
          />
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              addDevice(data.name, data.icon);
            }}>
            <Image
              style={styles.forward_arrow}
              source={require('../assets/forward_arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.deviceType}>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <Text style={styles.deviceText}>Device Type</Text>
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={styles.digital}
            onPress={() => {
              deviceTypeSelect('digital', 'light', 'dark');
            }}>
            <BlurView
              style={styles.absolute2}
              blurType={type.digitalState}
              blurAmount={1}
              reducedTransparencyFallbackColor="white"
            />
            <Image
              style={{alignSelf: 'center', height: 50, width: 50, margin: 8}}
              source={require('../assets/television.png')}
            />
            <Text style={{color: 'white', fontSize: 18, alignSelf: 'center'}}>
              Digital
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.analog}
            onPress={() => {
              deviceTypeSelect('analog', 'dark', 'light');
            }}>
            <BlurView
              style={styles.absolute2}
              blurType={type.analogState}
              blurAmount={1}
              reducedTransparencyFallbackColor="white"
            />
            <Image
              style={{alignSelf: 'center', height: 50, width: 50, margin: 8}}
              source={require('../assets/speedometer.png')}
            />
            <Text style={{color: 'white', fontSize: 18, alignSelf: 'center'}}>
              Analog
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.roomSelectorView}>
        <Text style={styles.roomText}>Select Room</Text>
        <TouchableOpacity onPress={() => setRoomModal(!roomModal)}>
          <View style={styles.picker}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                alignSelf: 'center',
                marginStart: 20,
                marginEnd: 160,
              }}>
              My Room
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={roomModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setRoomModal(!roomModal);
          }}>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center'}}
            onPress={() => setRoomModal(!roomModal)}>
            <View
              style={{
                backgroundColor: '#000000aa',
                flex: 1,
                justifyContent: 'center',
              }}>
              <View style={styles.modal}>
                <BlurView
                  style={styles.absolute2}
                  blurType="dark"
                  blurAmount={1}
                  reducedTransparencyFallbackColor="white"
                />
                <ScrollView style={styles.scroll}>
                  <View style={styles.row}>
                    {rooms &&
                      rooms?.result.map(room => {
                        return (
                          <View style={styles.icon_wrapper}>
                            <Pressable
                              style={styles.press}
                              onPress={() => {
                                iconInputChange(`${appUrl}${room}`);
                                setRoomModal(!roomModal);
                              }}>
                              <IconDetail icon={`${appUrl}${room}`} />
                            </Pressable>
                          </View>
                        );
                      })}
                    {!rooms && <Text>Loading</Text>}
                  </View>
                </ScrollView>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    flexDirection: 'column',
  },
  title: {
    height: 100,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginTop: 60,
    borderWidth: 0,
    borderColor: 'red',
  },
  back_arrow: {
    height: 42,
    width: 42,
    alignSelf: 'center',
    marginStart: 8,
  },
  title_text: {
    alignSelf: 'center',
    marginStart: 0,
    fontSize: 42,
    color: 'white',
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    justifyContent: 'center',
  },
  input_container: {
    borderColor: 'red',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 0,
    borderColor: 'white',
    marginTop: 40,
    marginBottom: 24,
  },
  roomBackground: {
    flex: 1,
    borderRadius: 20,
    height: 66,
    alignSelf: 'center',
    marginStart: 20,
    marginEnd: 20,
    flexDirection: 'row',
    backgroundColor: '#1f1f1faa',
    borderWidth: 0.5,
    borderColor: 'white',
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginStart: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: 'red',
  },
  modal: {
    height: 400,
    marginStart: 20,
    marginEnd: 20,
    padding: 0,
    borderRadius: 20,
    borderWidth: 0,
    borderColor: 'white',
  },
  forward_arrow: {
    alignSelf: 'center',
    margin: 10,
    height: 34,
    width: 34,
  },
  scroll: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0,
    borderColor: 'white',
  },
  icon_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderColor: 'red',
    borderWidth: 0,
    alignSelf: 'center',
    width: '33.33%',
  },
  room_input: {
    flex: 1,
    padding: 15,
    color: 'white',
    fontSize: 20,
  },
  deviceType: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'white',
    height: 200,
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 24,
    backgroundColor: '#1f1f1faa',
  },
  deviceText: {
    color: 'grey',
    fontSize: 20,
    marginStart: 14,
    marginTop: 10,
  },
  typeContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'white',
    flex: 1,
  },
  digital: {
    borderRadius: 20,
    margin: 26,
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: 'grey',
  },
  analog: {
    borderRadius: 20,
    margin: 26,
    alignSelf: 'center',
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: 'grey',
  },
  roomSelectorView: {
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 20,
    height: 200,
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: '#1f1f1faa',
  },
  roomText: {
    color: 'grey',
    fontSize: 20,
    marginStart: 14,
    marginTop: 10,
    marginBottom: 14,
  },
  picker: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
    height: 130,
    width: 130,
    margin: 0,
    alignSelf: 'center',
  },
  absolute: {
    position: 'absolute',
    borderRadius: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  absolute2: {
    position: 'absolute',
    borderRadius: 20,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
