import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

// import {useDispatch} from 'react-redux';

import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';

const Home = () => {
  const {theme} = useTheme();
  //   const dispatch = useDispatch();

  return (
    <Layout>
      <ScrollView
        style={[styles.contentContainer, {backgroundColor: theme.layoutBg}]}>
        {/* code for home screen */}
      </ScrollView>
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  header: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },
  btnHamburger: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 10,
  },
});
