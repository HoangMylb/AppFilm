import { StyleSheet, SafeAreaView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native';

import { PhimContext } from '../context/PhimContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FavouriteMovie = ({navigation }) => {

    const [movie2, setMovie2] = useState('');
   
    const { getYeuThich, getMangPhim } = useContext(PhimContext);
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

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            // Đoạn mã dưới đây sẽ được chạy khi bạn chuyển qua màn hình khác.
            return () => {

            };
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {

            if (data2._id) {
                // data2._id tồn tại, bạn có thể gọi yeuthich() ở đây
                yeuthich();

            }
            // Đoạn mã dưới đây sẽ được chạy khi bạn chuyển qua màn hình khác.
            return () => {

            };
        }, [data2._id])
    );

    const yeuthich = async () => {
        const a = await getYeuThich(data2._id);
        if (a.success) {
            //Sử dụng .flat() sau .map() sẽ làm phẳng mảng lồng mảng và trả về một mảng mới chứa các chuỗi _id.
            const phimArrays = a.message.map(item => item.phim).flat();
            hienYeuThich(phimArrays);
        } else {

        }
    }
    const hienYeuThich = async (_id) => {
        const a = await getMangPhim(_id);
        if (a.success) {
            setMovie2(a.message);

        } else {
            console.log("getIdSai: " + JSON.stringify(a.success));

        }
    }

    const onPressItem = (item) => {
        console.log("Item: "+item.trangThai);
        if (item.trangThai==="Đang chiếu") {
            navigation.navigate('TicketsYeuThich', { item, idUser: data2._id });
        }else{
            navigation.navigate('TicketYeuThichSC', { item, idUser: data2._id });
        }
        
    };
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'center', color: 'white', marginTop: 20 }}>Phim yêu thích </Text>

            <FlatList
            style={{alignSelf: 'center'}}
                numColumns={2}
                data={movie2}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => onPressItem(item)}>
                            <View style={{ backgroundColor: 'black', margin: 20, borderRadius: 12, }}>
                                <Image style={{ width: 120, height: 200, resizeMode: 'cover', borderRadius: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} src={item.poster}/>

                                <Image
                                    style={{ width: 20, height: 20, margin: 5 }}
                                    source={{

                                        uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FavouriteMovie%2Fimage%2013.png?alt=media&token=086dcd3c-ef65-4fe7-9842-aaf71cf05a69&_gl=1*lvndtu*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODA5OTY5NC4yNi4xLjE2OTgxMDMwMDIuNDUuMC4w'
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

export default FavouriteMovie

const styles = StyleSheet.create({
    iconBack: {
        width: 44,
        height: 44,
        backgroundColor: '#E5C4C4',
        opacity: 0.7,
        borderRadius: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#18191A',
        justifyContent: 'center',
        alignItems: 'center',
    },
})



