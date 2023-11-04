import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView, ActivityIndicator
} from 'react-native';
import directorList from '../data/directorItem';
import actorList from '../data/actorItem';
import MovieItem from '../renderItem/renderMovie';
import DirectorItem from '../renderItem/renderDirector';
import { UserContext } from '../context/UserContext';
import { PhimContext } from '../context/PhimContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieItem2 from '../renderItem/renderMovie2';
const Home = (props) => {
  const { navigation } = props;
  //phim
  const { getPhimHome,getPhimHomeSC,getAllDV } = useContext(PhimContext);
  const [dataPhim, setDataPhim] = useState('')
  const [dataPhim2, setDataPhim2] = useState('')
  //user
  const { getId } = useContext(UserContext);
  const [tenKhachHang, settenKhachHang] = useState('')
  const [hinhAnh, setHinhAnh] = useState('')
  const [data2, setData2] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  //ham cua Phim
  const clickNextAll = () => {
    navigation.navigate('Launching');
  };
  const clickNextAll2 = () => {
    navigation.navigate('Comings');
  };
  const phimHome = async () => {
    const a = await getPhimHome();
    if (a.success) {
      setDataPhim(a.message)
    } else {
      console.log("Khong lay duoc Phim: " + JSON.stringify(a.success));

    }

  };
  const phimHomeSC = async () => {
    const a = await getPhimHomeSC();
    if (a.success) {
      setDataPhim2(a.message)
    } else {
      console.log("Khong lay duoc Phim: " + JSON.stringify(a.success));

    }

  };
  //ket thuc ham cua Phim
  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('keepLogedIn');
      const storedData2 = await AsyncStorage.getItem('userData');
      if (storedData !== false) {
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
      settenKhachHang(a.message.tenKhachHang)
      setHinhAnh(a.message.hinhAnh)
    } else {
      console.log("getIdSai: " + JSON.stringify(a.success));

    }

  };
  //console.log("khachHome: "+JSON.stringify(khachHang));
  useEffect(() => {
    fetchData();

    if (!isLoading) {
      nextToo();
      phimHome();
      phimHomeSC();
      getDienVien();
    }
  }, [isLoading]);


  // data phim

  const [director, setDirector] = useState('');

  const getDienVien = async () => {
    const a = await getAllDV();
    if (a.success) {
      setDirector(a.message)
    } else {
      console.log("Khong lay duoc DienVien: " + JSON.stringify(a.success));
    }

  };
  const renderItem1 = ({ item }) => {
    return <DirectorItem item={item} />; // Sử dụng MovieItem component
  };


  const clickNext = () => {
    navigation.navigate('User');
  };

 

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={styles.screen}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.txtHeader}>

              <Text style={styles.txt1}>Xin chào, {tenKhachHang} </Text>

              <Text style={styles.txt2}>Đặt vé xem phim thôi nào</Text>
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color="blue" />
            ) :
              <TouchableOpacity onPress={clickNext}>

                {hinhAnh ? ( // Check if hinhAnh is not empty
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'red' }}
                    source={{ uri: hinhAnh }}
                  />
                ) : (
                  // Handle the case when hinhAnh is empty
                  <Text style={{ color: 'white' }}>Đang tải</Text>
                )}
              </TouchableOpacity>
            }

          </View>
          {/* ... */}
          {/* MOVIE thứ 1 */}
          <View style={styles.movie}>
            {/* Tiêu đề */}
            <Text style={styles.txtRap}>Phim rạp</Text>

            {/* Danh sách phim đang chiếu */}
            <View style={styles.headerMovie}>
              <Text style={{ fontSize: 24, color: 'white' }}>Đang chiếu</Text>
              <TouchableOpacity onPress={clickNextAll}>
                <Text style={{ fontSize: 13, color: '#E38025' }}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phim */}
            <FlatList
              horizontal
              data={dataPhim}
              keyExtractor={(item, index) => item.tenPhim + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={({ item }) => (
                <MovieItem item={item} navigation={navigation} idUser={data2._id} />
              )}
            />
          </View>
          {/* MOVIE Sắp chiếu */}
          <View style={styles.movie}>
            {/* Danh sách phim đang chiếu */}
            <View style={styles.headerMovie}>
              <Text style={{ fontSize: 24, color: 'white' }}>Sắp chiếu</Text>
              <TouchableOpacity onPress={clickNextAll2}>
                <Text style={{ fontSize: 13, color: '#E38025' }}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phim */}
            <FlatList
              horizontal
              data={dataPhim2}
              keyExtractor={(item, index) => item.tenPhim + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={({ item }) => (
                <MovieItem2 item={item} navigation={navigation} idUser={data2._id} />
              )}
            />
          </View>
          {/* Danh sách dien vien */}
          <View style={styles.director}>
            {/* Tiêu đề */}
            <View style={styles.headerDirector}>
              <Text style={{ fontSize: 24, color: 'white' }}>Diễn viên</Text>
            </View>
            <FlatList
              horizontal
              data={director}
              keyExtractor={(item, index) => item.Dic + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={renderItem1}
            />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18191A',
  },

  screen: {
    marginHorizontal: 10,
    marginTop: 10,
  },

  // header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  txtHeader: {

  },
  imgHeader: {
    width: 50,
    height: 50,
  },

  // title

  txt1: {
    fontSize: 22,
    color: '#ffffff',
    fontFamily: 'Roboto',
  },
  txt2: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#C57831',
  },

  // Movie

  txtRap: {
    marginTop: 15,
    fontSize: 32,
    fontFamily: 'Roboto',
    color: '#ffffff',
  },

  headerMovie: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerDirector: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerActor: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  actor: {
    marginBottom: 20,
  },

  director: {
    marginBottom: 20,
  }
});
