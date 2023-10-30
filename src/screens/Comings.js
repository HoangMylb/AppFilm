import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import movieList from '../data/movieItem';
import { PhimContext } from '../context/PhimContext';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Comings = ({ navigation }) => {
  const [movie, setMovie] = useState(movieList);
  const { phimSapChieu } = useContext(PhimContext);
  const windowWidth = Dimensions.get('window').width;
  const imageWidth = windowWidth * 0.43; // Điều chỉnh theo nhu cầu
  const imageHeight = imageWidth * 1.795; // Duy trì tỷ lệ hình ảnh
  const [isLoading, setIsLoading] = useState(true);
  const [data2, setData2] = useState('');
  const fetchData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('keepLogedIn');
      const storedData2 = await AsyncStorage.getItem('userData');
      if (storedData !== false) {
        setData2(JSON.parse(storedData2));
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const dangChieu = async () => {
    const a = await phimSapChieu();
    if (a.success) {
      setMovie(a.message)
    } else {
      console.log("Khong lay duoc Phim: " + JSON.stringify(a.success));

    }
    setIsLoading(false)
  };
  useEffect(() => {
    fetchData()
    dangChieu()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
        <View style={{ margin: 10 }}>
          <Image
            source={{ uri: item.poster }}
            style={{ width: imageWidth, height: imageHeight, borderRadius: 12 }}
          />
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>{item.tenPhim}</Text>
        </View>
      </View>
    );
  };
  const nextTo = async () => {
    navigation.dispatch(StackActions.replace('Home'));
  };
  const onPressItem = (item) => {
    navigation.navigate('BuyTicketsSC', { item, idUser: data2._id });
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#18191A' }}>


      {isLoading ? (<Text style={{ color: 'white', fontSize: 16, marginLeft: 60, fontWeight: 'bold' }}>Đang tải ...</Text>) : (
        <><View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginBottom: 10 }}>
          <TouchableOpacity onPress={nextTo}>
            <Image
              style={{ width: 44, height: 44 }}
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 16, marginLeft: 60, fontWeight: 'bold' }}>Đang chiếu</Text>
        </View><FlatList
            data={movie}
            numColumns={2}
            keyExtractor={(item, index) => item.name + index.toString()}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity onPress={() => onPressItem(item)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <View style={{ margin: 10 }}>
                      <Image
                        source={{ uri: item.poster }}
                        style={{ width: imageWidth, height: imageHeight, borderRadius: 12 }}
                      />
                      <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>{item.tenPhim}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )} />
        </>
      )}

    </View>
  );
};

export default Comings;

const styles = StyleSheet.create();
