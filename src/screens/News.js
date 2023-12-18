import { StyleSheet, SafeAreaView, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import LottieView from 'lottie-react-native';

import { TinTucContext } from '../context/TinTucContext';

const News = ({navigation }) => {
    const [movie, setMovie] = useState('');
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
                <Text style={{ lineHeight: 30, fontWeight: '700', color: 'white', fontSize: 20, alignItems:'center',justifyContent:'center' }}>Tin Tức </Text>
            </View>
            {loading ? ( // Kiểm tra nếu đang loading thì hiển thị thông báo hoặc spinner
                <View style = {{flex: 1,justifyContent:'center',alignItems:'center'}}>
                 <LottieView style = {{width:300,height:300}} source={require('../animation/animation.json')} autoPlay loop />
                </View>
            ) : (
                <FlatList

                    numColumns={1}
                    data={movie}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity  onPress={() => onPressItem(item)}>
                                <View style={{ width: '90%', height: 255, backgroundColor: '#222220', marginTop: 20, marginLeft: 20, borderRadius: 12 }}>
                                    {item.image ? (
                                        <Image style={{ width: '100%', height: 180, resizeMode: 'cover' }} source={{ uri: item.image }} />
                                    ) : (
                                        <Text style={{ color: 'white' }}>Đang tải</Text>
                                    )}
                                    <Text style={{ marginTop: '2%', marginLeft: '2%', width: '96%', fontSize: 17, color: 'white' }}>{item.title}</Text>

                                    <Text style={{ marginTop: 'auto', marginBottom: '2%', marginLeft: '75%', fontSize: 13, color: '#E38025', fontWeight: '600' }}>Xem thêm  </Text>

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




