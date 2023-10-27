import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

const DetailNews = ({navigation}) => {
    const route = useRoute();
    const item = route.params.item;
    const nextTo = () => {
        navigation.dispatch(StackActions.replace('TinTuc'));
    };
    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                <TouchableOpacity onPress={nextTo}>
                    <Image
                        style={{ width: 44, height: 44 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView  >

                <Image
                    source={{ uri: item.image }}
                    style={{ width: 320, height: 300, alignSelf: 'center', resizeMode: 'contain' }}
                />

                <Text style={{ color: 'white', fontSize: 20, marginLeft: 10 }}>{item.title}</Text>
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 10, marginTop: 20 }}>{item.chitiet}</Text>
            </ScrollView>
        </View>
    )
}

export default DetailNews

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#18191A',
    }
})