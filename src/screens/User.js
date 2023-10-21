import React, { useState } from 'react';
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

const User = () => {
  const [gender, setGender] = useState('');

  const handleGenderPress = (selectedGender) => {
    if (selectedGender === gender) {
      setGender(''); // Bỏ chọn nếu đã chọn trước đó
    } else {
      setGender(selectedGender);
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
        }}
      >

        {/* Hình ảnh USER */}
        <View style={styles.imgUser}>
          <Image
            style={{ width: 70, height: 70 }}
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/ImageUser.png?alt=media&token=07b4b15d-4dcf-402b-88c0-87a987022e19&_gl=1*td1yd*_ga*MTQ3NDUwNTMwMy4xNjk1NDY8NTE2MDEwMjcy*_ga_CW55HF8NVT*MTY5NzAxOTM0OC40LjAuMC4xLjAuMC4w',
            }}
          />
        </View>

        {/* Thông Tin USER */}
        <View style={styles.ifmUser}>
          <TextInput style={styles.input} value="Phạm Vĩnh Phúc" editable={false} />
          <TextInput style={styles.input} value="091 1348 440" editable={false} />
          <TextInput style={styles.input} value="14 / 10 / 2003" editable={false} />
          <TextInput style={styles.input} value="phucpvps21064@fpt.edu.vn" editable={false} />

          <View style={styles.genderContainer}>
            <View>
            <TouchableWithoutFeedback
              onPress={() => handleGenderPress('Nam')}
            >
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
            </View>
            <View>
            <TouchableWithoutFeedback
              onPress={() => handleGenderPress('Nữ')}
            >
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
            <View>
            <TouchableWithoutFeedback
              onPress={() => handleGenderPress('Chưa xác định')}
            >
              <View style={styles.radioOption}>
                <View
                  style={[
                    styles.radioCircle,
                    gender === 'Chưa xác định' && styles.radioSelected,
                  ]}
                />
                <Text style={styles.radioLabel}>Chưa xác định</Text>
              </View>
            </TouchableWithoutFeedback>
            </View>
          </View>
        </View>


        {/* Button Update  USER */}
        <View style={styles.btnUpdate}>
            <TouchableOpacity style = {styles.btn}>
              <Text style = {{color:'white',fontSize: 16, fontFamily: 'Kanit'}}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
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
    backgroundColor: 'white',
    width: '85%',
    height: '11%',
    borderRadius: 12,
    fontSize: 12,
    color: 'black',
    paddingLeft: 20,
  },

  // Radio buttons
  genderContainer: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  radioSelected: {
    backgroundColor: '#e38025',
  },
  radioLabel: {
    marginLeft: 5,
    color: 'white'
  },


  // Button Update
    btnUpdate: {
      width: '100%',
      height: '20%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },

    btn :{
      width: '70%', 
      height: '35%',
      borderRadius: 12,
      backgroundColor: '#E38025',
      justifyContent: 'center',
      alignItems: 'center',
    }


});
