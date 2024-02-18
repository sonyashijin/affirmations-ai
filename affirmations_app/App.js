import React from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CONVEX_URL } from "@env";

import Welcome from "./Welcome";
import StartScreen from "./Start";
import ProfileScreen from "./Profile";
import HomeScreen from "./Home";
import Onboarding from "./Onboarding";
import ChatBubble from './Home_dark';

// Create a ConvexReactClient instance
const convex = new ConvexReactClient(CONVEX_URL);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Home" component={ChatBubble}  options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ConvexProvider>
  );
}
