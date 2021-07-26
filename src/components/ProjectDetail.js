import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProjectDetail(props) {
    
    return(
        <View style={styles.room}>
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
    },
    room: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});