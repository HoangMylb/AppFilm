import {StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Image,TextInput} from 'react-native'
import React from 'react'

const ForgetpassWordOtp = () => {
  return (
    <SafeAreaView style = {styles.container}>
      <TouchableOpacity>
    <Image style = {styles.image}
    source={require("../icon/back.png")}
    />
    </TouchableOpacity>
    <Text style={styles.txtquenmk}>
      Quên mật khẩu?
    </Text>
    <Text style = {styles.txtvl}>
    Vui lòng cung cấp số điện thoại, chúng tôi sẽ gửi mã
    </Text>
    <Text style = {[styles.txtvl,{marginTop:5,textAlign:'center'}]}>
      xác thực cho bạn
    </Text>
    <View style={{marginTop:40,flexDirection:'row'}}>
      <TextInput style={styles.tpotp}
       placeholderTextColor={"#000000"}
       fontSize={24}
      />
      <TextInput style={styles.tpotp}
      placeholderTextColor={"#000000"}
      fontSize={24}
      />
      <TextInput style={styles.tpotp}
      placeholderTextColor={"#000000"}
      fontSize={24}
      />
      <TextInput style={styles.tpotp}
      placeholderTextColor={"#000000"}
      fontSize={24}
      />
      <TextInput style={styles.tpotp}
      placeholderTextColor={"#000000"}
      fontSize={24}
      />
    </View>
    <TouchableOpacity style = {styles.toguima}>
        <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:'500',lineHeight:20,alignItems:'center',marginLeft:4,marginTop: 11
    }}>Gửi mã</Text>
    </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ForgetpassWordOtp

const styles = StyleSheet.create({
  toguima:{
    marginLeft: 30,
 marginTop: 400,
 width: 272,
 height:44,
 borderRadius: 8,
 backgroundColor:"#E38025",
 alignItems: 'center',
 textAlign: 'center'
},
  tpotp:{
    textAlign:'center',
    margin:4,
   width: 59,
   height:56,
   backgroundColor:"#D9D9D9",
   borderRadius: 10,
  },
  txtvl:{
    marginTop:15,
    fontSize: 14,
    fontWeight:'400',
    lineHeight:19.6,
    alignItems:'center',
    color: "#FFFFFF",
    textAlign:'center'
    },
    txtquenmk:{
    marginLeft:120,
    marginTop:20,
     color: "#FFFFFF",
     width: 131,
     height: 22,
     fontWeight: '700',
     fontSize:16,
     lineHeight: 22.4,
     textAlign: 'center'
    },
    image:{
    width:44,
    height:44
    },
  container: {
    padding:22,
    flex:1,
    backgroundColor: "#18191A"
  }
})