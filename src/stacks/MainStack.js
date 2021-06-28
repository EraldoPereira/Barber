import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import Preload from '../screens/Preload'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

import MainTab from './MainTab';

const Stack = createStackNavigator()

export default function MyStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="MainTab" component={MainTab} />
        </Stack.Navigator>
        )
}