/**
 * This is a Navigation file which is wired already with Bottom Tab Navigation.
 * If you don't like it, feel free to replace with your own setup.
 * Uncomment commented lines from return() of RootNavigation to wire Login flow
 */
import React from 'react';
import {ColorValue} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Hook for theme change (Light/Dark Mode)
import {useTheme} from '../theme/useTheme';
// Get Value from Keyring (Encrypted token)

// Screens
// import Login from '../screens/auth/Login';
import Videos from '../screens/Videos';
import Search from '../screens/Search';
import Home from '../screens/Home';

// Icons for Bottom Tab Navigation
const homeIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="home-sharp" size={24} color={color} />
);
const videoIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="play-circle-outline" size={24} color={color} />
);
const searchIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="search-outline" size={24} color={color} />
);

// Root Navigation
// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  const {theme} = useTheme();

  return (
    <NavigationContainer>
      {/* {user.token ? ( */}
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.cardBg,
            borderTopColor: theme?.layoutBg,
          },
          tabBarInactiveTintColor: theme.color,
          tabBarActiveTintColor: theme.primary,
          headerShown: false,
          tabBarShowLabel: true,
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
          component={Videos}
          options={{
            tabBarIcon: videoIcon,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            // headerShown: false,
            tabBarIcon: searchIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
