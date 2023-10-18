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
            <ScrollView>
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