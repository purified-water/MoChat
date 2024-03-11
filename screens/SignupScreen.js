import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Image, KeyboardAvoidingView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
const background = require('../assets/purple-surface.png');

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        if (email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log('Sign up success'))
                .catch(error => Alert.alert('Error', error.message));

        }
        else if (email === '' || password === '') {
            Alert.alert('Error', 'Email and password are required');
        }
    } 

    return (
        <View style={styles.container}>
            <Image source={background} style={styles.backImage}></Image>
            <View style={styles.loginContainer}>

            </View>
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter email'
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    value={email}
                    onChangeText={(text) => setEmail(text)}>
                </TextInput>
                <TextInput
                    style={styles.input}
                    placeholder='Enter password'
                    autoCapitalize='none'
                    textContentType='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}>

                </TextInput>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }} onPress={handleSignup}>Sign up</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#522687', fontWeight: 'bold' }}>Log in</Text>
                    </TouchableOpacity>
                </View>



            </SafeAreaView>
        </View>


    )
}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backImage: {
        width: '100%',
        height: '40%',
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    loginContainer: {
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 70
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 240
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#522687',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#F6F7FB',
        height: 58,
        width: 300,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 10
    },
    button: {
        height: 58,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#522687',
        borderRadius: 10
    }
});

