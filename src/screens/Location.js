import React, { useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'

import locationList from '../data/locationItem';

const Location = ( props ) => {
    //data rạp 
    const {navigation} = props;
    const [location, setLocation] = useState(locationList);

    const renderItem = ({ item }) => {
       
        const { url,title, address, phone,id } = item;
        return (
            <View style={{marginTop: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        style={{ width: 100, height: 95, resizeMode: 'cover', }}
                        source={{ uri: url }}
                    />
                    <View style={{ padding: 5}}>
                        <Text
                            style={{  color: 'black',  fontSize: 24 }}> {title}
                        </Text>
                        <Text
                            style={{color: 'black', fontSize: 16, marginTop: 10 }}>
                            {address}
                        </Text>
                        <Text
                            style={{color: 'black', fontSize: 16,marginTop: 10}}>
                            {phone}
                        </Text>
                    </View>
                </View>

                <View style={{ width: 400, height: 1, backgroundColor: 'black', marginTop: 10 }}></View>
            </View>

        )
    }

    return (
        <SafeAreaView style={styles.container}>
           
              
                    <FlatList
                        style={{ flex: 1 }}
                        data={location}
                        keyExtractor={(item) => item.id}
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
        backgroundColor: '#CF9B9B'
    },
    
})