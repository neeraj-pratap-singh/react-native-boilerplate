import React, {useState} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import axios from 'axios';

// Import {useDispatch} from 'react-redux'; if needed

import {useTheme} from '../theme/useTheme';
import Layout from '../components/Layout';
import SearchComponent from '../components/SearchComponent';
import NewsItem from '../components/NewsItem';

const Search = () => {
  const {theme} = useTheme();
  //   const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [newsData, setNewsData] = useState([]);

  const handleSearch = (query: string) => {
    setLoading(true);
    // Implement your search logic here based on the user input (query)
    console.log('Search query:', query);

    // Call the API with the user-entered search query
    fetchApiResults(query);
  };

  const fetchApiResults = async (query: string) => {
    try {
      const response = await axios.get(
        `https://bansalnews.com/wp-json/wl/v1/search/${query}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = response.data;
      console.log('API Results:', data);
      // Filter out items with null data
      const filteredData = data.filter((item: null) => item !== null);

      setLoading(false); // Turn off the loader after fetching data
      setNewsData(filteredData); // Save the API results in state
    } catch (error) {
      console.log('Error fetching data: ', error);
      setLoading(false); // Turn off the loader in case of an error as well
    }
  };

  return (
    <Layout>
      <ScrollView
        style={[styles.contentContainer, {backgroundColor: theme.layoutBg}]}>
        <SearchComponent onSearch={handleSearch} />
        {loading && <ActivityIndicator size="large" color="#000" />}
        {newsData.map(item => (
          <NewsItem
            key={item.id}
            title={item.title}
            featured_image={item.featured_image}
            content={item.content}
            timestamp={item.publish_date}
            url={item.url}
          />
        ))}
      </ScrollView>
    </Layout>
  );
};

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

export default Search;
