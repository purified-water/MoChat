import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MoChat from './screens/Chat'
import LoginScreen from './screens/LoginScreen'

const Stack = createStackNavigator();

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
    </Stack.Navigator>
  )
}

function RootNavigator() {
  return (
    <NavigationContainer>
      <LoginStack/>
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
