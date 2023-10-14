import { StyleSheet, SafeAreaView, Text, View, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import movieList from '../data/movieItem';

const News = () => {
    const [movie, setMovie] = useState(movieList);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconBack}>
                    <Text style={{ marginTop: '20%', marginLeft: '20%',color:'#000' }}>Icon</Text>
                </View>
                <Text style={{ lineHeight: 40, fontWeight: '700' }}>Tin Tức</Text>
                <Text style={{ width: 44, }}></Text>
            </View>
            <FlatList
                style={{marginHorizontal:10}}
                    numColumns={1}
                    data={movie}
                    keyExtractor={item => item.name}
                    renderItem={renderItem}
                />
           
                
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
        marginTop:'4%'
    },

    container: {
        display: 'flex',
        flex:1,
        backgroundColor: '#E5C4C4'
    },
})


const renderItem = ({ item }) => {

    return (
        <View
        >
            <View style={{ width: '90%', height: 255, backgroundColor: 'white', marginTop: 20, marginLeft: 20, borderRadius: 12 }}>
                <Image style={{ width: '100%', height: '70%',objectFit:'cover' }} source={{uri:item.url}}></Image>

                <Text style={{ marginTop:'2%', marginLeft: '2%', width: '96%', height: 30 }}>{item.name}</Text>

                <Text  style={{ marginLeft:'72%', width: '30%', height: 30,color:'red',fontWeight:'600' }}>Xem thêm  </Text>
            </View>
        </View>
    );
};

