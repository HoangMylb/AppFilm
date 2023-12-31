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
const Register = (props) => {
  const { navigation } = props;
  const { register } = useContext(UserContext);


  const [tenKhachHang, settenKhachHang] = useState('');
  const [userName, setuserName] = useState('');
  const [passWord, setpassWord] = useState('');
  const [SDT, setSDT] = useState('');
  const [vaiTro, setvaiTro] = useState('Khách hàng')
  const [hinhAnh, sethinhAnh] = useState('https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/ImageUser.png?alt=media&token=07b4b15d-4dcf-402b-88c0-87a987022e19&_gl=1*td1yd*_ga*MTQ3NDUwNTMwMy4xNjk1NDY8NTE2MDEwMjcy*_ga_CW55HF8NVT*MTY5NzAxOTM0OC40LjAuMC4xLjAuMC4w')
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPicker, setshowPicker] = useState(false)
  const [rePassWord, setRePassWord] = useState('');
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

    const res = await register(tenKhachHang, userName, passWord, rePassWord, SDT, formatDate(date), vaiTro, gender, hinhAnh);
    if (res.success) {
      navigation.navigate('Login');
      ToastAndroid.show("Đăng ký thành công", ToastAndroid.LONG);

    } else {
      //user
      if (res.messageUser) {
        setUserNameError(res.messageUser)
      } else {
        setUserNameError('')
      }
      if (res.messageUser2) {
        setUserNameError2(res.messageUser2)
      } else {
        setUserNameError2('')
      }
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
      //ten
      if (res.messageTen) {
        setTenKhachHangError(res.messageTen)
      } else {
        setTenKhachHangError('')
      }
      //pass
      if (res.messagePass) {
        setPassError(res.messagePass)
      } else {
        setPassError('')
      }
      //gioitinh
      if (res.messageGender) {
        setGenderError(res.messageGender)
      } else {
        setGenderError('')
      }
      //date
      if (res.messageDate) {
        setDateError(res.messageDate)
      } else {
        setDateError('')
      }
      //repass
      if (res.messageRePass) {
        setRePassWordError(res.messageRePass)
      } else {
        setRePassWordError('')
      }



    }

  };

  const clickNextTo = () => {
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18191A' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <Text style={styles.title}>Đăng ký thành viên </Text>
          </View>
          {/* Form đăng ký */}
          <View style={styles.formContainer}>
            {/* Input Họ và tên*/}
            <View style={[styles.inputAccount]}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Register%2FuserRegister.png?alt=media&token=5a7226fd-0368-4b3e-be76-f96190c7862a&_gl=1*5qnrvv*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NzAzMjg5OC4yOC4xLjE2OTcwMzQ2NjMuNTIuMC4w',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Họ và tên"
                placeholderTextColor="black"
                value={tenKhachHang}
                onChangeText={settenKhachHang}
              />
            </View>
            {tenKhachHangError ? (
              <Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{tenKhachHangError}</Text>
            ) : (<Text style={{ marginVertical: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
            )}
            {/* Input Email*/}
            <View style={[styles.inputAccount]}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoEmail.png?alt=media&token=00111537-92bd-48de-8754-a1ac66871c3b&_gl=1*aj7qcl*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDc4NzUuNDcuMC4w',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="black"
                value={userName}
                onChangeText={setuserName}
              />
            </View>
            {userNameError ? (
              <Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{userNameError}</Text>
            ) : userNameError2?(<Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{userNameError2}</Text>)
            : (<Text style={{ marginVertical: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
            )}
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
            {/* Input Giới tính*/}
            <View style={[styles.genderContainer]}>
              <Text style={styles.sex}>Giới tính (Tùy chọn)</Text>
              <View style={styles.radioOptionsContainer}>
                <TouchableWithoutFeedback onPress={() => handleGenderPress('Nam')}>
                  <View style={styles.radioOption}>
                    <View
                      style={[
                        styles.radioCircle,
                        gender === 'Nam' && styles.radioSelected,
                      ]}
                    />
                    <Text style={styles.radioLabel}>Nam</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => handleGenderPress('Nữ')}>
                  <View style={styles.radioOption}>
                    <View
                      style={[
                        styles.radioCircle,
                        gender === 'Nữ' && styles.radioSelected,
                      ]}
                    />
                    <Text style={styles.radioLabel}>Nữ</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {genderError ? (
              <Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{genderError}</Text>
            ) : (<Text style={{ marginVertical: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
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
            {/* Input password */}
            <View style={[styles.inputAccount]}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoPassword.png?alt=media&token=3b71665d-b37b-49b8-9cfa-d98b52532b7f&_gl=1*1wwkmox*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDgzNjYuNDUuMC4w',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor="black"
                secureTextEntry={isPasswordHidden}
                value={passWord}
                onChangeText={setpassWord}
              />
              <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '85%' }} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                <Image
                  style={{ width: 29, height: 20, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/icon%20_eye_.png?alt=media&token=2a97db14-015f-43dd-b6e8-87ad7b01c317&_gl=1*1ugamz5*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzcyMDU1OS41LjEuMTY5NzcyMDYwNC4xNS4wLjA.' }}

                />
              </TouchableOpacity>
            </View>
            {passError ? (
              <Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{passError}</Text>
            ) : (<Text style={{ marginVertical: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
            )}
            {/* Input confirm password */}
            <View style={[styles.inputAccount]}>
              <Image
                style={styles.inputIcon}
                source={{
                  uri:
                    'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/logoPassword.png?alt=media&token=3b71665d-b37b-49b8-9cfa-d98b52532b7f&_gl=1*1wwkmox*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5Njk0Njg5OS4yNi4xLjE2OTY5NDgzNjYuNDUuMC4w',
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry={isPasswordHidden1}
                placeholderTextColor="black"
                value={rePassWord}
                onChangeText={setRePassWord}
              />
              <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '85%' }} onPress={() => setIsPasswordHidden1(!isPasswordHidden1)}>
                <Image
                  style={{ width: 29, height: 20, }}
                  source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/icon%20_eye_.png?alt=media&token=2a97db14-015f-43dd-b6e8-87ad7b01c317&_gl=1*1ugamz5*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzcyMDU1OS41LjEuMTY5NzcyMDYwNC4xNS4wLjA.' }}

                />
              </TouchableOpacity>
            </View>
            {rePassWordError ? (
              <Text style={{ marginVertical: 5, marginLeft: '10%', color: 'red', fontSize: 11, alignSelf: 'flex-start' }}>{rePassWordError}</Text>
            ) : (<Text style={{ marginVertical: 5, color: 'red', fontSize: 11, alignSelf: 'center' }}></Text>
            )}
            <TouchableOpacity style={styles.btnAccount} onPress={clickNext}>
              <Text style={styles.btnTxt}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={styles.bottomText}>
              <Text style={styles.txtQuestion}>Tài khoản đã được đăng ký !
              </Text>
              <TouchableOpacity
                onPress={clickNextTo}
                style={{
                  width: 95,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 8,
                  borderRadius: 8,
                  backgroundColor: '#E38025',
                }}>
                <Text style={styles.txtRegister}> Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 200,
    height: 140,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    color: 'white',
    fontWeight: '800'
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