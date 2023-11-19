import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback, ScrollView, TouchableOpacity, Pressable, Platform, ToastAndroid
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../context/UserContext';
import { useRoute } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterGG = (props) => {
  const { navigation } = props;
  const { register,getByUser } = useContext(UserContext);
  const route = useRoute();

  const email = route.params.email;
  const ten = route.params.ten;
  const [tenKhachHang, settenKhachHang] = useState('');
  const [userName, setuserName] = useState('');
  const [passWord, setpassWord] = useState('123456');
  const [SDT, setSDT] = useState('');
  const [vaiTro, setvaiTro] = useState('Khách hàng')
  const [hinhAnh, sethinhAnh] = useState('https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/ImageUser.png?alt=media&token=07b4b15d-4dcf-402b-88c0-87a987022e19&_gl=1*td1yd*_ga*MTQ3NDUwNTMwMy4xNjk1NDY8NTE2MDEwMjcy*_ga_CW55HF8NVT*MTY5NzAxOTM0OC40LjAuMC4xLjAuMC4w')
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPicker, setshowPicker] = useState(false)
  const [rePassWord, setRePassWord] = useState('123456');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordHidden1, setIsPasswordHidden1] = useState(true);
  //bien thong bao loi
  const [tenKhachHangError, setTenKhachHangError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [userNameError, setUserNameError] = useState(null);
  const [genderError, setGenderError] = useState(null);
  const [SDTError, setSDTError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [rePassWordError, setRePassWordError] = useState(null);
  const [userNameError2, setUserNameError2] = useState(null);
  const [SDTError2, setSDTError2] = useState(null);
  //hàm của giới tính
  const handleGenderPress = selectedGender => {
    if (selectedGender === gender) {
      setGender(''); // Bỏ chọn nếu đã chọn trước đó
    } else {
      setGender(selectedGender);
    }
  };
  //hàm của date và dateOfBirth
  const toggleDatepicker = () => {
    setshowPicker(!showPicker);
  }
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDateOfBirth(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
        setDate(currentDate.toDateString())
      }
    } else {
      toggleDatepicker();
    }
  }
  const formatDate = (dateString) => {
    if (dateString) {
      const dateObject = new Date(dateString);
      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
      const year = dateObject.getFullYear();
      return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    } else {
      formatDate(dateOfBirth);
    }
  };
  //checkPassWord

  //hàm đăng ký
  const clickNext = async () => {

    const res = await register(ten, email, passWord, rePassWord, SDT, formatDate(date), vaiTro, "Nam", hinhAnh);
    if (res.success) {
      const a = await getByUser(email);
      if (a.success) {
          const userData = a.message;
          AsyncStorage.setItem('keepLogedIn', JSON.stringify(true));
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          AsyncStorage.setItem('keepLogedInGG', JSON.stringify(true));
          console.log(" res.khach: " + JSON.stringify(a.message));
          navigation.dispatch(StackActions.replace('Home'));
          ToastAndroid.show("Đăng nhập thành công", 1);
      } else {
        navigation.dispatch(StackActions.replace('Login'));
        ToastAndroid.show("Đăng nhập thất bại", 1);
      }

    } else {
    
      //SDT
      if (res.messageSDT) {
        setSDTError(res.messageSDT)
      } else {
        setSDTError('')
      }
      if (res.messageSDT2) {
        setSDTError2(res.messageSDT2)
      } else {
        setSDTError2('')
      }
      
      //date
      if (res.messageDate) {
        setDateError(res.messageDate)
      } else {
        setDateError('')
      }
      



    }

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18191A',alignItems: 'center', justifyContent: 'center' }}>
      
        <View style={styles.container}>
          {/* View chứa hình ảnh logon và text */}
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Register%2FlogoRegister.png?alt=media&token=ce3b0436-33a3-4617-b209-7cd65d7ef69d&_gl=1*19k35yz*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NzAzMjg5OC4yOC4xLjE2OTcwMzM5NjguNjAuMC4w',
              }}
              style={styles.logo}
            />
            <Text style={styles.title}>Cập nhật thêm thông tin </Text>
          </View>
          {/* Form đăng ký */}
          <View style={styles.formContainer}>
          
            {/* Input số điện thoại*/}
            <View style={[styles.inputAccount, ]}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Register%2FphoneRegister.png?alt=media&token=071db83e-4b4d-49a6-855f-b8796122c627&_gl=1*1rhn6d6*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NzAzMjg5OC4yOC4xLjE2OTcwMzQ3MTUuNjAuMC4w',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                placeholderTextColor="black"
                value={SDT}
                onChangeText={setSDT}
                keyboardType='numeric'
              />
            </View>
            {SDTError ? (
              <Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{SDTError}</Text>
            ) :SDTError2?(<Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{SDTError2}</Text>)
            : (<Text style={{ marginVertical: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
            )}
           
            {/* Input ngày sinh */}
            <View style={[styles.inputAccount]}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Register%2Fcalender.png?alt=media&token=52811058-2d3a-4fcd-8b2f-202c20f95924&_gl=1*1eif0sl*_ga*ODc4NjkwNDYzLjE2OTc4ODI4NzE.*_ga_CW55HF8NVT*MTY5ODc0OTY3OC44LjEuMTY5ODc0OTk1Ny40My4wLjA.',
                }}
              />
              {showPicker && (
                <DateTimePicker
                  mode='date'
                  display='spinner'
                  value={dateOfBirth}
                  onChange={onChange}
                  maximumDate={new Date('2006-12-31')}
                  minimumDate={new Date('1980-1-1')}
                />
              )}
              {!showPicker && (
                <Pressable
                  style={{ width: '90%' }}
                  onPress={toggleDatepicker}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Ngày sinh"
                    value={formatDate(date)}
                    onChangeText={setDate}
                    placeholderTextColor="black"
                    editable={false}
                  />
                </Pressable>
              )}

            </View>
            {dateError ? (
              <Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{dateError}</Text>
            ) : (<Text style={{ marginVertical: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
            )}

           
            <TouchableOpacity style={styles.btnAccount} onPress={clickNext}>
              <Text style={styles.btnTxt}>Cập nhật</Text>
            </TouchableOpacity>
            
          </View>
        </View>
     
    </SafeAreaView>
  );
};
export default RegisterGG;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: '20%'
    
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 140,
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: '800',
    marginVertical: 30
  },
  formContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  //  Text input
  inputAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    position: 'relative',

  },
  inputIcon: {
    width: 15, // Điều chỉnh kích thước của biểu tượng Email
    height: 15, // Điều chỉnh kích thước của biểu tượng Email
    marginLeft: 15, // Khoảng cách giữa biểu tượng và TextInput
  },
  input: {
    fontSize: 14,
    marginLeft: 5,
    color: 'black',// Khoảng cách giữa TextInput và placeholder
    width: '85%'
  },
  // Lựa chọn giới tính
  genderContainer: {
    flexDirection: 'column',
    width: '80%',
  },
  sex: {
    fontSize: 18, // Điều chỉnh kích thước văn bản
    marginBottom: 10, // Tạo khoảng cách giữa văn bản và các radio buttons
    color: 'white'
  },
  radioOptionsContainer: {
    flexDirection: 'row', // Sắp xếp các radio button theo chiều ngang
    justifyContent: 'space-between',
  },
  radioOption: {
    flexDirection: 'row', // Sắp xếp radio button và văn bản theo chiều ngang
    alignItems: 'center', // Căn giữa theo chiều ngang
    marginRight: 20, // Tạo khoảng cách giữa các radio buttons
  },
  radioCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  radioSelected: {
    backgroundColor: 'red',
  },
  radioLabel: {
    marginLeft: 5,
    color: 'white'
  },
  // Button 
  btnAccount: {
    borderRadius: 12,
    height: 40,
    width: '90%',
    backgroundColor: '#E38025',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTxt: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Kanit',
    fontWeight: 'bold',
  },
  // Footer
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
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});