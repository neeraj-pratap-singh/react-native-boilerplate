import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useTheme} from '../theme/useTheme';

import {LayoutPropsType} from '../types/components';
import {ThemeContextInterface} from '../theme/useTheme';

const Layout = ({children, style}: LayoutPropsType) => {
  const {theme}: Partial<ThemeContextInterface> = useTheme();
  return (
    <View style={styles.container}>
      <StatusBar
        animated
        backgroundColor={theme.cardBg}
        barStyle={theme?.name === 'light' ? 'dark-content' : 'light-content'}
      />
      <View style={[styles.layout, {backgroundColor: theme?.layoutBg}, style]}>
        {children}
      </View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
