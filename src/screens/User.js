import React, { useState, useContext, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
  TouchableWithoutFeedback, ActivityIndicator, Pressable, Platform, ToastAndroid

} from 'react-native';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImagePicker from 'react-native-image-crop-picker';
import { storage } from "../../firebaseConfig";
import { UserContext } from '../context/UserContext';
import { StackActions } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const User = (props) => {
  const { navigation } = props;
  // bắt đầu các hàm thay đổi hình đại diện
  const [dowload, setDowload] = useState('');
  async function pickImage() {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      const uri = image.path;
      if (uri) {
        // upload the image
        await uploadImage(uri);
      }
    } catch (error) {
      ToastAndroid.show("Hủy chọn ảnh", 1);

    }
  }

  async function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          console.log("File available at", url);
          // Lưu đường dẫn vào state

          
          setDowload(url);

        });
      }
    );
  }
  //kết thúc các hàm thay đổi hình đại diện
  const { suaHoTen, getId, suaSDT, suaPassWord, suaNgaySinh, suaEmail, suaGioiTinh, suaHinhAnh } = useContext(UserContext);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [data2, setData2] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('keepLogedIn');
      const storedData2 = await AsyncStorage.getItem('userData');
      if (storedData !== null) {
        setData2(JSON.parse(storedData2));
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    } finally {
      setIsLoading(false); // Đã tải xong dữ liệu từ AsyncStorage
    }
  };
  const nextToo = async () => {
    const a = await getId(data2._id);
    if (a.success) {
      console.log("getIda1: " + JSON.stringify(a.message._id));
      setTenKhachHang(a.message.tenKhachHang)
      setDate(a.message.ngaySinh)
      setGender(a.message.gioiTinh)
      setuserName(a.message.userName)
      setpassWord(a.message.passWord)
      setSDT(a.message.SDT)
      sethinhAnh(a.message.hinhAnh)
    } else {
      console.log("getIdSai: " + JSON.stringify(a.success));
    }

  };

  useEffect(() => {
    fetchData();
    if (!isLoading) {
      nextToo();
    }
    if (dowload) {
      changeHinhAnh();
     
    }

  }, [isLoading, dowload]);
  const nextTo = async () => {
    navigation.dispatch(StackActions.replace('Home'));
  };
  const [isAlertHoTen, setAlertHoTen] = useState(false);
  const [isAlertSDT, setAlertSDT] = useState(false);
  const [isAlertEmail, setAlertEmail] = useState(false);
  const [isAlertPassWord, setAlertPassWord] = useState(false);
  const [isAlertNgaySinh, setAlertNgaySinh] = useState(false);
  const [isAlertGioiTinh, setAlertGioiTinh] = useState(false);
  const showAlertHoTen = () => {
    setAlertHoTen(true);
  };
  const showAlertGioiTinh = () => {
    setAlertGioiTinh(true);
  };
  const showAlertPassWord = () => {
    setAlertPassWord(true);
  };
  const showAlertNgaySinh = () => {
    setAlertNgaySinh(true);
  };
  const showAlertSDT = () => {
    setAlertSDT(true);
  };
  const showAlertEmail = () => {
    setAlertEmail(true);
  };
  const hideAlert = () => {
    setAlertHoTen(false);
    setAlertSDT(false);
    setAlertEmail(false);
    setAlertPassWord(false);
    setAlertNgaySinh(false);
    setAlertGioiTinh(false);
  };
  //hàm ẩn modal của tất cả
  const handleAlertAction = () => {
    hideAlert();
  };
  //biến của đăng xuất
  const [isEditing, setIsEditing] = useState(false);
  //biến của update
  const [tenKhachHang, setTenKhachHang] = useState('');
  const [userName, setuserName] = useState('');
  const [passWord, setpassWord] = useState('');
  const [SDT, setSDT] = useState('');
  const [hinhAnh, sethinhAnh] = useState('')
  const [gender, setGender] = useState('');
  const [date, setDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPicker, setshowPicker] = useState(false)
  const [newPassWord, setNewPassWord] = useState('');
  const [rePassWord, setRePassWord] = useState('');

  //hàm xử lý của họ tên
  const changeHoTen = async () => {
    const res = await suaHoTen(data2._id, tenKhachHang);
    if (res.success) {
      hideAlert();
      ToastAndroid.show("Cập nhật thành công", 1);
    } else {
      ToastAndroid.show("" + res.message, 1);
    }
  };
  //hàm xử lý của SDT
  const changeSDT = async () => {
    const res = await suaSDT(data2._id, SDT);
    if (res.success) {
      hideAlert();
      ToastAndroid.show("Cập nhật thành công", 1);
    } else {
      ToastAndroid.show("" + res.message, 1);
    }
  };
  //hàm xử lý của NgaySinh
  const changeNgaySinh = async () => {
    const res = await suaNgaySinh(data2._id, date);

    if (res.success) {

      hideAlert();
      ToastAndroid.show("Cập nhật thành công", 1);
    } else {
      ToastAndroid.show("" + res.message, 1);
    }
  };
  //hàm xử lý của Email
  const changeEmail = async () => {
    const res = await suaEmail(data2._id, userName);
    if (res.success) {
      hideAlert();
      ToastAndroid.show("Cập nhật thành công", 1);
    } else {
      ToastAndroid.show("" + res.message, 1);
    }
  };
  //hàm xử lý của GioiTinh
  const changeGioTinh = async () => {
    const res = await suaGioiTinh(data2._id, gender);
    if (res.success) {
      hideAlert();
      ToastAndroid.show("Cập nhật thành công", 1);
    } else {
      ToastAndroid.show("" + res.message, 1);
    }
  };
  //hàm xử lý của Email
  const changePassWord = async () => {

    const res = await suaPassWord(data2._id, newPassWord, rePassWord);
    if (res.success) {
      setpassWord(newPassWord)
      hideAlert();

      ToastAndroid.show("Cập nhật thành công", 1);
    } else {
      ToastAndroid.show("" + res.message, 1);
    }
  };
  //hàm xử lý của HinhAnh
  const changeHinhAnh = async () => {
    const res = await suaHinhAnh(data2._id, dowload);
    if (res.success) {
      sethinhAnh(dowload);
      hideAlert();
      ToastAndroid.show("Cập nhật thành công", 1);
    } else {
      ToastAndroid.show("" + res.message, 1);
    }
  };
  //hiện hoặc ẩn modal đăng xuất
  const handleDangXuat = () => {
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  // Xử lý đăng xuất
  const handleActiveDangXuat = () => {
    AsyncStorage.setItem("keepLogedIn", "")
    setIsEditing(false);
    navigation.dispatch(StackActions.replace('Login'));
  };
  // Hàm xử lý khi lưu thay đổi

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
        setDate(formatDate(currentDate.toDateString()))
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
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'white', marginTop: 14, marginLeft: '20%' }}>Thông tin cá nhân</Text>
        </View>


        {/* Hình ảnh USER */}

        <TouchableOpacity onPress={pickImage} style={styles.imgUser}>
          <View >
            {isLoading ? (
              <ActivityIndicator size="large" color="blue" />
            ) :
              <View>
                {hinhAnh ? ( // Check if hinhAnh is not empty
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'red' }}
                    source={{ uri: hinhAnh }}
                  />
                ) : (
                  // Handle the case when hinhAnh is empty
                  <Text>No Image</Text>
                )}
              </View>
            }
          </View>
          <Image
            resizeMode='cover'
            style={{ aspectRatio: 1, width: 22, height: 22, position: 'absolute', top: 30, left: 35 }}
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Information%20User%2Frefresh2.png?alt=media&token=bb4aed51-115d-450a-a2f5-c6623c13fb00&_gl=1*18lbbxu*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODAyMzA1NS4yMS4xLjE2OTgwMjM1MjQuMjguMC4w' }}

          />
        </TouchableOpacity>
        {/* Thông Tin USER */}
        <View style={styles.ifmUser}>
          <Text style={styles.inputTitle}>Họ và tên</Text>
          <View style={{ flexDirection: 'row', width: '85%', height: '11%', position: 'relative' }}>
            <Text style={[styles.input1, { height: '100%' }]}>{tenKhachHang}</Text>
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '90%', width: 29, height: 20, }} onPress={showAlertHoTen}>
              <Image
                resizeMode='cover'
                style={{ aspectRatio: 1, width: 29, height: 20, }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Information%20User%2Fimage%2026.png?alt=media&token=a709b447-30cd-4b98-bcc3-5e44697d7d25&_gl=1*13nr4lc*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5Nzc5NjIzMy42LjEuMTY5Nzc5NzQ0MC4zOC4wLjA.' }}

              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>Số điện thoại</Text>
          <View style={{ flexDirection: 'row', width: '85%', height: '11%', position: 'relative' }}>
            <Text style={[styles.input1, { height: '100%' }]}>{SDT}</Text>
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '90%', width: 29, height: 20, }} onPress={showAlertSDT}>
              <Image
                style={{ aspectRatio: 1, width: 29, height: 20, }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Information%20User%2Fimage%2026.png?alt=media&token=a709b447-30cd-4b98-bcc3-5e44697d7d25&_gl=1*13nr4lc*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5Nzc5NjIzMy42LjEuMTY5Nzc5NzQ0MC4zOC4wLjA.' }}

              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>Ngày sinh</Text>
          <View style={{ flexDirection: 'row', width: '85%', height: '11%', position: 'relative' }}>
            <Text style={[styles.input1, { height: '100%' }]}>{date}</Text>
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '90%', width: 29, height: 20, }} onPress={showAlertNgaySinh}>
              <Image
                style={{ aspectRatio: 1, width: 29, height: 20, }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Information%20User%2Fimage%2026.png?alt=media&token=a709b447-30cd-4b98-bcc3-5e44697d7d25&_gl=1*13nr4lc*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5Nzc5NjIzMy42LjEuMTY5Nzc5NzQ0MC4zOC4wLjA.' }}

              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>Email</Text>
          <View style={{ flexDirection: 'row', width: '85%', height: '11%', position: 'relative' }}>
            <Text style={[styles.input1, { height: '100%' }]}>{userName}</Text>
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '90%', width: 29, height: 20, }} onPress={showAlertEmail}>
              <Image
                style={{ aspectRatio: 1, width: 29, height: 20, }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Information%20User%2Fimage%2026.png?alt=media&token=a709b447-30cd-4b98-bcc3-5e44697d7d25&_gl=1*13nr4lc*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5Nzc5NjIzMy42LjEuMTY5Nzc5NzQ0MC4zOC4wLjA.' }}

              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>Giới tính</Text>
          <View style={{ flexDirection: 'row', width: '85%', height: '11%', position: 'relative' }}>
            <Text style={[styles.input1, { height: '100%' }]}>{gender}</Text>
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '90%', width: 29, height: 20, }} onPress={showAlertGioiTinh}>
              <Image
                style={{ aspectRatio: 1, width: 29, height: 20, }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Information%20User%2Fimage%2026.png?alt=media&token=a709b447-30cd-4b98-bcc3-5e44697d7d25&_gl=1*13nr4lc*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5Nzc5NjIzMy42LjEuMTY5Nzc5NzQ0MC4zOC4wLjA.' }}

              />
            </TouchableOpacity>
          </View>
          <Text style={styles.inputTitle}>Mật khẩu</Text>

          <View style={{ flexDirection: 'row', width: '85%', height: '11%', position: 'relative' }}>
            {isPasswordHidden ? (
              <Text style={[styles.input1, { height: '100%' }]}>*******</Text>
            ) : (
              <Text style={[styles.input1, { height: '100%' }]}>{passWord}</Text>
            )}
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '75%' }} onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
              <Image
                style={{ width: 29, height: 20, }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/icon%20_eye_.png?alt=media&token=2a97db14-015f-43dd-b6e8-87ad7b01c317&_gl=1*1ugamz5*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzcyMDU1OS41LjEuMTY5NzcyMDYwNC4xNS4wLjA.' }}

              />
            </TouchableOpacity>
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center', left: '90%', width: 29, height: 20, }} onPress={showAlertPassWord}>
              <Image
                style={{ aspectRatio: 1, width: 29, height: 20, }}
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Information%20User%2Fimage%2026.png?alt=media&token=a709b447-30cd-4b98-bcc3-5e44697d7d25&_gl=1*13nr4lc*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5Nzc5NjIzMy42LjEuMTY5Nzc5NzQ0MC4zOC4wLjA.' }}

              />
            </TouchableOpacity>
          </View>

        </View>


        {/* Button Update  USER */}
        <TouchableOpacity style={styles.btnDangXuat} onPress={handleDangXuat}>
          <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Kanit', fontWeight: '700' }}>Đăng xuất</Text>
        </TouchableOpacity>

      </View >
      {/* hiện thông báo đăng xuất */}
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isEditing}
          onRequestClose={handleCancel}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* View chứa hình ảnh logon và text */}
              <View style={styles.logoContainer}>
                <Text style={styles.title2}>Bạn có muốn đăng xuất không?</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.btnAccount, { width: 100, margin: 20, backgroundColor: '#990000' }]} onPress={handleActiveDangXuat}>
                  <Text style={styles.btnTxt}>Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnAccount, { width: 100, margin: 20 }]} onPress={handleCancel}>
                  <Text style={styles.btnTxt}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/*kết thúc thông báo đăng xuất */}
      {/* hiện cập nhật họ và tên */}
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isAlertHoTen}
          onRequestClose={hideAlert}>

          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* View chứa hình ảnh logon và text */}
              <View style={styles.logoContainer}>
                <Text style={styles.title}>Cập nhật Họ và tên</Text>
              </View>
              <View style={styles.inputAccount}>
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

                  onChangeText={setTenKhachHang}
                />
              </View>
              <TouchableOpacity style={styles.btnAccount} onPress={changeHoTen}>
                <Text style={styles.btnTxt} >Thay đổi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAccount} onPress={handleAlertAction}>
                <Text style={styles.btnTxt}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>

        </Modal>
      </View>
      {/*kết thúc hiện cập nhật họ và tên */}
      {/* hiện cập nhật số điện thoại */}
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isAlertSDT}
          onRequestClose={hideAlert}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* View chứa hình ảnh logon và text */}
              <View style={styles.logoContainer}>
                <Text style={styles.title}>Cập nhật Số điện thoại</Text>
              </View>
              <View style={styles.inputAccount}>
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
              <TouchableOpacity style={styles.btnAccount} onPress={changeSDT}>
                <Text style={styles.btnTxt}>Thay đổi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAccount} onPress={handleAlertAction}>
                <Text style={styles.btnTxt}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/*kết thúc hiện cập nhật số điện thoại */}
      {/* hiện cập nhật NgaySinh */}
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isAlertNgaySinh}
          onRequestClose={hideAlert}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* View chứa hình ảnh logon và text */}
              <View style={styles.logoContainer}>
                <Text style={styles.title}>Cập nhật Ngày sinh</Text>
              </View>
              <View style={styles.inputAccount}>
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Register%2FuserRegister.png?alt=media&token=5a7226fd-0368-4b3e-be76-f96190c7862a&_gl=1*5qnrvv*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NzAzMjg5OC4yOC4xLjE2OTcwMzQ2NjMuNTIuMC4w',
                  }}
                />
                {showPicker && (
                  <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={dateOfBirth}
                    onChange={onChange}
                    maximumDate={new Date('2023-12-31')}
                    minimumDate={new Date('1900-1-1')}
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
                      value={date}

                      onChangeText={setDate}
                      placeholderTextColor="black"
                      editable={false}
                    />
                  </Pressable>
                )}

              </View>
              <TouchableOpacity style={styles.btnAccount} onPress={changeNgaySinh}>
                <Text style={styles.btnTxt}>Thay đổi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAccount} onPress={handleAlertAction}>
                <Text style={styles.btnTxt}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/*kết thúc hiện cập nhật NgaySinh */}
      {/* hiện cập nhật email */}
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isAlertEmail}
          onRequestClose={hideAlert}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* View chứa hình ảnh logon và text */}
              <View style={styles.logoContainer}>
                <Text style={styles.title}>Cập nhật Email</Text>
              </View>
              <View style={styles.inputAccount}>
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
              <TouchableOpacity style={styles.btnAccount} onPress={changeEmail}>
                <Text style={styles.btnTxt}>Thay đổi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAccount} onPress={handleAlertAction}>
                <Text style={styles.btnTxt}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/*kết thúc hiện cập nhật email */}
      {/* hiện cập nhật gioiTinh */}
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isAlertGioiTinh}
          onRequestClose={hideAlert}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* View chứa hình ảnh logon và text */}
              <View style={styles.logoContainer}>
                <Text style={styles.title}>Cập nhật Giới tinh</Text>
              </View>
              <View style={styles.genderContainer}>
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
              <TouchableOpacity style={styles.btnAccount} onPress={changeGioTinh}>
                <Text style={styles.btnTxt}>Thay đổi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAccount} onPress={handleAlertAction}>
                <Text style={styles.btnTxt}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/*kết thúc hiện cập nhật gioiTinh */}
      {/* hiện cập nhật mật khẩu */}
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isAlertPassWord}
          onRequestClose={hideAlert}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* View chứa hình ảnh logon và text */}
              <View style={styles.logoContainer}>
                <Text style={styles.title}>Cập nhật Password</Text>
              </View>
              <View style={styles.inputAccount}>
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Register%2FuserRegister.png?alt=media&token=5a7226fd-0368-4b3e-be76-f96190c7862a&_gl=1*5qnrvv*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NzAzMjg5OC4yOC4xLjE2OTcwMzQ2NjMuNTIuMC4w',
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu mới"
                  placeholderTextColor="black"
                  onChangeText={setNewPassWord}
                />
              </View>
              {/* Input confirm password */}
              <View style={styles.inputAccount}>
                <Image
                  style={styles.inputIcon}
                  source={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Register%2FuserRegister.png?alt=media&token=5a7226fd-0368-4b3e-be76-f96190c7862a&_gl=1*5qnrvv*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NzAzMjg5OC4yOC4xLjE2OTcwMzQ2NjMuNTIuMC4w',
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="black"
                  value={rePassWord}
                  onChangeText={setRePassWord}
                />
              </View>
              <TouchableOpacity style={styles.btnAccount} onPress={changePassWord}>
                <Text style={styles.btnTxt}>Thay đổi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnAccount} onPress={handleAlertAction}>
                <Text style={styles.btnTxt}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/*kết thúc hiện cập nhật mật khẩu */}
    </SafeAreaView >

  );

};

export default User;

const styles = StyleSheet.create({
  // Header
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'black',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imgUser: {

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    position: 'relative',

  },

  // Title
  ifmUser: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },

  input1: {
    backgroundColor: '#EA5973',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    fontSize: 15,
    color: 'black',
    paddingLeft: 20,

    paddingTop: 10,
    backgroundColor: 'white'
  },
  inputTitle: {
    color: 'white', alignSelf: 'flex-start', marginLeft: 20,
    marginVertical: 10
  },
  // Button Update



  btnDangXuat: {
    width: '70%',
    height: '7%',
    borderRadius: 12,
    backgroundColor: '#990000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '35%'
  },
  //của Update
  container: {
    flex: 1,
    margin: 10,
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
    marginTop: 40,
    marginBottom: 10
  },
  title2: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800',
    marginTop: 40,
    marginBottom: 10
  },
  //  Text input
  inputAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    margin: 10,
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
    width: '85%',
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
    width: 200,
    backgroundColor: '#E38025',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnTxt: {
    color: 'white', fontSize: 16, fontFamily: 'Kanit', fontWeight: '700'
  },




});
