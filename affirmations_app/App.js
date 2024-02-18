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
import Onboarding from "./Onboarding";
import ChatBubble from './Home_dark';
import PersonalInfoScreen from './PersonalInfo2';

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
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={ChatBubble}  options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ConvexProvider>
  );
}
