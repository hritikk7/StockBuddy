import React from 'react';
import {FlatList, StyleSheet, Text, View, Image, Alert} from 'react-native';
import StockCard from './StockCard';
import {
  TouchableOpacity,
  PanGestureHandler,
  Swipeable,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {removeOrder} from '../redux/store/orderSlice';
const btnHeight = 62;
const btnWidth = 277;
const btnPadding = 8;
const swipableDimensions = btnHeight - 2 * btnPadding;
const horizontalSwipeRange = btnWidth - 2 * btnPadding - swipableDimensions;

function OpenToOrder() {
  const DUMMY_DATA = {
    change: 13.41,
    change_percent: 18.7317,
    country_code: 'US',
    currency: 'USD',
    exchange: 'NASDAQ',
    exchange_close: '2024-04-26 16:00:00',
    exchange_open: '2024-04-26 09:30:00',
    google_mid: '/g/11ldq21ywz',
    last_update_utc: '2024-04-27 00:30:00',
    name: 'Astera Labs Inc',
    pre_or_post_market: 83.21,
    pre_or_post_market_change: -1.79,
    pre_or_post_market_change_percent: -2.1059,
    previous_close: 71.59,
    price: 85,
    symbol: 'ALAB:NASDAQ',
    timezone: 'America/New_York',
    type: 'stock',
    utc_offset_sec: -14400,
  };

  const dispatch = useDispatch();
  const selectedStock = useSelector(state => state.stocks.selectedStock);
  const orderItems = useSelector(state => state.order.orderItems);


  const X = useSharedValue(0);

  const handleSwipeEnd = () => {
    if (X.value >= horizontalSwipeRange) {
      Alert.alert(
        'Success',
        'Your order has been confirmed!',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    }
  };

  const interpolateXInput = [0, horizontalSwipeRange];
  const animatedGestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      X.value = e.translationX;
    },
    onEnd: e => {
      X.value = X.value > horizontalSwipeRange / 2 ? horizontalSwipeRange : 0;
      runOnJS(handleSwipeEnd)();
    },
  });

  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        transform: [{translateX: X.value}],
      };
    }),
    swipeButton: useAnimatedStyle(() => {
      return {
        backgroundColor: X.value >= horizontalSwipeRange ? 'green' : '#FFF5D1',
      };
    }),
    swipeButtonText: useAnimatedStyle(() => {
      return {
        color: X.value >= horizontalSwipeRange ? 'white' : 'black',
      };
    }),
  };
  const handleRemoveItem = item => {
    const {symbol} = item.item;
    dispatch(removeOrder(symbol));
  };

  const renderItem = item => {
    ///to trim the extra not required parts
    console.log(item);
    const symbolParts = item.item.symbol.split(':');
    const stockSymbolName = symbolParts[0];
    const priceChangeRounded = parseFloat(item.item.change_percent).toFixed(2);

    return (
      <View>
        <View style={styles.stockItem}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stock-market-concept_23-2149179727.jpg?t=st=1714257879~exp=1714261479~hmac=695493c7e09465fffdab8921a458ace14e43b0353401a1dc255e1947c1f7c129&w=1060',
              }}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.stockName}>{stockSymbolName}</Text>
            <Text style={styles.stockFullName}>{item.item.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${item.item.price}</Text>
              <Image
                style={styles.stockTicker}
                source={require('../assets/icons/upTrendIcon.png')}
              />
              <Text style={styles.priceChange}>{priceChangeRounded}%</Text>
            </View>
          </View>
          <View style={styles.trashBtn}>
            <TouchableOpacity onPress={() => handleRemoveItem(item)}>
              <Feather name="trash-2" size={30} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.openOrders}> Open Orders</Text>
      {orderItems.length > 0 ? (
        <View style={styles.orderContainer}>
          <FlatList
            data={orderItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View style={styles.noOrderContainer}>
          <Text style={styles.noOrderText}>No Orders</Text>
        </View>
      )}

      <View style={styles.buttonWrapper}>
        <View style={styles.buttonWrapper}>
          <PanGestureHandler onGestureEvent={animatedGestureHandler}>
            <Animated.View
              style={[styles.swipeButton, AnimatedStyles.swipeButton]}>
              <Animated.View
                style={[styles.swipeCircle, AnimatedStyles.swipeable]}>
                <Text style={[styles.swipeCircleText]}> {`>`} </Text>
              </Animated.View>
              <Animated.Text
                style={[styles.swipeText, AnimatedStyles.swipeButtonText]}>
                {X.value >= horizontalSwipeRange ? 'Confirmed' : 'Swipe to buy'}
              </Animated.Text>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  openOrders: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 50,
    marginLeft: 15,
    marginBottom: 25,
    color: '#090909',
  },
  orderContainer: {
    flex: 4,
  },
  stockTicker: {
    height: 15,
    width: 18,
    marginLeft: 5,
  },
  dummyText: {
    fontSize: 28,
    color: 'black',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeButton: {
    width: btnWidth,
    height: btnHeight,
    borderRadius: btnHeight,
    backgroundColor: '#FFF5D1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: btnPadding,
    justifyContent: 'center',
  },
  swipeCircle: {
    position: 'absolute',
    height: swipableDimensions,
    width: swipableDimensions,
    borderRadius: swipableDimensions,
    zIndex: 3,
    left: btnPadding,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeCircleText: {
    color: 'black',
    fontSize: 24,
  },

  swipeText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 600,
    alignSelf: 'center',
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imageContainer: {
    width: '20%',
    aspectRatio: 1,
    marginRight: 15,
    marginLeft: 12,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
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
  },
  priceChange: {
    fontSize: 16,
    color: '#34C759',
    marginLeft: 10,
    lineHeight: 20,
    fontWeight: '600',
  },
  trashBtn: {
    marginRight: 15,
  },
  noOrderContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrderText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default OpenToOrder;
