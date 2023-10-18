import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Image,TextInput} from 'react-native'
import React from 'react'

const SubmitPassword = () => {
  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity>
    <Image style = {styles.image}
    source={require("../icon/back.png")}
    />
    </TouchableOpacity>
    <Text style={styles.txtquenmk}>
      Quên mật khẩu?
    </Text>
    <Text style = {styles.txtvl}>
    Vui lòng cập nhật lại mật khẩu của bạn
    </Text>
    <View style={{marginTop: 30}}>
    <View style = {styles.tpphone}>
    <Image style={{marginLeft: 10}}
      source={require("../icon/iconlock.png")}
     />
     <TextInput style={{}}
      placeholder ='Nhập mật khẩu mới'
      placeholderTextColor={"#000000"}
     />
    </View>
    <View style = {styles.tpphone}>
    <Image style={{marginLeft: 10}}
      source={require("../icon/iconlock.png")}
     />
     <TextInput style={{}}
      placeholder ='Xác nhận mật khẩu mới'
      placeholderTextColor={"#000000"}
     />
     
    </View>
    </View>
    <TouchableOpacity style = {styles.toguima}>
        <Text style={{color:"#FFFFFF",fontSize:18,fontWeight:'500',lineHeight:20,alignItems:'center',marginLeft:4,marginTop: 11
    }}>Xác nhận</Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SubmitPassword
const styles = StyleSheet.create({
    toguima:{
        marginLeft: 30,
     marginTop: 380,
     width: 272,
     height:44,
     borderRadius: 8,
     backgroundColor:"#E38025",
     alignItems: 'center',
     textAlign: 'center'
    },
    tpphone:{
    margin: 10,
    width: 350,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent:'flex-start',
    flexDirection:"row",
    alignItems: 'center'
    
    },
    txtvl:{
    marginTop:20,
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