import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Login = props => {
  const {navigation} = props;

  const clickNext = () => {
    navigation.navigate('Home');
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
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoCV.png?alt=media&token=b53e602f-2fd6-4520-916b-83ab21905a2d&_gl=1*k5swc5*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NTk5Mzg1Mi4xMC4xLjE2OTU5OTQyMzcuNjAuMC4w',
            }}
          />
        </View>

        {/* Login Form */}
        <View style={styles.loginForm}>
          <View style={styles.loginAccount}>
            {/* Input email*/}
            <View style={styles.inputAccount}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
              />
            </View>
            {/* Input password*/}
            <View style={styles.inputAccount}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
              />
            </View>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={{color: '#CA0E0E'}}>Quên mật khẩu</Text>
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

            <Text> Dunggggg demo </Text>

            {/* 2 logo social */}
            <View style={styles.imgSocial}>
              <Image
                style={{width: 30, height: 30}}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Google.png?alt=media&token=45c9a432-82fc-4321-bd6f-f787d36b3beb',
                }}
              />
              <Image
                style={{width: 30, height: 30}}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FB.png?alt=media&token=e54a728e-facf-46f5-8a1c-ae44057e8570',
                }}
              />
            </View>

            {/* chữ  */}
            <Text style={styles.txtQuestion}>
              Bạn chưa có tài khoản ?
              <Text style={styles.txtRegister}> Đăng kí</Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  // nền của component
  Background: {
    width: '100%',
    height: '100%',
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
    width: '35%',
    height: '35%',
  },

  // --------------------------

  // Component chứa login form
  loginForm: {
    width: '100%',
    height: '60%',
  },

  loginAccount: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  // input Account
  inputAccount: {
    borderRadius: 12,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
  },
  input: {
    fontSize: 14,
    marginLeft: 15,
  },

  // forgot Password

  forgotPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
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
    height: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  txtOr: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
  },

  imgSocial: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },

  txtQuestion: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
  },
  txtRegister: {
    color: '#F6B027',
    fontSize: 14,
    fontFamily: 'Kanit',
    fontWeight: 'bold',
  },
});
