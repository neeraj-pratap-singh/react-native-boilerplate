import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList, Text} from 'react-native';
import axios from 'axios';

import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';
import NewsItem from '../components/NewsItem'; // Import NewsItem component

const Home = () => {
  const {theme} = useTheme();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      handleCategoryPress(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      fetchPostsForCategory(selectedCategory.category_id, page);
    }
  }, [selectedCategory, page]);

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get(
        'https://bansalnews.com/wp-json/wl/v1/custom_menu',
      );
      if (response?.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchPostsForCategory = async (categoryId, pageNumber) => {
    try {
      const response = await axios.get(
        `https://bansalnews.com/wp-json/wl/v1/category_posts/${categoryId}/${pageNumber}`,
      );
      if (response?.data) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCategoryPress = item => {
    setSelectedCategory(item);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.tab,
          item.category_id === selectedCategory?.category_id &&
            styles.selectedTab,
        ]}
        onPress={() => handleCategoryPress(item)}>
        <Text
          style={[
            styles.tabText,
            item.category_id === selectedCategory?.category_id &&
              styles.selectedTabText,
          ]}>
          {item.menu}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPost = ({item}) => {
    return (
      <NewsItem
        key={item.id}
        title={item.title}
        featured_image={item.featured_image}
        content={item.content}
        timestamp={item.publish_date}
        url={item.url}
      />
    );
  };

  return (
    <Layout>
      <View
        style={[styles.contentContainer, {backgroundColor: theme.layoutBg}]}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.category_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id.toString()}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.5}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  selectedTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedTabText: {
    color: '#FFF',
  },
});

export default Home;
