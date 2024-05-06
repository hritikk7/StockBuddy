import React, {useRef, useState, useEffect} from 'react';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {login} from '../redux/store/authSlice';
import {
  StyleSheet,
  View,
  Dimensions,
  Button,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';

function LoginScreen({}): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // Get isLoggedIn from Redux store
  const handleLogin = () => {
    // Simulate the login process
    console.log(email, password);
    if (email === 'Admin@asdf.com' && password === 'Admin') {
      // Dispatch the login action
      dispatch(login());
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Please enter a valid Email and Password',
      );
    }
  };

  useEffect(() => {
    // Navigate to the Home screen when isLoggedIn changes to true
    if (isLoggedIn) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Stocks'}],
        }),
      );
      console.log('isLoggedIn true');
    }
  }, [isLoggedIn, navigation]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.headerImage}
              source={require('../assets/icons/SplashIcon.png')}
            />
          </View>
          <Text style={styles.title}>login in to the 1% Club</Text>
          <Text style={styles.subTitle}>
            Helping people achieve Financial Independence
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Enter Email</Text>
            <TextInput
              style={styles.inputbox}
              placeholder="John@example.com"
              keyboardType="email-address"
              placeholderTextColor="#6b7280"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Enter Password</Text>
            <TextInput
             secureTextEntry={true}
          
              style={styles.inputbox}
              placeholder="**********"
              keyboardType="email-address"
              placeholderTextColor="#6b7280"
              onChangeText={setPassword}
              value={password}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Login in</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.formLink}>Forgot password?</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 55,
  },
  imageContainer: {
    height: 80,
    width: 80,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomEndRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    marginBottom: 30,
  },
  headerImage: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    color: '#c4c4c4',
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {},
  inputLabel: {
    fontSize: 17,
    color: '#222',
    fontWeight: '600',
  },
  inputbox: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 8,
    fontWeight: '500',
    color: '#222',
    height: 44,
    marginBottom: 12,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
});

export default LoginScreen;
