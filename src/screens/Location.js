import React, { useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'

import locationList from '../data/locationItem';

const Location = ({navigation}) => {
    //data rạp 
    const [location, setLocation] = useState(locationList);

    const renderItem = ({ item }) => {
        return (
            <View>
                <Image
                    style={{
                        width: 100,
                        height: 95,
                        resizeMode: 'cover',
                    }}
                    source={{ uri: item.url }}
                />
                <Text
                    style={{
                        color: 'black',
                        fontSize: 24,
                        top: -90,
                        left: 5,
                        textAlign: 'center',
                    }}>
                    {item.title}
                </Text>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 16,
                        left: 45,
                        top: -80,
                        textAlign: 'center',
                    }}>
                    {item.address}
                </Text>
                <Text
                    style={{
                        color: 'black',
                        fontSize: 16,
                        left: -30,
                        top: -70,
                        textAlign: 'center',
                    }}>
                    {item.phone}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '100%', height: '10%', backgroundColor: '#CF9B9B', }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }} >
                    <Image
                        style={{ width: 44, height: 44, top: 12 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button.png?alt=media&token=9fe7daf4-c5aa-4560-8c9f-f0e1ea5c95a8&_gl=1*1ycno8t*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjUyMzAxOC44LjEuMTY5NjUyMzExOS42MC4wLjA.' }}
                    />
                    <Text style={{ width: 86, height: 28, top: -25, left: 135, fontSize: 20, color: 'black,', fontWeight: 700 }}>Rạp phim</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ backgroundColor: '#CF9B9B' }}>
                <View style={styles.header}>
                    <FlatList
                        style={{}}
                        data={location}
                        keyExtractor={item => item.title}
                        renderItem={renderItem}
                    />
                </View>
                <Text style={{top: -10}}>______________________________________________________</Text>
                <View style={styles.header}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={location}
                        keyExtractor={item => item.title}
                        renderItem={renderItem}
                    />
                </View>
                <Text style={{top: -10}}>______________________________________________________</Text>
                <View style={styles.header}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={location}
                        keyExtractor={item => item.title}
                        renderItem={renderItem}
                    />
                </View>
                <Text style={{top: -10}}>______________________________________________________</Text>
                <View style={styles.header}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={location}
                        keyExtractor={item => item.title}
                        renderItem={renderItem}
                    />
                </View>
                <Text style={{top: -10}}>______________________________________________________</Text>
                <View style={styles.header}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={location}
                        keyExtractor={item => item.title}
                        renderItem={renderItem}
                    />
                </View>
                <Text style={{top: -10}}>______________________________________________________</Text>
                <View style={styles.header}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={location}
                        keyExtractor={item => item.title}
                        renderItem={renderItem}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default Location

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#CF9B9B'
    },
    header:{
        justifyContent: 'center',
        backgroundColor: '#CF9B9B',
        width: 399,
        height: 106,
    }
})