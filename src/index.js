import {View, Text, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
const apiKey = "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"
const apiUrl = "https://api.openai.com/v1/chat/completions"
const moChat = () => {
    const [input, setInput] = useState('');
    const [messagesList, setMessagesList] = useState([]);
    
    const handleSend = async () => {
        const message = {

        }
    }
}