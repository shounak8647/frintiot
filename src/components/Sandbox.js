import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default function Sandbox() {
    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text}>Living Room</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Kid's Room</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Master Bedroom</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Kitchen</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Kitchen</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Kitchen</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#333'
    },
    box: {
        backgroundColor: '#ddd',
        padding: 40,
        margin: 20,
    },
    text: {
        fontSize: 30,
        textAlign: 'right',
    },
});