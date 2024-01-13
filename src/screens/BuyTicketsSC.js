import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Modal,
  TextInput
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { PhimContext } from '../context/PhimContext';
import Video from 'react-native-video';
import { UserContext } from '../context/UserContext';

const BuyTickets = ({ navigation }) => {
  const { getId } = useContext(UserContext);
  const { removeBinhLuanFromPhim, newYeuThich, xoaYeuThich, kiemTraYeuThich, getDienVien, getBinhLuanPhim, addBinhLuan } = useContext(PhimContext);
  const [check, setCheck] = useState(0);

  const [dataDienVien, setDataDienVien] = useState('');
  const route = useRoute();
  const item = route.params.item;
  const idUser = route.params.idUser;
  const [checkYT, setcheckYT] = useState(false);
  const isIcon = async () => {
    const newCheckValue = check + 1;
    setCheck(newCheckValue);
    if (newCheckValue === 1) {
      await newYeuThich(idUser, item._id);
      ToastAndroid.show('Thêm yêu thích thành công', 1);
    }
    if (newCheckValue >= 2) {
      setCheck(0);
      await xoaYeuThich(idUser, item._id);
      ToastAndroid.show('Xóa yêu thích thành công', 1);
    }
  };
  const dienVien = async () => {
    const a = await getDienVien(item.dienVien);
    if (a.success) {
      setDataDienVien(a.message);
    } else {
      console.log('Khong lay duoc DienVien: ' + JSON.stringify(a.success));
    }
  };
  const nextTo = async () => {
    navigation.dispatch(StackActions.replace('Home'));
  };

  useEffect(() => {
    const ktYeuThich = async () => {
      const a = await kiemTraYeuThich(idUser, item._id);
      if (a.success) {
        setCheck(1);
      } else {
        setCheck(0);
      }
      setcheckYT(a);
    };
    ktYeuThich();

    dienVien();
    getBinhLuan();
    getUser();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const day = currentDate.getDate();
    setToDay(`${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`);
  }, []);



  const [dataComment, setDataComment] = useState('');
  const [dataUser, setDataUser] = useState('');

  const [noiDung, setNoiDung] = useState('');
  const [today, setToDay] = useState('');
  const [idComment, setIdComment] = useState('');
  const [idItem, setIdItem] = useState('');
  const [isComment, setIsComment] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const comment = async () => {
    setIsComment(true);

  };
  const handleCancelComment = () => {
    setIsComment(false);
  };
  const handleCancelDel = () => {

    setIsDel(false)
  };

  const getBinhLuan = async () => {

    const a = await getBinhLuanPhim(item._id);
    if (a.success) {

      setDataComment(a.message)
      setIdComment(a.idBinhLuan)
    } else {
      console.log('Không lấy được BinhLuan: ' + a.success);
    }
  };
  const getUser = async () => {

    const a = await getId(idUser);
    if (a.success) {

      setDataUser(a.message)
    } else {
      console.log('Không lấy được usserr: ' + a.success);
    }
  };
  const addComment = async () => {

    const a = await addBinhLuan(idComment, idUser, today, noiDung, dataUser.hinhAnh, dataUser.tenKhachHang);
    if (a.success) {

      setDataUser(a.message)
      setNoiDung('')
      getBinhLuan();
    } else {
      console.log('Không lấy được usserr: ' + a.success);
    }
  };
  const handleDel = async () => {

    const a = await removeBinhLuanFromPhim(idComment, idItem);
    if (a.success) {
      ToastAndroid.show(a.message, 1);
      setIsDel(false)
      getBinhLuan()
    } else {
      console.log('Không lấy được usserr: ' + a.success);
    }
  };
  const handleLongPress = (id) => {
    setIdItem(id)
    setIsDel(true);

  };
  const renderItem = ({ item }) => (
    <View>

      <View style={{ flexDirection: 'row', marginVertical: 10, position: 'relative' }}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginRight: 10,
            borderRadius: 15,

          }}

          source={{ uri: item.hinhAnh }}
        />
        <View >
          <Text>{item.userTen}</Text>
          <Text style={{ marginVertical: 5, fontWeight: 'bold' }}>{item.noiDung}</Text>
          <Text>{item.ngay}</Text>
        </View>
        {item.userID === idUser ? (
          <TouchableOpacity
            style={{
              width: 20,
              alignSelf: 'center',
              marginHorizontal: 5,
              position: 'absolute',
              top: 0,
              right: '1%'
            }}
            onPress={() => handleLongPress(item._id)}>
            <Image
              style={{
                width: 12,
                height: 12,
              }}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/BuyTickets%2FDelete%20(1).png?alt=media&token=5e9c05fe-72d5-42d5-896e-c0b082c96b02'
              }}
            />
          </TouchableOpacity>
        ) : null}

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* nút back */}

      <View style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
        <TouchableOpacity onPress={nextTo}>
          <Image
            style={{ width: 44, height: 44 }}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.',
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          <Video
            source={{ uri: item.trailer }}
            style={{ width: 320, height: 300, alignSelf: 'center' }}
            controls={true}
            poster={item.poster}
            resizeMode="contain"
          />

          <View style={styles.boder}>
            <View style={{}}>
              <View
                style={{ flexDirection: 'row', marginTop: 20, marginLeft: 40 }}>
                <Image
                  style={{
                    width: 130,
                    height: 15,
                    marginTop: 4,
                    resizeMode: 'cover',
                  }}
                  source={{
                    uri: item.iconStart,
                  }}
                />
              </View>

              <View style={{ position: 'relative', marginTop: 5 }}>
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 24,
                    color: '#000000',
                    marginLeft: 35,
                  }}>
                  {' '}
                  {item.tenPhim}{' '}
                </Text>
                <TouchableOpacity onPress={comment}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      top: -28,
                      left: 250,
                      position: 'absolute',
                    }}
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/BuyTickets%2FComments.png?alt=media&token=fe63e872-ac03-4277-a59f-253a12008c37'
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={isIcon}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      top: -28,
                      left: 300,
                      position: 'absolute',
                    }}
                    source={{
                      uri:
                        check === 0
                          ? 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/BuyTickets%2Ficonlove.png?alt=media&token=66b275d2-89e7-4791-936d-8d15715da0ec&_gl=1*jcu963*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5Njk1MzgwOC4xMC4xLjE2OTY5NTM4NzAuNjAuMC4w'
                          : 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FavouriteMovie%2Fimage%2013.png?alt=media&token=086dcd3c-ef65-4fe7-9842-aaf71cf05a69&_gl=1*lvndtu*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODA5OTY5NC4yNi4xLjE2OTgxMDMwMDIuNDUuMC4w',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 5 }}>
                <Text style={{ fontWeight: '500', fontSize: 18, marginLeft: 35 }}>
                  {' '}
                  {item.theLoaiPhim}{' '}
                </Text>
                <Text
                  style={{
                    width: 300,
                    fontWeight: '500',
                    fontSize: 15,
                    marginLeft: 40,
                    marginVertical: 10,
                  }}>

                  {item.noiDungPhim}
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 24,
                    height: 27,
                    color: '#000000',
                    marginLeft: 35,
                    marginVertical: 5,
                  }}>
                  {' '}
                  Diễn Viên{' '}
                </Text>
              </View>

              <View>
                <FlatList
                  style={{ marginLeft: 30, marginBottom: 10, width: '80%' }}
                  horizontal
                  data={dataDienVien}
                  keyExtractor={(item, index) => item._id + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
                  renderItem={({ item }) => (
                    <View
                      style={{
                        width: 90,
                        height: 80,
                        marginTop: 10,
                        alignItems: 'center',
                        borderRadius: 10,
                        marginRight: 5,
                      }}>
                      <Image
                        source={{ uri: item.hinhAnh }}
                        style={styles.imgdv}
                      />
                      <Text style={{ fontWeight: '500', fontSize: 10 }}>
                        {' '}
                        {item.tenDienVien}
                      </Text>
                    </View>
                  )}
                />
              </View>

              <View
                style={{
                  width: 300,
                  height: 70,
                  backgroundColor: '#C0C0C0',
                  borderRadius: 10,
                  padding: 12,
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    height: 26,
                    fontWeight: '500',
                    fontSize: 22,
                    color: '#FFFFFF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: "100%",
                  }}>
                  Khởi chiếu ngày{'\n'}     {item.ngay}

                </Text>
              </View>
            </View>
          </View>
        </View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={isComment}
          onRequestClose={handleCancelComment}>
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              {/* View cancel */}
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                  style={{
                    width: 20,
                  }}
                  onPress={handleCancelComment}>
                  <Text style={{ fontWeight: '800', fontSize: 20 }}>X</Text>
                </TouchableOpacity>
              </View>
              {/* View chứa flatlist*/}

              <FlatList
                style={{ flex: 1 }}
                data={dataComment}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
              />
              {/* View chứa textInput và submit */}
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{ backgroundColor: 'lightgray', borderRadius: 4, flex: 1, color: 'black', fontSize: 16, paddingLeft: 10 }}
                  placeholder='Viết bình luận...'
                  onChangeText={setNoiDung}
                  value={noiDung}

                />
                <TouchableOpacity
                  style={{
                    width: 20,
                    alignSelf: 'center',
                    marginHorizontal: 5
                  }}
                  onPress={addComment}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                    }}
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/BuyTickets%2FSent.png?alt=media&token=12657cb1-2439-4819-aaac-4927127a61ed'
                    }}
                  />
                </TouchableOpacity>
              </View>


            </View>
          </View>
        </Modal>
        {/* ////mol xoa */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={isDel}
          onRequestClose={handleCancelDel}>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1} // Tắt hiệu ứng opacity khi nhấn
            onPress={null}>

            <View style={{ width: 200, height: 100, backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', top: '20%' }}>

              {/* View chứa flatlist*/}


              {/* View chứa textInput và submit */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    borderRadius: 10,

                    alignItems: 'center'
                  }}
                  onPress={handleDel}>
                  <Text style={{ fontWeight: '800', fontSize: 16, color: 'red' }}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 50,

                    borderRadius: 10,
                    alignItems: 'center'
                  }}
                  onPress={handleCancelDel}>
                  <Text style={{ fontWeight: '800', fontSize: 16, color: 'black' }}>Hủy</Text>
                </TouchableOpacity>


              </View>


            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default BuyTickets;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    marginTop: '10%',
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
    // margin: 20,
    padding: 10,
    borderRadius: 10,
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
  imgdv: {
    width: 63,
    height: 62,
    marginLeft: 5,
  },
  boder: {
    backgroundColor: 'white',
    width: 393,
    height: '100%',
    borderRadius: 58,
    alignSelf: 'center',
    marginLeft: 5,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#18191A',
  },
});
