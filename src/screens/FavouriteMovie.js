import { StyleSheet, SafeAreaView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import movieList from '../data/movieItem';
import { PhimContext } from '../context/PhimContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FavouriteMovie = () => {
    const [movie, setMovie] = useState(movieList);
    const [movie2, setMovie2] = useState(movieList);
    const [data2, setData2] = useState('');
    const { getYeuThich, xoaYeuThich,getAll } = useContext(PhimContext);
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

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            // Đoạn mã dưới đây sẽ được chạy khi bạn chuyển qua màn hình khác.
            return () => {
                console.log('Home screen is unfocused.');
            };
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {

            if (data2._id) {
                // data2._id tồn tại, bạn có thể gọi yeuthich() ở đây
                yeuthich();
                console.log("Biến data2._idaaa " + data2._id);
            }
            // Đoạn mã dưới đây sẽ được chạy khi bạn chuyển qua màn hình khác.
            return () => {
                console.log('Home screen is unfocused.');
            };
        }, [data2._id])
    );

    const yeuthich = async () => {
        const a = await getAll();
        if (a.success) {
            setMovie2(a);
            console.log("yeuthich: " +JSON.stringify(a) );
            console.log("getIda1: " + JSON.stringify(data2._id));
        } else {
            console.log("getIdSai: " + JSON.stringify(a.success));

        }
    }



    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontWeight: '700', alignSelf: 'center', color: 'white', marginTop: 20 }}>Phim yêu thích{data2._id} </Text>

            <FlatList
                style={{ marginHorizontal: 10 }}
                numColumns={2}
                data={movie}
                keyExtractor={item => item.name}
                renderItem={renderItem}
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


const renderItem = ({ item }) => {

    return (
        <View
        >

            <View style={{ backgroundColor: 'black', marginTop: 20, marginLeft: 30, borderRadius: 12, alignSelf: 'center' }}>
                <Image style={{ width: 120, height: 200, resizeMode: 'cover', borderRadius: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12 }} src={item.url}></Image>

                <TouchableOpacity >
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={{

                            uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FavouriteMovie%2Fimage%2013.png?alt=media&token=086dcd3c-ef65-4fe7-9842-aaf71cf05a69&_gl=1*lvndtu*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODA5OTY5NC4yNi4xLjE2OTgxMDMwMDIuNDUuMC4w'
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

