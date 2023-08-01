/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import axios from 'axios';

import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';

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
      handleMainCategoryPress(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    console.log('fetch post response', selectedCategory, page);
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
        console.log('fetch post response', response.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const renderMainCategory = ({item}) => {
    const isSelected = item.category_id === selectedCategory?.category_id;
    return (
      <TouchableOpacity
        style={[styles.tab, isSelected && styles.selectedTab]}
        onPress={() => handleMainCategoryPress(item)}>
        <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
          {item.menu}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleMainCategoryPress = item => {
    if (item.sub_menu_status && item.sub_menu.length > 0) {
      setSelectedCategory(item);
      handleSubMenuPress(item.sub_menu[0]); // Select the first submenu by default
    } else {
      setSelectedCategory(item);
      handleSubMenuPress(item); // Select the menu by default
      console.log('Selected main category:', item.menu);
    }
  };

  const renderSubMenu = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.subTab}
        onPress={() => handleSubMenuPress(item)}>
        <Text style={styles.subTabText}>{item.menu}</Text>
      </TouchableOpacity>
    );
  };

  const handleSubMenuPress = item => {
    console.log('Selected submenu:', item.menu);
    setSelectedCategory(item);
  };

  const renderPost = ({index}) => {
    return (
      <View style={styles.post}>
        <Text style={styles.postText}>Post {index + 1}</Text>
      </View>
    );
  };

  return (
    <Layout>
      <View
        style={[styles.contentContainer, {backgroundColor: theme.layoutBg}]}>
        <View style={styles.mainCategoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderMainCategory}
            keyExtractor={item => item.category_id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.subCategoriesContainer}>
          <FlatList
            data={selectedCategory?.sub_menu || []}
            renderItem={renderSubMenu}
            keyExtractor={item => item.category_id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => setPage(page + 1)}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  mainCategoriesContainer: {
    marginTop: 16,
    marginBottom: 8,
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
  subCategoriesContainer: {
    marginBottom: 16,
  },
  subTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  subTabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  postsContainer: {
    marginBottom: 16,
  },
  post: {
    height: 150,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  postText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Home;
