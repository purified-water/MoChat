import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';

export const MessageUser = ({ text }) => (
    <View style={styles.messageUser}>
        <Text>User: {text}</Text>
    </View>
);

export const MessageBot = ({ text }) => (
    <View style={styles.messageBot}>
        <Text>Bot: {text}</Text>
    </View>
);

const styles = StyleSheet.create({
    
    messageUser: {
        padding: 5,
        margin: 2,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    messageBot: {
        padding: 5,
        margin: 2,
        borderRadius: 10,
        backgroundColor: 'blue',
    },


});
