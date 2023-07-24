import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';

// import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';

import Shorts from '../../app/components/Shorts';

export default function Videos() {
  // const {theme} = useTheme();
  // const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState([]);

  const fetchPlaylistData = async () => {
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAetwy-pVtiQicM51c8EwVmIQMSOatmNxk&channelId=UCL_3_9PhDyZXu1oexm8gtFQ&part=snippet,id&order=date&maxResults=3',
    );
    const json = await response.json();
    const tempItems = json.items.map(
      (item: {id: {videoId: any}}, index: any) => {
        return {
          id: index,
          videoId: item.id.videoId,
        };
      },
    );
    setItems(tempItems);
  };

  useEffect(() => {
    fetchPlaylistData();
  }, []);

  // const userStatus = useSelector(
  //   (state: RootState) => state.dummyNetwork.status,
  // );

  // const user = useSelector((state: RootState) => state.dummyNetwork.data);
  // const newUser = useSelector((state: RootState) => state.dummyNetwork.newUser);

  // const fetchData = () => {
  //   dispatch(fetchUser());
  // };

  // const postData = () => {
  //   dispatch(createUser(dummyData));
  // };

  return (
    <Layout>
      <View style={styles.view}>
        <Shorts items={items} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
