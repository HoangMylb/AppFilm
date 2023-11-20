import React,{useState,useContext} from 'react';
import { StackActions } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import { UserContext } from '../context/UserContext';

const ForgotpassWord = ({navigation}) => {
  const { checkOTP,sendOTP} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const trangThai = "OTP";
  const clickNextTo = () => {
    navigation.dispatch(StackActions.replace('Login'));
  };
  const navigateToForgetpassWordOtp = (userId,email) => {
    navigation.dispatch(
      StackActions.replace('ForgetpassWordOtp', {
        userId: userId,
        email:email
      })
    );
  };
  const handleSendCode = async () => {
    const a = await checkOTP(email);
    if (a.success) {
        const b = await sendOTP(email,trangThai);
        if (b.message.userId) {
          navigateToForgetpassWordOtp(b.message.userId,b.message.email);
        }
        
    }else{
      setEmailError(a.message);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={clickNextTo}>
        <Image style={styles.image}
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
        />
      </TouchableOpacity>
      <Text style={styles.txtquenmk}>
        Quên mật khẩu?
      </Text>
      <Text style={styles.txtvl}>
        Vui lòng cung cấp Email bạn đã đăng ký, chúng tôi sẽ gửi mã xác thực vào Email đó cho bạn
      </Text>
      <View style={[styles.tpphone, {borderColor : emailError ? 'red' : '#000000', borderWidth: 1}]}>
        <Image
          style={{ marginHorizontal: 10, width: 15, height: 15 }}
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoEmail.png?alt=media&token=00111537-92bd-48de-8754-a1ac66871c3b&_gl=1*aj7qcl*_ga*MTQ3NDUwNTMwMy4xNjk5NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDc4NzUuNDcuMC4w',
          }}
        />
        <TextInput
          style={{width: '86%'}}
          placeholder='Emaill'
          placeholderTextColor='#000000'
          textSize={14}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(null); // Xóa lỗi khi người dùng thay đổi giá trị
          }}
        />
      </View>
      {emailError && (
        <Text style={{ color: 'red', fontSize: 12, marginLeft: 10 }}>{emailError}</Text>
      )}

      <TouchableOpacity style={styles.toguima} onPress={handleSendCode}>
        <Text style={{
          color: "#FFFFFF", fontSize: 18, fontWeight: '500', lineHeight: 20,alignSelf: 'center', marginTop: 11
        }}>Gửi mã</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgotpassWord;

const styles = StyleSheet.create({
  toguima: {
   
    width: 272,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#E38025",
    alignSelf: 'center',
    marginTop: '120%'
  },
  tpphone: {
    marginTop: 15,
    width: '100%',
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    flexDirection: "row",
    alignItems: 'center'

  },
  txtvl: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    alignItems: 'center',
    color: "#FFFFFF",
    textAlign: 'center'
  },
  txtquenmk: {

    color: "#FFFFFF",

    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center'
  },
  image: {
    width: 44,
    height: 44
  },
  container: {
    padding: 22,
    flex: 1,
    backgroundColor: "#18191A"
  }
});
