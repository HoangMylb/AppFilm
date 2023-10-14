import { StyleSheet, SafeAreaView, Text, View, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import movieList from '../data/movieItem';

const FavouriteMovie = () => {
    const [movie, setMovie] = useState(movieList);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconBack}>
                    <Text style={{ marginTop: '20%', marginLeft: '20%',color:'white' }}>Icon</Text>
                </View>
                <Text style={{ lineHeight: 40, fontWeight: '700' }}>Yêu Thích</Text>
                <Text style={{ width: 44, }}></Text>
            </View>

           
                <FlatList
                style={{marginHorizontal:10}}
                    numColumns={3}
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

            <View style={{ width: 114, height: 197, backgroundColor: 'black', marginTop: 20, marginLeft: 7, borderRadius: 12 }}>
                <Image style={{ width: '100%', height: '90%', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} src={item.url}></Image>

                <Text style={{ marginLeft: '10%', width: 18, height: 18, color: 'pink' }}>❤</Text>
            </View>
        </View>
    );
};

