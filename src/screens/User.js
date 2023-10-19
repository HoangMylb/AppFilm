import React, { useState, useContext } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { UserContext } from '../context/UserContext';
import { StackActions } from '@react-navigation/native';
const User = (props) => {
  const { navigation } = props;
  const [gender, setGender] = useState('');
  const { khachHang } = useContext(UserContext);

  const nextTo = () => {
    navigation.dispatch(StackActions.replace('Home'));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18191A' }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {/* nút back */}

        <View style={{ flexDirection: 'row', position: 'absolute', top: 10, left: 10 }}>
          <TouchableOpacity onPress={nextTo}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white', marginTop: 14, marginLeft: '33%' }}>Thông tin</Text>
        </View>


        {/* Hình ảnh USER */}
        <View style={styles.imgUser}>
          <Image
            style={{ width: 70, height: 70 }}
            source={{uri:khachHang.hinhAnh }}
          />
        </View>

        {/* Thông Tin USER */}
        <View style={styles.ifmUser}>
          <Text style={styles.inputTitle}>Họ và tên</Text>
          <Text style={styles.input}>{khachHang.tenKhachHang}</Text>
          <Text style={styles.inputTitle}>Số điện thoại</Text>
          <Text style={styles.input}>{khachHang.SDT}</Text>
          <Text style={styles.inputTitle}>Ngày sinh</Text>
          <Text style={styles.input}>{khachHang.ngaySinh}</Text>
          <Text style={styles.inputTitle}>Email</Text>
          <Text style={styles.input}>{khachHang.userName}</Text>
          <Text style={styles.inputTitle}>Giới tính</Text>
          <Text style={styles.input}>{khachHang.gioiTinh}</Text>
        </View>


        {/* Button Update  USER */}
        
          <TouchableOpacity style={styles.btnUpdate}>
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Kanit',fontWeight:'700' }}>Cập nhật thông tin</Text>
          </TouchableOpacity>
       
        
          <TouchableOpacity style={styles.btnDangXuat}>
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Kanit',fontWeight:'700' }}>Đăng xuất</Text>
          </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  // Header
  imgUser: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Title
  ifmUser: {
    width: '100%',
    height: '50%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
   
  },

  input: {
    backgroundColor: '#EA5973',
    width: '85%',
    height: '11%',
    borderRadius: 12,
    fontSize: 15,
    color: 'black',
    paddingLeft: 20,

    paddingTop: 10,
    backgroundColor: 'white'
  },
  inputTitle: {
    color: 'white', alignSelf: 'flex-start', marginLeft: 20
  },
  // Button Update
  btnUpdate: {
    
    marginTop: 10,
    backgroundColor: 'red'
  },
 

  btnUpdate: {
    width: '70%',
    height: '7%',
    borderRadius: 12,
    backgroundColor: '#E38025',
    justifyContent: 'center',
    alignItems: 'center',
   marginTop: 10
  },
  btnDangXuat: {
    width: '70%',
    height: '7%',
    borderRadius: 12,
    backgroundColor: '#990000',
    justifyContent: 'center',
    alignItems: 'center',
   marginTop: 15
  }


});
