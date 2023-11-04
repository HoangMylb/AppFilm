import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState , useContext} from 'react';
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
const ForgetpassWordOtp = ({ navigation }) => {
  const { verifyOTP} = useContext(UserContext);
  const clickNextTo = () => {
    navigation.dispatch(StackActions.replace('Login'));
  };
  const route = useRoute();
  const userId = route.params.userId;
  const email = route.params.email;

  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const [emailError, setEmailError] = useState(null);

  const navigateToSubmitPassword = (email) => {
    navigation.dispatch(
      StackActions.replace('SubmitPassword', {
        email:email
      })
    );
  };
  const clickNextToSubPass = async () => {
    // Kiểm tra nếu inputValues không chứa giá trị nào thì đặt emailError
    if (inputValues.every(value => value === '')) {
      setEmailError('Vui lòng nhập mã OTP');
    } else {
      
      // Tiếp tục xử lý khi hết null
      const inputValuesJoined = inputValues.join('');
      const a  = await verifyOTP(userId,inputValuesJoined);

      if(a.success){
        setEmailError(null);
        navigateToSubmitPassword(email);
      }else{
        setEmailError(a.message);
      }
      
    }
  };

  const handleTextChange = (text, index) => {
    // Giới hạn chỉ nhập số và kiểm tra độ dài
    const newText = text.replace(/[^0-9]/g, '');

    if (newText.length === 1) {
      const newInputValues = [...inputValues];
      newInputValues[index] = newText;
      setInputValues(newInputValues);
      focusNextInput(index);
    }
  };

  const focusNextInput = (index) => {
    if (index < 5) {
      inputRefs[index + 1].focus();
    }
  };

  const inputRefs = [];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={clickNextTo}>
        <Image style={styles.image} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }} />
      </TouchableOpacity>
      <Text style={styles.txtquenmk}>Xác thực OTP</Text>
      <Text style={styles.txtvl}>Chúng tôi đã gửi mã OTP vào Email của bạn đã nhập trước đó, Vui lòng kiểm tra Email của bạn</Text>
      <Text style={[styles.txtvl, { marginTop: 5, textAlign: 'center' }]}></Text>
      <View style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'center' }}>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <TextInput
            ref={(input) => (inputRefs[index] = input)}
            key={index}
            style={[styles.tpotp, { borderColor: emailError ? 'red' : '#000000', borderWidth: 1 }]}
            placeholderTextColor="#000000"
            keyboardType='numeric'
            fontSize={16}
            maxLength={1}
            onChangeText={(text) => handleTextChange(text, index)}
          />
        ))}
      </View>
      {emailError && (
        <Text style={{ color: 'red', fontSize: 12, alignSelf:'center' }}>{emailError}</Text>
      )}
      <TouchableOpacity onPress={clickNextToSubPass} style={styles.toguima}>
        <Text style={styles.toguimaText}>Xác thực</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ForgetpassWordOtp;

const styles = StyleSheet.create({
  toguima: {
    marginTop: '100%',
    width: 272,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#E38025",
    alignItems: 'center',
    alignSelf: 'center'
  },
  tpotp: {
    textAlign: 'center',
    margin: 4,
    width: 40,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  txtvl: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
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
  },
  toguimaText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 20,
    alignItems: 'center',
    marginLeft: 4,
    marginTop: 11
  },
});
