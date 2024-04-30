import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Image, FlatList} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import StockCard from './StockCard';
import PaginationComponent from './PaginationComponent';
import {SearchBar} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setSelectedStock} from '../redux/store/stockSlice';
import {FETCH_STOCKS, API_TOKEN} from '@env';
const MainScreen = () => {
  const bottomSheetRef = React.useRef(null);
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedData, setSearchedData] = useState([]);
  const [showPagination, setShowPagination] = useState(true);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleStockPress = stock => {
    dispatch(setSelectedStock(stock));
    navigation.navigate('Stock_Details');
  };

  useEffect(() => {
    // Fetch initial data
    fetchData();
  }, []);

  const handleSheetChange = index => {
    setBottomSheetIndex(index);
  };

  const fetchData = async () => {
    // Fetch data from API
    setLoading(true);
    const url = FETCH_STOCKS;
    // 'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=GAINERS&country=us&language=en';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_TOKEN,
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      const slicedData = json.data.trends.slice(0, 25);
      console.log('slicedData', slicedData);
      setResData(slicedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchStock = async stockName => {
    // Search for stock
    setLoading(true);
    const url = `https://real-time-finance-data.p.rapidapi.com/search?query=${stockName}%20&language=en`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_TOKEN,
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      const slicedSearchedData = json?.data?.stock?.slice(0, 1);
      setSearchedData(slicedSearchedData);
      // setResData(slicedSearchedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSearch = searchText => {
    setSearchText(searchText);
    if (searchText.trim() !== '') {
      setShowPagination(false); // Hide pagination when searching
      searchStock(searchText);
    } else {
      setShowPagination(true); // Show pagination when search input is empty
      fetchData(); // Fetch initial data when search input is empty
    }
  };

  console.log('bottomSheetIndex', bottomSheetIndex);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['70%', '100%']}
        index={0}
        onChange={handleSheetChange}>
        <View style={{display: bottomSheetIndex === 1 ? 'flex' : 'none'}}>
          <SearchBar
            placeholder="Search for stocks."
            lightTheme
            round
            onChangeText={updateSearch}
            value={searchText}
            autoCorrect={false}
            containerStyle={{
              backgroundColor: 'white',
              borderColor: 'white',
              padding: 10,
            }}
            inputContainerStyle={{backgroundColor: '#EBEBEB'}}
            inputStyle={{color: 'black'}}
          />
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : showPagination ? (
          <PaginationComponent
            items={resData}
            onPress={handleStockPress}
            pageLimit={5}
          />
        ) : (
          <FlatList
            // data={resData}
            data={searchedData}
            renderItem={({item}) => (
              <StockCard onPress={handleStockPress} item={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  loadingText: {
    color: 'black',
    fontSize: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;
