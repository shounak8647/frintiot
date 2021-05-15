import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DeviceDetail(props) {
    
    return(
        <View style={styles.box}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: '#ddd',
        padding: 40,
        margin: 20,
        borderRadius: 10,
        justifyContent: 'flex-start',
    },
    icon: {
        backgroundColor: '#000',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
    },
});