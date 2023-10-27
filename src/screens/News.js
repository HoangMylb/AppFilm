import { StyleSheet, SafeAreaView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import movieList from '../data/movieItem';
import { TinTucContext } from '../context/TinTucContext';

const News = ({navigation }) => {
    const [movie, setMovie] = useState(movieList);
    const { getAllTinTuc } = useContext(TinTucContext);
    const [loading, setLoading] = useState(true); // Thêm state loading

    const getAll = async () => {
        const a = await getAllTinTuc();
        if (a.success) {
            setMovie(a.message);
        }
        setLoading(false); // Đánh dấu rằng đã kết thúc loading
    }

    useEffect(() => {
        getAll();
    }, [])
    const onPressItem = (item) => {
        navigation.navigate('DetailNews', { item});
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ lineHeight: 40, fontWeight: '700', color: 'white', fontSize: 20, alignSelf: 'center' }}>Tin Tức</Text>
            </View>
            {loading ? ( // Kiểm tra nếu đang loading thì hiển thị thông báo hoặc spinner
                <Text style={{ color: 'white' }}>Đang tải dữ liệu...</Text>
            ) : (
                <FlatList

                    numColumns={1}
                    data={movie}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity  onPress={() => onPressItem(item)}>
                                <View style={{ width: '90%', height: 255, backgroundColor: 'white', marginTop: 20, marginLeft: 20, borderRadius: 12 }}>
                                    {item.image ? (
                                        <Image style={{ width: '100%', height: 180, resizeMode: 'cover' }} source={{ uri: item.image }} />
                                    ) : (
                                        <Text style={{ color: 'white' }}>Đang tải</Text>
                                    )}
                                    <Text style={{ marginTop: '2%', marginLeft: '2%', width: '96%', fontSize: 17, color: 'black' }}>{item.title}</Text>

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

export default News


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




