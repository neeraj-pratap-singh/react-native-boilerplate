import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
  Dimensions,
  Linking,
  Alert,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from '@dooboo/react-native-youtube-iframe';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
interface HeaderProps {
  // Remove the prop since we are defining the function within the component
}

interface LiveVideoData {
  liveVideoId: string | null;
  channelId: string;
}

const Header: React.FC<HeaderProps> = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLiveModalVisible, setLiveModalVisible] = useState(false);
  const navigation = useNavigation();
  const [liveVideoData, setLiveVideoData] = useState<LiveVideoData>({
    liveVideoId: null,
    channelId: 'UCL_3_9PhDyZXu1oexm8gtFQ', // Replace this with your YouTube channel ID
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleLiveModal = () => {
    setLiveModalVisible(!isLiveModalVisible);
  };

  const fetchLiveVideoId = async () => {
    try {
      setLiveModalVisible(true);
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            key: 'AIzaSyAetwy-pVtiQicM51c8EwVmIQMSOatmNxk', // Replace this with your YouTube Data API key
            channelId: liveVideoData.channelId,
            part: 'snippet',
            eventType: 'live',
            type: 'video',
            maxResults: 1,
          },
        },
      );

      if (response.data?.items?.length) {
        const liveVideoId = response.data.items[0]?.id?.videoId;
        console.log('liveVideoId', liveVideoId);
        setLiveVideoData(prevData => ({...prevData, liveVideoId}));
      } else {
        setLiveVideoData(prevData => ({...prevData, liveVideoId: null}));
      }
    } catch (error) {
      console.log('Error fetching live video ID: ', error);
    }
  };

  const handleRightImagePress = () => {
    // Handle the press event for the right-side image here
    // toggleLiveModal();
    fetchLiveVideoId();
    console.log('Right image pressed');
  };

  const handleMoreOptions = () => {
    toggleModal();
  };

  const handleOptionSelection = (option: string) => {
    // Handle the selected option here based on option value
    toggleModal();
    if (option === 'Know About Us') {
      navigation.navigate('AboutUs');
    } else if (option === 'Contact Us') {
      navigation.navigate('ContactUs');
    }
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome app: www.bansalnewsapp.com',
      });
    } catch (error) {
      console.error('Error sharing app:', error.message);
    }
  };

  const openAppRating = () => {
    const APP_PACKAGE_NAME = 'com.app.bansalnews'; // Replace with your app's package name on the Play Store
    const PLAY_STORE_URL = `market://details?id=${APP_PACKAGE_NAME}`;

    Linking.canOpenURL(PLAY_STORE_URL)
      .then(supported => {
        if (supported) {
          return Linking.openURL(PLAY_STORE_URL);
        } else {
          // If the Play Store app is not installed, open the app page in the browser
          const PLAY_STORE_WEB_URL = `https://play.google.com/store/apps/details?id=${APP_PACKAGE_NAME}`;
          return Linking.openURL(PLAY_STORE_WEB_URL);
        }
      })
      .catch(() => {
        Alert.alert('Error', 'An error occurred while opening the Play Store.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/app_logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={handleRightImagePress}>
            <Image
              source={require('../assets/images/live.png')}
              style={styles.rightImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMoreOptions}
            style={styles.moreOptions}>
            <Icon name="ellipsis-vertical" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        backdropOpacity={0.5}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => handleOptionSelection('Know About Us')}>
            <View style={styles.optionContainer}>
              <Icon name="information-circle" size={24} color="black" />
              <Text style={styles.optionText}>Know About Us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelection('Contact Us')}>
            <View style={styles.optionContainer}>
              <Icon name="mail" size={24} color="black" />
              <Text style={styles.optionText}>Contact Us</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShareApp}>
            <View style={styles.optionContainer}>
              <Icon name="share" size={24} color="black" />
              <Text style={styles.optionText}>Share App</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openAppRating()}>
            <View style={styles.optionContainer}>
              <Icon name="star" size={24} color="black" />
              <Text style={styles.optionText}>Rate App</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => handleOptionSelection('Notifications')}>
            <View style={styles.optionContainer}>
              <Icon name="notifications" size={24} color="black" />
              <Text style={styles.optionText}>Notifications</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </Modal>
      <Modal
        isVisible={isLiveModalVisible}
        onBackdropPress={toggleLiveModal}
        style={styles.modal}
        backdropOpacity={0.5}>
        <View style={styles.modalLiveContainer}>
          <YoutubePlayer
            height={Dimensions.get('window').height}
            play={true}
            videoId={liveVideoData.liveVideoId} // Replace with the actual YouTube video ID you want to play
            // onChangeState={event => console.log('Video state:', event.state)}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              // Close the fullscreen video on close button press
              toggleLiveModal();
            }}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  logo: {
    width: 70,
    height: 40,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  moreOptions: {
    padding: 8,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: 200,
  },
  modalLiveContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '100%',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 2,
  },
});

export default Header;
