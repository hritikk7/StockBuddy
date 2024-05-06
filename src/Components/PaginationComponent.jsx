import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import StockCard from './StockCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PaginationComponent = ({items, pageLimit, onPress}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageData, setPageData] = useState([]);

  useEffect(() => {
    const totalPages = Math.ceil(items.length / pageLimit);
    setTotalPages(totalPages);
    setPageData(items.slice(0, pageLimit));
  }, [items, pageLimit]);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    setPageData(
      items.slice((pageNumber - 1) * pageLimit, pageNumber * pageLimit),
    );
  };

  const renderItem = ({item}) => {
   

    return <StockCard onPress={onPress} item={item} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={currentPage}
        data={pageData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? styles.disabledIcon : null}>
          <AntDesign
            name="caretleft"
            size={20}
            color={currentPage === 1 ? '#D9D9D9' : 'black'}
          />
        </TouchableOpacity>

        <Text style={styles.pages}>
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          onPress={() => handlePageChange(currentPage + 1)}
          style={currentPage === totalPages ? styles.disabledIcon : null}
          color={currentPage === 1 ? 'grey' : 'black'}
          disabled={currentPage === totalPages}>
          <AntDesign
            name="caretright"
            size={20}
            color={currentPage === totalPages ? '#D9D9D9' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagination: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    minHeight : 50,
    paddingBottom : 10,
  },
  pages: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    paddingLeft: 50,
    paddingRight: 50,
  },
  disabledIcon: {
    color: 'grey',
  },
});

export default PaginationComponent;
