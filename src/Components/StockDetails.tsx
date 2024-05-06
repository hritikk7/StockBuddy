import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToOrder} from '../redux/store/orderSlice';

function StockDetails() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectedStock = useSelector(state => state.stocks.selectedStock);
  const stockName = selectedStock ? selectedStock.name : '';
  const stockSymbol = selectedStock ? selectedStock.symbol : '';
  const stockPrice = selectedStock ? selectedStock.price : '';
  const stockChangePercent = selectedStock ? selectedStock.change_percent : '';
  const symbolParts = stockSymbol.split(':');
  const stockSymbolName = symbolParts[0];
  const priceChangeRounded = parseFloat(stockChangePercent).toFixed(2);
  if (!selectedStock) {
    return <Text style={styles.stockName}>No stock selected</Text>;
  }
  function handleAddToOrder() {
    dispatch(addToOrder(selectedStock));
    navigation.navigate('Open_To_Order');
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stock-market-concept_23-2149179727.jpg?t=st=1714257879~exp=1714261479~hmac=695493c7e09465fffdab8921a458ace14e43b0353401a1dc255e1947c1f7c129&w=1060',
          }}
          style={styles.image}
        />
        <View style={styles.stockDetails}>
          <Text style={styles.stockName}>{stockSymbolName}</Text>
          <Text style={styles.stockFullName}>{stockName}</Text>
          <Text style={styles.price}>${stockPrice}</Text>
          <View style={styles.priceContainer}>
            <Image source={require('../assets/icons/upTrendIcon.png')} />
            <Text style={styles.priceChange}>{priceChangeRounded}%</Text>
          </View>
        </View>
      </View>
      <View style={styles.stockDetailWrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Lorem ipsum dolor</Text>
          <Text style={styles.textDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Lorem ipsum dolor</Text>
          <Text style={styles.textDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
      </View>
      <View style={styles.formAction}>
        <TouchableOpacity
          onPress={handleAddToOrder}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Add to order</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  stockName: {
    fontSize: 28,
    fontWeight: '600',
    color: 'black',
  },
  stockFullName: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '500',
  },
  imageContainer: {
    aspectRatio: 1,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 75,
  },
  image: {
    height: 75,
    width: 75,
    resizeMode: 'contain',
    marginRight: 15, 
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
    color: 'black',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceChange: {
    fontSize: 20,
    color: '#34C759',
    fontWeight: '600',
    marginLeft: 10,
  },
  stockDetails: {
    flex: 1, 
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#090909',
    marginBottom: 12,
  },
  stockDetailWrapper: {
    flex: 1,
    padding: 15, 
  },
  textContainer: {
    marginBottom: 20,
  },
  textDescription: {
    color: '#090909',
    fontWeight: '600',
    fontSize: 16,
  },
  formAction: {
    marginBottom: 16,
    alignItems: 'center', 
  },
  btn: {
    width: 340,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#ECD996',
  },
  btnText: {
    color: '#090909',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
});

export default StockDetails;
