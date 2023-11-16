import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,Dimensions
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';

import {ThanhToanContext} from '../context/ThanhToanContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = ({navigation}) => {
  const [movie, setMovie] = useState('');
  const [phim, setPhim] = useState('');
  const [rap, setRap] = useState('');
  const {DonHangUser, LayPhim, LayRap} = useContext(ThanhToanContext);

  const [data2, setData2] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
  const getAll = async () => {
    const a = await DonHangUser(data2._id);
    if (a.success) {
      const formattedMovie = [];

      for (const item of a.message) {
        const tenPhim = await getPhim(item.phim);
        const tenRapPhim = await getRap(item.rapPhim);

        formattedMovie.push({
          ...item,
          tenPhim,
          tenRapPhim,
        });
      }

      setMovie(formattedMovie);

      // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
    }

    // Đánh dấu rằng đã kết thúc loading
    setIsLoading(false);
  };

  const getPhim = async _id => {
    const b = await LayPhim(_id);
    if (b.success) {
      return b.message.tenPhim;

      // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
    }
  };
  const getRap = async _id => {
    const c = await LayRap(_id);
    if (c.success) {
      return c.message.tenRapPhim;

      // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      getAll();
    }
  }, [isLoading]);
  const onPressItem = item => {
    navigation.navigate('DetailNotification', {item});
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông báo </Text>
      </View>
      {movie ? (
        <FlatList
          numColumns={1}
          data={movie}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View style={styles.notificationContainer}>
              <TouchableOpacity onPress={() => onPressItem(item)}>
                <View style={styles.notificationBox}>
                  <Text style={styles.notificationTitle}>Đặt vé thành công </Text>
                  <Text style={styles.notificationText}>
                    Phim: {item.tenPhim}
                  </Text>
                  <Text style={styles.notificationText}>
                    Rạp: {item.tenRapPhim}
                  </Text>
                  <Text style={styles.notificationText}>
                    Xuất chiếu: {item.xuatChieu}
                  </Text>
                  <Text style={styles.viewMoreText}>Xem thêm</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style = {{flex: 1,justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.loadingText}>Đang tải dữ liệu... </Text>
        </View>
      )}
    </View>
  );
};

const window = Dimensions.get('window'); // Get screen dimensions


export default Notification;

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        alignSelf: 'center',
        margin: 20,
    },
    notificationContainer: {
        marginBottom: 10,
    },
    notificationBox: {
        width: window.width - 40, // Adjust the width to be a little less than the screen width
        height: 150,
        backgroundColor: '#222222',
        marginLeft: 20,
        borderRadius: 12,
        alignItems:'center',
        justifyContent: 'center',
    },
    notificationTitle: {
        color: '#339933',
        fontWeight: '700',
        fontSize: 20,
        alignSelf: 'center',
    },
    notificationText: {
        width: '96%',
        fontSize: 17,
        color: 'white',
        marginLeft: '2%',
    },
    viewMoreText: {
        marginLeft: '75%',
        fontSize: 13,
        color: '#E38025',
        fontWeight: '600',
        margin: 5,
    },
    loadingText: {
        color: 'white',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#18191A',
    },
});
