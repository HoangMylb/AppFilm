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
const Login = (props) => {

  const { navigation } = props;
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const { login } = useContext(UserContext);
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
    if (userName == "" || passWord == "") {
      ToastAndroid.show("Không để trống Email hoặc PassWord", 2);
    } else {
      if (handleValidation()) {
        const res = await login(userName, passWord);
        if (res.success) {
          const userData = res.khach;

          AsyncStorage.setItem('keepLogedIn', JSON.stringify(true));
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          console.log(" res.khach: " + JSON.stringify(res.khach));
          console.log("userData được lưu: " + JSON.stringify(userData));
          navigation.dispatch(StackActions.replace('Home'));

          ToastAndroid.show("Đăng nhập thành công", 1);
        } else {
          ToastAndroid.show("Sai tài khoản hoặc mật khẩu", 1);
        }
      } else {
        ToastAndroid.show("Email không hợp lệ", 1);
      }
    }
  };
  const clickNextTo = () => {
    navigation.navigate('Register');
  };
  const nextForgot = () => {
    navigation.navigate('ForgotpassWord');
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
                  secureTextEntry={isPasswordHidden}
                  placeholderTextColor="black"
                  value={passWord}
                  onChangeText={setPassWord}
                />
                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '85%' }} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                  <Image
                    style={{ width: 29, height: 20, }}
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/icon%20_eye_.png?alt=media&token=2a97db14-015f-43dd-b6e8-87ad7b01c317&_gl=1*1ugamz5*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzcyMDU1OS41LjEuMTY5NzcyMDYwNC4xNS4wLjA.' }}

                  />
                </TouchableOpacity>
              </View>
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
              <View style={styles.imgSocial}>
                <View style={styles.imgSocial2}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Google.png?alt=media&token=45c9a432-82fc-4321-bd6f-f787d36b3beb',
                    }}
                  />
                </View>
                <View style={styles.imgSocial2}>
                  <Image
                    style={{ width: 30, height: 30 }}
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FB.png?alt=media&token=e54a728e-facf-46f5-8a1c-ae44057e8570',
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.bottomText}>
              <Text style={styles.txtQuestion}>Người dùng mới !</Text>
              <TouchableOpacity
                onPress={clickNextTo}
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
    marginTop: 15
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
    marginTop: 10,
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
    marginTop: 10,
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
    marginTop: 10,
    marginBottom: 10
  },
  imgSocial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgSocial2: {
    width: 50, // Độ rộng của đường viên
    height: 50, // Độ cao của đường viên



    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
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
