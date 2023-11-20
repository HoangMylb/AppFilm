import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import validator from 'validator';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

const Login = (props) => {

  const { navigation } = props;
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [emailError, setEmailError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  // context
  const { login, getByUser,googleSignIn,signOut } = useContext(UserContext);
  
  const handleValidation = () => {
    if (validator.isEmail(userName)) {
      // Email hợp lệ
      return true;
    } else {
      // Email không hợp lệ
      return false;
    }
  };
  const clickNext = async () => {
    if (userName == "") {
      setEmailError('Vui lòng không để trống Email')
      setPassError('')
    } else if (passWord == "") {
      setEmailError('')
      setPassError('Vui lòng không để trống PassWord')
    }
    else {
      if (handleValidation()) {
        setEmailError('')
        setPassError('')
        const res = await login(userName, passWord);
        if (res.success) {
          const userData = res.khach;
         
          AsyncStorage.setItem('keepLogedIn', JSON.stringify(true));
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          AsyncStorage.setItem('keepLogedInGG', JSON.stringify(false));
          console.log(" res.khach: " + JSON.stringify(res.khach));
          navigation.dispatch(StackActions.replace('Home'));

          ToastAndroid.show("Đăng nhập thành công", 1);
        } else {
          ToastAndroid.show("Sai tài khoản hoặc mật khẩu", 1);
        }
      } else {
        setEmailError("Vui lòng nhập Email đúng định dạng")
        setPassError('')
      }
    }
  };
  const clickNextTo = () => {
    navigation.navigate('Register');
  };
  const nextForgot = () => {
    navigation.navigate('ForgotpassWord');
  };


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '453299861632-2rgp3trk74pnt4p52i7eba5bsjf8nv7v.apps.googleusercontent.com',

    });

    if (!firebase.apps.length) {
      firebase.initializeApp({
        // Các thông tin cấu hình Firebase của bạn
        apiKey: "AIzaSyDIGQ3ihKBMIRt8qXYGqaVgvdKu8GTnV5w",
        authDomain: "fir-cinemaapp-dcbcf.firebaseapp.com",
        databaseURL: "https://fir-cinemaapp-dcbcf-default-rtdb.firebaseio.com",
        projectId: "fir-cinemaapp-dcbcf",
        storageBucket: "fir-cinemaapp-dcbcf.appspot.com",
        messagingSenderId: "453299861632",
        appId: "1:453299861632:web:0ca28d878d4f75223b0e65",
        measurementId: "G-FYNH0FGHLP"
      });
    }
  }, [])
  const updateUser = (email, ten) => {
    navigation.dispatch(
        StackActions.replace('RegisterGG', {
          email: email,
          ten: ten,
        })
    );
};
  const SignIn = async () => {
    
    try {
      const userCredential = await googleSignIn();
      console.log(" userCredential: " + JSON.stringify(userCredential.user));
      const a = await getByUser(userCredential.user.email);
      if (a.success) {
          const userData = a.message;
          AsyncStorage.setItem('keepLogedIn', JSON.stringify(true));
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          AsyncStorage.setItem('keepLogedInGG', JSON.stringify(true));
          console.log(" res.khach: " + JSON.stringify(a.message));
          navigation.dispatch(StackActions.replace('Home'));
          ToastAndroid.show("Đăng nhập thành công", 1);
      } else {
          
        updateUser(userCredential.user.email,userCredential.user.displayName );
      }
  } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu cần
  }
}

const signOutGG = async () => {
    signOut();
}
  

  return (
    <View style={styles.Background}>
      <SafeAreaView style={styles.container}>
        {/* Chia màn hình thành một nữa */}
        {/* Một nữa là logoCV, Một nữa là login Form */}
        <View style={styles.logoCV}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Login%2FlogoLogin.png?alt=media&token=1afeaeee-bd13-4bbc-9765-39c42faf3a52&_gl=1*1ad23ct*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NzIwODExMy4yOS4xLjE2OTcyMDkzMzkuNDkuMC4w',
            }}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          {/* Login Form */}
          <View style={styles.loginForm}>
            <View style={styles.loginAccount}>
              {/* Input email*/}
              <View style={[styles.inputAccount, { borderColor: emailError ? 'red' : '#000000', borderWidth: 1 }]}>
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoEmail.png?alt=media&token=00111537-92bd-48de-8754-a1ac66871c3b&_gl=1*aj7qcl*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDc4NzUuNDcuMC4w',
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="black"
                  value={userName}
                  onChangeText={setUserName}
                />
              </View>
              {emailError ? (
                <Text style={{ marginTop: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}>{emailError}</Text>
              ) : (<Text style={{ marginTop: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
              )}
              {/* Input password*/}
              <View style={[styles.inputAccount, { borderColor: passError ? 'red' : '#000000', borderWidth: 1 }]}>
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoPassword.png?alt=media&token=3b71665d-b37b-49b8-9cfa-d98b52532b7f&_gl=1*1wwkmox*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDgzNjYuNDUuMC4w',
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  secureTextEntry={isPasswordHidden}
                  placeholderTextColor="black"
                  value={passWord}
                  onChangeText={setPassWord}
                />
                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '85%' }} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                  <Image
                    style={{ width: 22, height: 15, }}
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/icon%20_eye_.png?alt=media&token=2a97db14-015f-43dd-b6e8-87ad7b01c317&_gl=1*1ugamz5*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzcyMDU1OS41LjEuMTY5NzcyMDYwNC4xNS4wLjA.' }}

                  />
                </TouchableOpacity>
              </View>
              {passError ? (
                <Text style={{ marginTop: 0, color: 'red', fontSize: 11, alignSelf: 'center' }}>{passError}</Text>
              ) : (<Text style={{ marginTop: 0, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
              )}
              <TouchableOpacity onPress={nextForgot} style={styles.forgotPassword}>
                <Text style={{ color: '#E38025' }}>Quên mật khẩu</Text>
              </TouchableOpacity>
              {/* Button Login  */}
              <TouchableOpacity style={styles.btnAccount} onPress={clickNext}>
                <Text style={styles.btnTxt}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.loginSocial}>
              {/* chữ hoặc */}
              <Text style={styles.txtOr}>
                ---------------------------- Hoặc ----------------------------
              </Text>
              {/* 2 logo social */}
              <TouchableOpacity style={styles.imgSocial} onPress={SignIn}
              >
                <View style={styles.imgSocial2}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Google.png?alt=media&token=45c9a432-82fc-4321-bd6f-f787d36b3beb',
                    }}
                  />
                </View>

              </TouchableOpacity>
            </View>
            <View style={styles.bottomText}>
              <Text style={styles.txtQuestion}>Người dùng mới !</Text>
              <TouchableOpacity
                onPress={clickNextTo}
                //onPress={signOut}
                style={{

                  width: 95,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                  backgroundColor: '#E38025',
                  borderRadius: 5
                }}>
                <Text style={styles.txtRegister}> Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  // nền của component
  Background: {
    flex: 1,
    backgroundColor: '#18191A',
  },
  // Khung của component
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --------------------------
  // Component chứa logo CV
  logoCV: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '40%',
    height: '60%',
  },
  // --------------------------
  scrollView: {

  },
  // Component chứa login form
  loginAccount: {
    alignItems: 'center',
  },
  // input Account
  inputAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    marginTop: 5,
    position: 'relative'
  },
  inputIcon: {
    width: 15, // Điều chỉnh kích thước của biểu tượng Email
    height: 15, // Điều chỉnh kích thước của biểu tượng Email
    marginLeft: 15, // Khoảng cách giữa biểu tượng và TextInput
  },
  input: {
    fontSize: 14,
    marginLeft: 5,
    width: '85%',
    // Khoảng cách giữa TextInput và placeholder
  },
  // forgot Password
  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 10
  },
  // button Account
  btnAccount: {
    borderRadius: 12,
    height: 40,
    width: '90%',
    backgroundColor: '#E38025',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // txt button
  btnTxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Kanit',
    fontWeight: 'bold',

  },
  // --------------------------
  loginSocial: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  txtOr: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  imgSocial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imgSocial2: {
    width: 50, // Độ rộng của đường viên
    height: 50, // Độ cao của đường viên



    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  txtQuestion: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
  },
  txtRegister: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
  },
  bottomText: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
