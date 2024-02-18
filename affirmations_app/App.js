import { ConvexProvider, ConvexReactClient } from "convex/react";
import "react-native-get-random-values";
// import { CONVEX_URL } from "@env";
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { IconRegistry } from '@ui-kitten/components';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CONVEX_URL } from "@env";

import Welcome from "./Welcome";
import StartScreen from "./Start"; // Create this component
import HomeChatScreen from "./Home";
import ProfileScreen from "./Profile";

const Stack = createNativeStackNavigator();
const convex = new ConvexReactClient(process.env.CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Home" component={HomeChatScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </ConvexProvider>
  );
}


