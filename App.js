import React, { useContext, useEffect, useState, createContext} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MoChat from './screens/ChatScreen/Chat';
import LoginScreen from './screens/AuthenticationScreen/LoginScreen';
import SignupScreen from './screens/AuthenticationScreen/SignupScreen';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({children}) => {
  
}


function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={MoChat}/>
    </Stack.Navigator>
  ) 
}

function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Signup" component={SignupScreen}/>
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <NavigationContainer>
      {/* <LoginStack/> */}
      

      <ChatStack/>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <RootNavigator/>
  );
}

const styles = StyleSheet.create({

});
