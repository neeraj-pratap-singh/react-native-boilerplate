import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Share,
} from 'react-native';
import {useTheme} from '../theme/useTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface NewsItemProps {
  title: string;
  featured_image?: object;
  content: string;
  timestamp: string;
  url: string;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  featured_image,
  content,
  timestamp,
  url,
}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const getTimeDifferenceString = () => {
    const currentTime = new Date().getTime();
    const postTime = new Date(timestamp).getTime();
    const timeDifference = currentTime - postTime;
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (days < 7) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (weeks < 4) {
      return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    } else if (months < 12) {
      return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
      return `${years} year${years === 1 ? '' : 's'} ago`;
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: title,
        message: url,
      });
    } catch (error) {
      console.error('Error while sharing:', error.message);
    }
  };

  const extractFirst200Chars = (text: string) => {
    // Remove any HTML tags from the content
    const contentWithoutTags = text.replace(/<[^>]+>/g, '');
    return contentWithoutTags.substring(0, 200);
  };

  const newsDetailScreen = () => {
    console.log('move to news detail screen');
    navigation.navigate('NewsDetail', {url, content});
  };

  const renderThumbnail = () => {
    if (featured_image?.thumbnail) {
      return (
        <Image
          source={{uri: featured_image?.thumbnail}}
          style={styles.thumbnailImage}
        />
      );
    } else {
      return (
        <Image
          source={require('../assets/images/app_logo.png')}
          style={styles.thumbnailImage}
        />
      );
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.cardBg}]}>
      <TouchableOpacity onPress={newsDetailScreen}>
        <View style={styles.rowContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={3}>
              {title}
            </Text>
          </View>
          <View style={styles.thumbnailContainer}>{renderThumbnail()}</View>
        </View>
        <Text style={styles.content} numberOfLines={3}>
          {extractFirst200Chars(content)}
        </Text>
      </TouchableOpacity>
      <View style={styles.timestampAndShareContainer}>
        <Text style={styles.timestamp}>{getTimeDifferenceString()}</Text>
        <TouchableOpacity onPress={handleShare}>
          <View style={styles.shareButtonContainer}>
            <Icon name="share-social-sharp" size={20} color="#808080" />
            <Text style={styles.shareButtonText}>Share News</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  thumbnailContainer: {
    marginLeft: 8,
    width: '40%',
    height: 100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  thumbnailImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    fontSize: 14,
    color: '#555',
  },
  timestampAndShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#000',
  },
  shareButtonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: 'row',
  },
  shareButtonText: {
    marginLeft: 5,
    color: '#808080',
    fontWeight: 'bold',
  },
});

export default NewsItem;
