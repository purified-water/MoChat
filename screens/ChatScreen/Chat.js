import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import Constants from 'expo-constants';
import axios from 'axios';
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from 'firebase/firestore'
// import { GiftedChat } from 'react-native-gifted-chat';
import { auth, database } from '../../config/firebase'

const apiKey = Constants.expoConfig.extra.open_ai_api_key;
const apiUrl = Constants.expoConfig.extra.open_ai_url;
import { MessageUser, MessageBot } from '../../components/MessageBox';
import { TokenOptimizer } from './TokenOptimizer';

// Temporary test data
const user = {
    id: "flHKuqZwqsRCH28Zl352gq46gdE2",
    mail: "admin@gmail.com",
}

/*
Chat document structure:
chat:
    id: string
    messages: [
        {
            role: string,
            content: string
            createdAt: timestamp
        },
        {
            role: string,
            content: string
            createdAt: timestamp
        }
    ]
    createdAt: timestamp

*/

const MoChat = ({ navigation }) => {

    console.log('Firestore is on?', database);
    // const [messagesList, setMessagesList] = useState([
    //     { type: 'bot', text: 'Hello! I am MoChat. How can I help you today?' },
    //     { type: 'user', text: 'I would like to know more about your products' }

    // ]);

    const [input, setInput] = useState('');
    const [chatId, setChatId] = useState(null); // State to hold the current chat ID
    const [messagesList, setMessagesList] = useState([]);

    const handleSend = useCallback(async () => {
        if (!chatId) return; // Ensure chat ID exists

        const message = {
            role: 'user',
            content: input,
            createdAt: serverTimestamp(),
        };

        try {
            await addDoc(collection(database, 'chats', chatId, 'messages'), message);
            setInput('');
        } catch (error) {
            console.log("Error in sending message", error);
        };

        // Bot response handling remains the same

        // console.log('message', message);
        try {
            const response = await axios.post(apiUrl, {
                messages: [{ "role": "user", "content": `${message.text}` }],
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
        } catch (error) {
            console.log('Error in getting reply from OpenAI', error);
        }

        // Create reply object for the bot
        const botReply = {
            _id: 'bot',
            text: reply,
            createdAt: new Date(),
            user: {
                _id: 'bot',
                avatar: 'https://i.pravatar.cc/517'
            }
        }
        // Add bot reply to the chat
        // setMessagesList(previousMessages => GiftedChat.append(previousMessages, botReply));
        setMessagesList([...messagesList, botReply]);

        try {
            await addDoc(collection(database, 'chats', chatId, 'messages'), { botReply });

            // Clear input
            setInput('');
        } catch (error) {
            console.log("Error in bot sending message", error);
        }

    }, [chatId, input]);

    useLayoutEffect(() => {
        // Function to generate a new chat ID
        const generateChatId = () => {
            const newChatRef = collection(database, 'chats').doc();
            setChatId(newChatRef.id);
        };

        // Generate chat ID if not already set
        if (!chatId) {
            generateChatId();
        }

        // Listener for messages under the current chat ID
        const unsubscribe = chatId && onSnapshot(
            query(collection(database, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc')),
            (snapshot) => {
                setMessagesList(snapshot.docs.map(doc => doc.data()));
            }
        );

        return () => unsubscribe && unsubscribe(); // Cleanup listener

    }, [chatId]);
    return (

        <SafeAreaView style={styles.container}>
            {/* <GiftedChat
                messages={messagesList}
                onSend={handleSend}
                user={{
                    _id: user.id,
                    avatar: "https://i.pravatar.cc/517"
                }}
            /> */}
            <FlatList
                data={messagesList}
                renderItem={({ item }) => {
                    if (item.type === 'user') {
                        return <MessageUser text={item.text} />;
                    } else {
                        return <MessageBot text={item.text} />;
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

