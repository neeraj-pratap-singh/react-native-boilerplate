import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Share,
  Text,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import WebView from 'react-native-webview';
// import HTML from 'react-native-render-html';

interface NewsDetailProps {
  route: {
    params: {
      url: string;
      content: string;
    };
  };
}

const NewsDetail: React.FC<NewsDetailProps> = ({route}) => {
  const {url, content} = route.params;
  console.log('content', url, content);
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      const message = 'Check out this news:';
      await Share.share({
        message: url,
        title: message,
      });
    } catch (error) {
      console.error('Error while sharing:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>News Detail</Text>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share-social-sharp" size={24} color="#808080" />
        </TouchableOpacity>
      </View>

      {/* WebView */}
      <WebView source={{uri: url}} />

      {/* HTML Content */}
      {/* <HTML source={{html: content}} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default NewsDetail;
