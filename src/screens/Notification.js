import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView
} from 'react-native'
import React, { useState } from 'react'
import notificationList from '../data/notificationItem';

const Notification = () => {
    const [notification, setNotification] = useState(notificationList);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.imageIcon} source={{ uri: item.image }}></Image>
                </View>
                <View style={{ marginLeft: 21 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.content}>{item.content}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={{ backgroundColor: '#18191A', flex: 1 }}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Image style={{ width: 44, height: 44, borderRadius: 50, marginVertical: 20 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Infomation%2FArrow%20Left%20Button.png?alt=media&token=2d5c781c-a330-4755-b2f8-0bc38dd0bf77&_gl=1*kv2sxo*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5NzQ2MzQ0Ny4yLjEuMTY5NzQ2NjMxNS42MC4wLjA.' }} />
                    <Text style={styles.label}>Thông báo </Text>
                    <Text></Text>
                    <Text></Text>
                </View>
                <FlatList
                    data={notification}
                    keyExtractor={item => item.title}
                    renderItem={renderItem}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Notification

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },

    label: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.2,
        marginVertical: 29
        
    },

    time: {
        color: '#C54E4E',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 7,
        marginBottom: 19
    },

    content: {
        width: 300,
        height: 40,
        fontSize: 14,
        fontWeight: '700',
        marginTop: 14,
        color: '#FFF'
    },

    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF'
    },

    imageIcon: {
        width: 35,
        height: 35,
        backgroundColor: '#ccc',
        borderRadius: 50
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        width: '93%',
        height: '20%',
        marginHorizontal: 14,
        borderBottomWidth: 1,
        marginTop: 46,
        borderStyle: 'solid',
        borderColor: '#FFF'
    }
})