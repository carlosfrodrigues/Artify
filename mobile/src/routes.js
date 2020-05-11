import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Arts from './pages/Arts';
import Detail from './pages/Detail'
import Search from './pages/Search'

const AppStack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={ {headerShown: false} }>
                <AppStack.Screen name="Arts" component={Arts} />
                <AppStack.Screen name="Detail" component={Detail} />
                <AppStack.Screen name="Search" component={Search} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}