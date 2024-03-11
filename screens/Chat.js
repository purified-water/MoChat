import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Constants from 'expo-constants'; 
import axios from 'axios';

const apiKey = Constants.expoConfig.extra.open_ai_api_key;
const apiUrl = Constants.expoConfig.extra.open_ai_url;
import { MessageUser, MessageBot } from '../components/MessageBox';



const MoChat = () => {
    const [input, setInput] = useState('');
    const [messagesList, setMessagesList] = useState([
        { type: 'bot', text: 'Hello! I am MoChat. How can I help you today?' },
        { type: 'user', text: 'I would like to know more about your products' }

    ]);

    const handleSend = async () => {
        const prompt = input;
        console.log('prompt', prompt);
        try {
            const response = await axios.post(apiUrl, {
                messages: [{"role": "user", "content": `${prompt}`}],
                model: 'gpt-3.5-turbo',
                max_tokens: 1024,
                temperature: 0.5
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
    
            })
            console.log(response.data.choices[0].message.content);
            const reply = response.data.choices[0].message.content.trim();
    
            setMessagesList([...messagesList, { type: 'user', text: input }, { type: 'bot', text: reply }]);
            // Clear input
            setInput('');
        } catch (error) {
            console.log(error);
        }
        

    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messagesList}
                renderItem={({ item }) => {
                    if (item.type === 'user') {
                        return <MessageUser text={item.text}/>;
                    } else {
                        return <MessageBot text={item.text}/>;
                    }
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            <View
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    onChangeText={setInput}
                    placeholder='Type a message...'
                />
                <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={handleSend}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
export default MoChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#808080'

    },
    inputContainer: {
        height: 40,
        marginBottom: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        height: '100%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        flex: 1
    },

    sendButton: {
        backgroundColor: 'blue',
        height: '100%',
        width: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    


});

