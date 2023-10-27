import React, { useEffect, useState, useContext } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'



import { ThanhToanContext } from '../context/ThanhToanContext';

const Location = (props) => {
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


    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                style={{ flex: 1 }}
                data={location}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
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
const renderItem = ({ item }) => {
    return (

        <View style={{ marginTop: 10 }}>
            <TouchableOpacity>
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
                            style={{ color: 'white', fontSize: 20 }}> {item.tenRapPhim}
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

    )
}