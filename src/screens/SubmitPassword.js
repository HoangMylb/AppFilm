import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput,ToastAndroid } from 'react-native'
import React,{useState, useContext,useEffect} from 'react'
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

const SubmitPassword = ({ navigation }) => {
  const route = useRoute();
  const { getByUser,suaPassWord} = useContext(UserContext);
  const email = route.params.email;
  const [id, setId] = useState('');
  const [passWord, setPassWord] = useState('');
  const [rePassWord, setRePassWord] = useState('');
  const [passWordError, setPassWordError] = useState(null);
  const [rePassWordError, setRePassWordError] = useState(null);
  useEffect(() => {
    const go = async () => {
      const a = await getByUser(email);
      setId(a.message._id)
    };
    go();
  }, [])
  
  const clickNextTo = () => {
    navigation.dispatch(StackActions.replace('Login'));
  };
  const clickNextToLogin = async () => {
     const a = await suaPassWord(id,passWord,rePassWord);
    if(a.success){
      setPassWordError(a.message)
      setRePassWordError(a.message1)
      ToastAndroid.show("Bạn đã thay đổi mật khẩu thành công",1)
      navigation.dispatch(StackActions.replace('Login'));
      
    }else{
      setPassWordError(a.message)
      setRePassWordError(a.message1)
      console.log("message: "+a.message);
      console.log("message1111: "+a.message1);
    }

  };
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
        Vui lòng cập nhật lại mật khẩu của bạn
      </Text>
      <View >
        <View style={[styles.tpphone,{ marginTop: 30,borderColor: passWordError ? 'red' : '#000000', borderWidth: 1  }]}>
          <Image  style={{ margin: 10,width: 15, height: 15 }}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoPassword.png?alt=media&token=3b71665d-b37b-49b8-9cfa-d98b52532b7f&_gl=1*1wwkmox*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDgzNjYuNDUuMC4w',
            }}
          />
          <TextInput style={{width: '86%'}}
            placeholder='Nhập mật khẩu mới'
            placeholderTextColor={"#000000"}
            onChangeText={setPassWord}
          />
        </View>
      {passWordError ? (
        <Text style={{ marginTop: 5,color: 'red', fontSize: 11, alignSelf:'center' }}>{passWordError}</Text>
      ):(<Text style={{marginTop: 5, color: 'red', fontSize: 11, alignSelf:'center' }}></Text>
      )}


        <View style={[styles.tpphone,{marginTop: 30,borderColor: rePassWordError ? 'red' : '#000000', borderWidth: 1 }]}>
        <Image style={{ margin: 10,width: 15, height: 15 }}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoPassword.png?alt=media&token=3b71665d-b37b-49b8-9cfa-d98b52532b7f&_gl=1*1wwkmox*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDgzNjYuNDUuMC4w',
            }}
            />

          <TextInput style={{width: '86%'}}
            placeholder='Xác nhận mật khẩu mới'
            placeholderTextColor={"#000000"}
            onChangeText={setRePassWord}
          />

        </View>
      </View>
      {rePassWordError ? (
        <Text style={{ marginTop: 5,color: 'red', fontSize: 11, alignSelf:'center' }}>{rePassWordError}</Text>
      ):(<Text style={{marginTop: 5, color: 'red', fontSize: 11, alignSelf:'center' }}></Text>
      )}
      <TouchableOpacity style={styles.toguima} onPress={clickNextToLogin}>
        <Text style={{
          color: "#FFFFFF", fontSize: 18, fontWeight: '500', lineHeight: 20, alignItems: 'center', marginLeft: 4, marginTop: 11
        }}>Xác nhận</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SubmitPassword
const styles = StyleSheet.create({
  toguima: {
    marginTop: '80%',
    width: 272,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#E38025",
    alignItems: 'center',
    alignSelf: 'center'
  },
  tpphone: {
    
    width: '100%',
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    flexDirection: "row",
  

  },
  txtvl: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19.6,
    alignItems: 'center',
    color: "#FFFFFF",
    textAlign: 'center'
  },
  txtquenmk: {
  
    marginTop: 20,
    color: "#FFFFFF",
 
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22.4,
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
})