import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'

import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { ThanhToanContext } from '../context/ThanhToanContext';

const Location = (props) => {
    const route = useRoute();
    const item = route.params.item;
    const idUser = route.params.idUser;
    const { getAllRapPhim } = useContext(ThanhToanContext);
    //data rạp 
    const [location, setLocation] = useState('');
    const { navigation } = props;
    const getAll = async () => {
        const a = await getAllRapPhim();
        if (a.success) {
            setLocation(a.message)
        }
    }
    useEffect(() => {
        getAll()

    }, [])
    const nextTo = async () => {
        navigation.navigate('BuyTickets', { item, idUser });
    };
    const navigateToTimeSelect = (item, idUser,item1) => {
        navigation.dispatch(
          StackActions.replace('TimeSelect', {
            item: item,
            idUser: idUser,
            item1: item1,
          })
        );
      };
    const nextToo = async (item1) => {
        navigateToTimeSelect(item, idUser,item1)
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={nextTo}>
                    <Image
                        style={{ width: 44, height: 44 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: '700', color: 'white', marginTop: 10, marginLeft: '25%' }}>Rạp phim</Text>
            </View>
            <FlatList
                style={{ flex: 1 }}
                data={location}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={{ marginTop: 10 }}>

                    <TouchableOpacity onPress={() => nextToo(item)}>
                        <View style={{ flexDirection: 'row' }}>
                            {item.hinh ? ( // Check if hinhAnh is not empty
                                <Image
                                    style={{ width: 100, height: 95, resizeMode: 'cover', borderRadius: 10 }}
                                    source={{ uri: item.hinh }}
                                />
                            ) : (
                                // Handle the case when hinhAnh is empty
                                <Text style={{ color: 'white' }}>Đang tải</Text>
                            )}
    
                            <View style={{ marginLeft: 5 }}>
                                <Text
                                    style={{ color: 'white', fontSize: 18 }}> {item.tenRapPhim}
                                </Text>
                                <Text
                                    style={{ color: 'white', fontSize: 16, marginTop: 10, width: 180 }}>
                                    {item.diaChi}
                                </Text>
                                <Text
                                    style={{ color: 'white', fontSize: 16, marginTop: 10 }}>
                                    {item.SDT}
                                </Text>
                            </View>
                        </View>
    
    
                    </TouchableOpacity>
                    <View style={{ width: 400, height: 1, backgroundColor: 'white', marginTop: 10 }}></View>
                </View>
                )}
            />


        </SafeAreaView>
    )
};

export default Location


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#18191A'
    },

})

