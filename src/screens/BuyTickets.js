import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BuyTickets = ({ navigation }) => {

    return (
        <ScrollView  style={styles.container}>
            <View >
                <Image
                    style={{ width: 393, height: 480, alignSelf:'center', borderRadius: 58, resizeMode: 'cover' }}
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/image%2024.png?alt=media&token=49bf405b-6196-401b-8ade-11cad69f9111&_gl=1*1cbcdgd*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjE0NjY0My4zLjEuMTY5NjE0NzM5Ni4zOC4wLjA.'
                    }}
                />

                <View style={styles.boder}>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 40 }}>
                        <Image
                            style={{ width: 130, height: 20, marginTop: 4 }}
                            source={{
                                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/start3.png?alt=media&token=976ee840-069c-4348-8859-20bdcae601c1&_gl=1*1x7bit4*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjE0NjY0My4zLjEuMTY5NjE0ODI2OC40MS4wLjA.'
                            }}
                        />



                        <Text style={{ color: '#FF8718', fontSize: 20, fontWeight: '500', marginLeft: 15 }}> 3.0 </Text>
                    </View>

                    <View style={{ position: 'relative' }}>
                        <Text style={{ fontWeight: 500, fontSize: 24, color: '#000000', marginLeft: 35 }} > Tiệc Trăng Máu </Text>
                        <Image
                            style={{ width: 20, height: 20, top: 10, left: 330, position: 'absolute' }}
                            source={{
                                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/BuyTickets%2Ficonlove.png?alt=media&token=66b275d2-89e7-4791-936d-8d15715da0ec&_gl=1*jcu963*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5Njk1MzgwOC4xMC4xLjE2OTY5NTM4NzAuNjAuMC4w'
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 10, }}>
                        <Text style={{ fontWeight: '500', fontSize: 14, marginLeft: 35, }} > Tâm lí / Hài đen </Text>
                        <Text style={{ width: 300, fontWeight: '500', fontSize: 10, marginLeft: 40, marginTop: 10, }} > Trong buổi họp mặt của nhóm bạn thân, một thành viên bất ngờ đề xuất trò chơi chia sẻ điện thoại nhằm tăng tinh thần “đoàn kết”. Bảy người, với 7 chiếc điện thoại chính là “hộp paroda” của họ và những cuộc gọi, những tin nhắn đến giống như bóc từng lớp mặt nạ, lột trần từng bí mật của mỗi người. </Text>
                        <Text style={{ fontWeight: '500', fontSize: 24, height: 27, color: '#000000', marginLeft: 35, }}> Diễn Viên </Text>
                    </View>


                    <View  >
                        <ScrollView style={{ width: 300, height: 70, marginLeft: 30, marginTop: 10, }} horizontal={true}>
                            <Image
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20676.png?alt=media&token=6679433e-175b-4314-8312-3f47b16f892f&_gl=1*an4frc*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM1MjkyNi42LjEuMTY5NjM1MjkzMS41NS4wLjA." }} style={styles.imgdv}
                            />
                            <Image
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20678.png?alt=media&token=a108ecc1-d8ba-43d5-9fec-5d040b5fef29&_gl=1*lxu7n0*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM0NzUxMi41LjEuMTY5NjM0OTk0OS41Mi4wLjA." }} style={styles.imgdv}
                            />
                            <Image
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20679.png?alt=media&token=64957707-4db5-490a-871f-a673ded59f73&_gl=1*oyvtk3*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM0NzUxMi41LjEuMTY5NjM0OTk1NC40Ny4wLjA." }} style={styles.imgdv}
                            />
                            <Image
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20680.png?alt=media&token=87d5f541-4df8-4adf-863b-dd841fa0a393&_gl=1*lbjc33*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM0NzUxMi41LjEuMTY5NjM0OTk1OC40My4wLjA." }} style={styles.imgdv}
                            />

                            <Image
                                source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20680.png?alt=media&token=87d5f541-4df8-4adf-863b-dd841fa0a393&_gl=1*lbjc33*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM0NzUxMi41LjEuMTY5NjM0OTk1OC40My4wLjA." }} style={styles.imgdv}
                            />

                        </ScrollView>
                    </View>

                    <TouchableOpacity style={{ width: 300, height: 50, backgroundColor: '#D65555', borderRadius: 10, padding: 12, alignItems: 'center', alignSelf: 'center' }} onPress={() => {
                        navigation.navigate('Location');
                    }}
                    >
                        <Text style={{ height: 26, fontWeight: "500", fontSize: 22, color: '#FFFFFF', }}>Mua vé</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    )
}

export default BuyTickets

const styles = StyleSheet.create({
    imgdv: {
        width: 63, height: 62, marginLeft: 10
    },
    boder: {
        backgroundColor: 'white',
        width: 393,
        height: 337,
        borderRadius: 58,
        alignSelf: 'center'
    },
    container: {
        flex: 1,
       
        backgroundColor: 'black',
    }
})