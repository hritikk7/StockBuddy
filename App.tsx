import React, {useRef, useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, View, Dimensions, Button, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreens';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AnimatedComponent from './src/Components/AnimatedComponent';
import BottomSheet from '@gorhom/bottom-sheet';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/routing/Navigation';
import store from './src/redux/store/store'
import { Provider } from 'react-redux';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const DEVICE_WIDTH = Dimensions.get('window').width;

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const handleOnExpand = () => {
    setIsVisible(true);
    console.log('asdfasdf');
  };
  return (
    ////login screen
    // <View style={styles.container}>
    //   <LoginScreen/>
    // </View>
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>

      <Navigation />
      </Provider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'pink',
  },
  cardContainer: {
    flex: 1,
    height: 87,
    width: 330,
    backgroundColor: 'red',
  },
  imageView: {
    backgroundColor: 'blue',
    height: 75,
    width: 75,
  },
  textImage: {
    fontSize: 20,
    color: 'black',
  },
  stockName: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  stockFullName: {
    fontSize: 16,
    color: '#EBEBEB',
  },
});
export default App;
