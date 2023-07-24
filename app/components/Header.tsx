import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  // Remove the prop since we are defining the function within the component
}

const Header: React.FC<HeaderProps> = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRightImagePress = () => {
    // Handle the press event for the right-side image here
    console.log('Right image pressed');
  };

  const handleMoreOptions = () => {
    toggleModal();
  };

  const handleOptionSelection = (option: string) => {
    // Handle the selected option here based on option value
    console.log('Selected option:', option);
    toggleModal();
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

  return (
    <View style={styles.container}>
      <>
        <TouchableOpacity onPress={handleRightImagePress}>
          <Image
            source={require('../assets/images/app_logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={handleMoreOptions}>
            <Image
              source={require('../assets/images/app_logo.png')}
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
          <TouchableOpacity onPress={() => handleOptionSelection('Rate App')}>
            <View style={styles.optionContainer}>
              <Icon name="star" size={24} color="black" />
              <Text style={styles.optionText}>Rate App</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionSelection('Notifications')}>
            <View style={styles.optionContainer}>
              <Icon name="notifications" size={24} color="black" />
              <Text style={styles.optionText}>Notifications</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 100,
    height: 30,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightImage: {
    width: 30,
    height: 30,
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
});

export default Header;
