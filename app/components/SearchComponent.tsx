import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash'; // Import lodash library

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Debounce the search function to reduce unnecessary API calls
  const debouncedSearch = _.debounce((query: string) => {
    onSearch(query);
  }, 300); // Set the debounce delay here (300ms in this case)

  const handleSearch = () => {
    debouncedSearch(searchQuery); // Call the debounced function instead of onSearch directly
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your keyword"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
        }}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Icon name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  searchButton: {
    padding: 8,
    borderRadius: 4,
    // backgroundColor: '#007AFF',
  },
});

export default SearchComponent;
