
import React from "react";
import { StyleSheet } from "react-native";
// import 'react-native-gesture-handler';
import { NavigationContainer, } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from './RootNavigation';
import login from "./screens/login";
import register from "./screens/register";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Drawer from './screens/Drawer';
import A from "./screens/Dashboard";

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 30,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: 'lightblue',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3'
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="blue"/> */}
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='login'>

          <Stack.Screen
            name="login"
            component={login}
            options={{ headerShown: true }}
          />

          <Stack.Screen
            name="register"
            component={register}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="drawer"
            component={Drawer}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Dashboard"
            component={A}
            options={{ headerShown: true }}
          />
          {/* <Stack.Screen
            name="ManageUser"
            component={HomeScreen}
            options={{ headerShown: true }}
          /> */}




        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    justifyContent: "center",
  },

});