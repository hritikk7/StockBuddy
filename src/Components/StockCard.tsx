import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
const StockCard = ({
  item,
  onPress,
}: {
  item: any;
  onPress: (item: any) => void;
}) => {
  const [stockData, setStockData] = useState<any>([]);
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const renderItemContent = () => {
    return (
      <View style={styles.expandedContent}>
        <Text style={styles.title}>Lorem ipsum dolor</Text>
        <View style={styles.textContainer}>
          <View style={styles.loremText}>
            <Text>Lorem ipsum dolor sit amet, consectetur</Text>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    // Set the initial state of stockData with the item prop
    setStockData([item]);
  }, []);

  // console.log('STOCK data state', stockData);

  const renderItem = ({item}) => {
    // const {name, symbol, change_percent, price} = item
    const symbolParts = item.symbol.split(':');
    const stockSymbol = symbolParts[0];
    const priceChangeRounded = parseFloat(item.change_percent).toFixed(2);
    console.log('STOCK CARD items name', item.symbol);
    return (
      <TouchableOpacity
        // onPress={() => {
        //   navigation.navigate('Stock_Details');
        // }}
        onPress={() => onPress(item)}
        onLongPress={toggleExpansion}>
        <View style={styles.itemContainer}>
          <View style={styles.stockItem}>
            <View style={styles.stockItemContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stock-market-concept_23-2149179727.jpg?t=st=1714257879~exp=1714261479~hmac=695493c7e09465fffdab8921a458ace14e43b0353401a1dc255e1947c1f7c129&w=1060',
                  }}
                  style={styles.image}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.stockName}>{stockSymbol}</Text>
                <Text style={styles.stockFullName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${item.price}</Text>
                  <Image
                    style={styles.stockTicker}
                    source={require('../assets/icons/upTrendIcon.png')}
                  />
                  <Text style={styles.priceChange}>{priceChangeRounded}%</Text>
                </View>
              </View>
            </View>
          </View>

          <Text>{expanded && renderItemContent()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={stockData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    //   marginTop: 50,
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  imageContainer: {
    width: '20%',
    aspectRatio: 1,
    marginRight: 15,
    marginLeft: 12,
    // backgroundColor: 'grey',
  },
  stockTicker: {
    height: 15,
    width: 18,
    marginLeft: 5,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  stockItemContainer: {
    flexDirection: 'row',
  },
  stockName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  stockFullName: {
    fontSize: 16,
    color: '#999999',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black',
    lineHeight: 30,
  },
  priceChange: {
    fontSize: 16,
    color: '#34C759',
    marginLeft: 10,
    lineHeight: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#090909',
    marginBottom: 12,
  },

  textContainer: {
    flex: 1,

    maxWidth: '70%', // Set a maximum width for the text container
    flexWrap: 'wrap', // Allow text to wrap within its container
  },

  loremText: {
    color: '#090909',
    fontWeight: '600',
    fontSize: 16,
  },
  expandedContent: {
    // paddingHorizontal: 30,
    flex: 1,
    padding: 15,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 12,
    // paddingBottom: 8,
  },
  // expandedText: {
  //   paddingHorizontal: 20,
  // },
});

export default StockCard;
