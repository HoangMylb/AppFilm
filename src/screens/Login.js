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


const Login = props => {
  const { navigation } = props;
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const {login} = useContext(UserContext);

  

  const clickNext = async () => {
    const res = await login(userName,passWord);
      if (res) {
        navigation.navigate('Home');
        ToastAndroid.show("Đăng nhập thành công"+res,1);

      }else{
        ToastAndroid.show("Đăng nhập thất bại"+res,1);
      }
   
  };
  const clickNextTo = () => {
    navigation.navigate('Register');
  };

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
              <View style={styles.inputAccount}>
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
              {/* Input password*/}
              <View style={styles.inputAccount}>
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoPassword.png?alt=media&token=3b71665d-b37b-49b8-9cfa-d98b52532b7f&_gl=1*1wwkmox*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDgzNjYuNDUuMC4w',
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  placeholderTextColor="black"
                  value={passWord}
                  onChangeText={setPassWord}
                />
              </View>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={{ color: '#CA0E0E' }}>Quên mật khẩu</Text>
              </TouchableOpacity>
              {/* Button Login */}
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
              <View style={styles.imgSocial}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Google.png?alt=media&token=45c9a432-82fc-4321-bd6f-f787d36b3beb',
                  }}
                />
                <Image
                  style={{ width: 30, height: 30 }}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FB.png?alt=media&token=e54a728e-facf-46f5-8a1c-ae44057e8570',
                  }}
                />
              </View>
            </View>
            <View style={styles.bottomText}>
              <Text style={styles.txtQuestion}>Người dùng mới !</Text>
              <TouchableOpacity
                onPress={clickNextTo}
                style={{
                  borderWidth: 1,
                  width: 95,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                  borderColor: '#FF1F11',
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
    backgroundColor: '#CF9B9B',
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
    marginTop: 10

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
    marginTop: 10,
    marginBottom: 10
  },

  // button Account
  btnAccount: {
    borderRadius: 12,
    height: 40,
    width: '90%',
    backgroundColor: '#D65555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // txt button

  btnTxt: {
    fontSize: 18,
    color: 'black',
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
    color: 'black',
    fontSize: 14,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },

  imgSocial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },

  txtQuestion: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
  },
  txtRegister: {
    color: '#FF1F11',
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
