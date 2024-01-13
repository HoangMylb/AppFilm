import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import { useRoute } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PhimContext } from '../context/PhimContext';

const DetailNews = ({navigation}) => {

    const {getPhimId} = useContext(PhimContext);
    const route = useRoute();
    const item = route.params.item;
    const [data2, setData2] = useState('');
    const [dataPhim, setDataPhim] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchData();
        if (!isLoading) {
            nextToo();
            
          }
      
      }, [isLoading])
    const nextTo = () => {
        navigation.dispatch(StackActions.replace('TinTuc'));
    };
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
        const b = await getPhimId(item.phim);
        if (b.success) {
            setDataPhim(b.message);
           
          } else {
            // Xử lý khi không lấy được idPhim
          }
      };
     
      const onPressItem = () => {
        navigation.navigate('BuyTickets', { item: dataPhim, idUser: data2._id });
     };
    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                <TouchableOpacity onPress={nextTo}>
                    <Image
                        style={{ width: 44, height: 44 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView  >

                <Image
                    source={{ uri: item.image }}
                    style={{ width: 320, height: 300, alignSelf: 'center', resizeMode: 'contain' }}
                />

                <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>{item.title}</Text>
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 10, marginVertical: 20 }}>{item.chitiet}</Text>
            </ScrollView>
            <TouchableOpacity
                style={{
                  width: 300,
                  height: 50,
                  backgroundColor: '#E38025',
                  borderRadius: 10,
                  padding: 12,
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginBottom: 20,
                }}
                onPress={onPressItem}>
                <Text
                  style={{
                    height: 26,
                    fontWeight: '500',
                    fontSize: 22,
                    color: '#FFFFFF',
                  }}>
                  Mua vé
                </Text>
              </TouchableOpacity>
        </View>
    )
}

export default DetailNews

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#18191A',
    }
})