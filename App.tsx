import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {STORYBOOK_MODE} from '@env';
import {store} from './app/store/store';
import {ThemeProvider} from './app/theme/useTheme';
import {NoInternetToast} from './app/components/NoInternet';

// Navigation
import {AppNavigator} from './app/routes/RootNavigation';

import StorybookUIRoot from './.storybook';
import {NavigationContainer} from '@react-navigation/native';

let Root = function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
          <NoInternetToast />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

// Render StoryBook if the ENV variable set to 'TRUE', type is <string> not <boolean>
if (STORYBOOK_MODE === 'TRUE') {
  Root = StorybookUIRoot;
}

export default Root;
