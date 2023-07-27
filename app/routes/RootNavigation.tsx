/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {ColorValue} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../theme/useTheme';
import Home from '../screens/Home';
// import Videos from '../screens/Videos';
import Search from '../screens/Search';
import ContactUs from '../screens/ContactUs'; // Add this import
import AboutUs from '../screens/AboutUs'; // Add this import
import Header from '../components/Header'; // Add this import
import VideoScreen from '../screens/VideoScreen';

const homeIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="home-sharp" size={24} color={color} />
);
const videoIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="play-circle-outline" size={24} color={color} />
);
const searchIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="search-outline" size={24} color={color} />
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.cardBg,
          borderTopColor: theme?.layoutBg,
        },
        tabBarInactiveTintColor: theme.color,
        tabBarActiveTintColor: theme.primary,
        // headerShown: false,
        tabBarShowLabel: true,
        header: () => <Header />,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: homeIcon,
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarIcon: videoIcon,
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: searchIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={RootNavigation}
        options={{
          headerShown: false,
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
