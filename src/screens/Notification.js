import { StyleSheet, SafeAreaView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'

import { ThanhToanContext } from '../context/ThanhToanContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Notification = ({ navigation }) => {
    const [movie, setMovie] = useState('');
    const [phim, setPhim] = useState('');
    const [rap, setRap] = useState('');
    const { DonHangUser,LayPhim,LayRap } = useContext(ThanhToanContext);
   
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
          
            setMovie(a.message);
            getPhim(a.message[0].phim);
            getRap(a.message[0].rapPhim)
             
            // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
        }
    
        // Đánh dấu rằng đã kết thúc loading
        setIsLoading(false);
    }
    
    const getPhim= async (_id) => {
        const b = await LayPhim(_id);
        if (b.success) {
            
             setPhim( b.message.tenPhim);
             
            // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
           
        }
    }
    const getRap= async (_id) => {
        const c = await LayRap(_id);
        if (c.success) {
             setRap(c.message.tenRapPhim);
             
            // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
           
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        if (!isLoading) {
            getAll();
           
        }
       
    }, [isLoading])
    const onPressItem = (item) => {
        navigation.navigate('DetailNotification', { item });
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ lineHeight: 40, fontWeight: '700', color: 'white', fontSize: 20, alignSelf: 'center' }}>Thông báo</Text>
            </View>
            {isLoading ? ( // Kiểm tra nếu đang loading thì hiển thị thông báo hoặc spinner
                <Text style={{ color: 'white' }}>Đang tải dữ liệu...</Text>
            ) : (
                <FlatList

                    numColumns={1}
                    data={movie}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => onPressItem(item)}>
                                <View style={{ width: '90%', height: 130, backgroundColor: '#222222',  marginLeft: 20, borderRadius: 12 }}>

                                    <Text style={{ color: '#339933', fontWeight: '700', fontSize: 20, alignSelf: 'center' }}>Đặt vé thành công!</Text>
                                   
                                        <Text style={{   marginLeft: '2%', width: '96%', fontSize: 17, color: 'white' }}>Phim: {phim}</Text>
                                        <Text style={{ marginTop: '5%',   marginLeft: '2%', width: '96%',  fontSize: 17, color: 'white' }}>Rạp: {rap}</Text>
                                    
                                    
                                    <Text style={{ marginTop: '5%',   marginLeft: '2%', width: '96%',fontSize: 17,color: 'white' }}>Xuất chiếu: {movie[0].xuatChieu}</Text>
                                    <Text style={{ marginTop: 'auto', marginBottom: '1%', marginLeft: '75%', fontSize: 13, color: 'red', fontWeight: '600' }}>Xem thêm  </Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    )
}

export default Notification


const styles = StyleSheet.create({
    iconBack: {
        width: 44,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 50,


    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 44,
        marginTop: '4%'
    },

    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#18191A'
    },
})




