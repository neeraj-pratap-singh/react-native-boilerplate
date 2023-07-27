import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import YouTube from '@dooboo/react-native-youtube-iframe';

const VideoScreen: React.FC = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            key: 'AIzaSyAetwy-pVtiQicM51c8EwVmIQMSOatmNxk',
            channelId: 'UCL_3_9PhDyZXu1oexm8gtFQ',
            part: 'snippet,id',
            order: 'date',
            maxResults: 5,
          },
        },
      );

      if (response.data?.items?.length) {
        const videoItems = response.data.items;
        const firstVideoId = videoItems[0]?.id?.videoId;
        console.log('videoItems', videoItems[0], firstVideoId);
        setVideos(videoItems);
        setSelectedVideo(firstVideoId);
      }
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  const renderVideoItem = ({item}: {item: any}) => {
    const videoId = item.id?.videoId;

    return (
      <TouchableOpacity
        onPress={() => setSelectedVideo(videoId)}
        style={styles.videoItemContainer}>
        <Image
          source={{uri: item.snippet?.thumbnails?.default?.url}}
          style={styles.thumbnailImage}
        />
        <Text numberOfLines={4} ellipsizeMode="tail" style={styles.videoTitle}>
          {item.snippet?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.youtubePlayer}>
        <YouTube videoId={selectedVideo} height={'100%'} play />
      </View>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id?.videoId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  youtubePlayer: {
    alignSelf: 'stretch',
    height: 300,
  },
  videoItemContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginBottom: 4,
  },
  thumbnailImage: {
    width: 120,
    height: 90,
    marginRight: 8,
  },
  videoTitle: {
    fontSize: 16,
    color: '#000',
    width: '60%',
  },
});

export default VideoScreen;
