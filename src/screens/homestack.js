import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';
import ComentarPosteo from './comentarposteo';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={Home} />
      <Stack.Screen name="ComentarPosteo" component={ComentarPosteo} />
    </Stack.Navigator>
  );
}