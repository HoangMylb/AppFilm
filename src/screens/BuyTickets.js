import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { PhimContext } from '../context/PhimContext';
import Video from 'react-native-video';

const BuyTickets = ({ navigation }) => {
    const { newYeuThich,xoaYeuThich } = useContext(PhimContext);
    const [check, setCheck] = useState(0);
    const { getDienVien } = useContext(PhimContext);
    const [dataDienVien, setDataDienVien] = useState('')
    const route = useRoute();
    const item = route.params.item;
    const idUser = route.params.idUser;
    const isIcon = async () => {
        const newCheckValue = check + 1;
        setCheck(newCheckValue);
        if (newCheckValue===1) {
            await newYeuThich(idUser,item._id);
            ToastAndroid.show("Thêm yêu thích thành công", 1);
        }
        if (newCheckValue>=2) {
            setCheck(0);
            await xoaYeuThich(idUser,item._id);
            ToastAndroid.show("Xóa yêu thích thành công", 1);
        }
      };
    const dienVien = async () => {
        const a = await getDienVien(item.dienVien);
        if (a.success) {
            setDataDienVien(a.message)
        } else {
            console.log("Khong lay duoc DienVien: " + JSON.stringify(a.success));

        }

    };
    const nextTo = async () => {
        navigation.dispatch(StackActions.replace('Home'));
    };

    useEffect(() => {
        dienVien();
    }, []);

    return (
        <View style={styles.container}>
            {/* nút back */}

            <View style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
                <TouchableOpacity onPress={nextTo}>
                    <Image
                        style={{ width: 44, height: 44 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView  >
                <View >
                    <Video
                        source={{ uri: item.trailer }}
                        style={{ width: 320, height: 300, alignSelf: 'center' }}
                        controls={true}
                        poster={item.poster}
                    />

                    <View style={styles.boder}>
                        <View style={{ flexDirection: 'row', marginTop: 50, marginLeft: 40 }}>
                            <Image
                                style={{ width: 130, height: 20, marginTop: 4 }}
                                source={{
                                    uri: item.iconStart
                                }}
                            />
                        </View>

                        <View style={{ position: 'relative' }}>
                            <Text style={{ fontWeight: 500, fontSize: 24, color: '#000000', marginLeft: 35 }} > {item.tenPhim} </Text>
                            <TouchableOpacity onPress={isIcon}>
                                <Image
                                    style={{ width: 20, height: 20, top: -20, left: 330, position: 'absolute' }}
                                    source={{

                                        uri: check === 0 ? 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/BuyTickets%2Ficonlove.png?alt=media&token=66b275d2-89e7-4791-936d-8d15715da0ec&_gl=1*jcu963*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5Njk1MzgwOC4xMC4xLjE2OTY5NTM4NzAuNjAuMC4w'
                                            : 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FavouriteMovie%2Fimage%2013.png?alt=media&token=086dcd3c-ef65-4fe7-9842-aaf71cf05a69&_gl=1*lvndtu*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODA5OTY5NC4yNi4xLjE2OTgxMDMwMDIuNDUuMC4w'
                                    }}

                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{}}>
                            <Text style={{ fontWeight: '500', fontSize: 18, marginLeft: 35, }} > {item.theLoaiPhim} </Text>
                            <Text style={{ width: 300, fontWeight: '500', fontSize: 15, marginLeft: 40, marginTop: 10, }} > {item.noiDungPhim} </Text>
                            <Text style={{ fontWeight: '500', fontSize: 24, height: 27, color: '#000000', marginLeft: 35, }}> Diễn Viên </Text>
                        </View>


                        <View  >
                            <FlatList
                                style={{ marginLeft: 20, marginBottom: 10 }}
                                horizontal
                                data={dataDienVien}
                                keyExtractor={(item, index) => item._id + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
                                renderItem={({ item }) => (
                                    <View style={{ width: 90, height: 80, marginTop: 10, alignItems: 'center', borderRadius: 10, marginRight: 5 }} >
                                        <Image
                                            source={{ uri: item.hinhAnh }} style={styles.imgdv}
                                        />
                                        <Text style={{ fontWeight: "500" }}> {item.tenDienVien}</Text>
                                    </View>
                                )}
                            />

                        </View>

                        <TouchableOpacity style={{ width: 300, height: 50, backgroundColor: '#D65555', borderRadius: 10, padding: 12, alignItems: 'center', alignSelf: 'center', marginBottom: 10 }} onPress={() => {
                            navigation.navigate('Location');
                        }}
                        >
                            <Text style={{ height: 26, fontWeight: "500", fontSize: 22, color: '#FFFFFF', }}>Mua vé</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default BuyTickets

const styles = StyleSheet.create({
    imgdv: {
        width: 63, height: 62, marginLeft: 5
    },
    boder: {
        backgroundColor: 'white',
        width: 393,
        height: '100%',
        borderRadius: 58,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'black',
    }
})