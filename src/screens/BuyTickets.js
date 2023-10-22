import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BuyTickets = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 393, height: 480 }}
                source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/image%2024.png?alt=media&token=49bf405b-6196-401b-8ade-11cad69f9111&_gl=1*1cbcdgd*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjE0NjY0My4zLjEuMTY5NjE0NzM5Ni4zOC4wLjA.'
                }}
            />

            <View style={styles.boder}>
                <Image
                    style={{ width: 130, height: 20, top: 15, left: 40 }}
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/start3.png?alt=media&token=976ee840-069c-4348-8859-20bdcae601c1&_gl=1*1x7bit4*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjE0NjY0My4zLjEuMTY5NjE0ODI2OC40MS4wLjA.'
                    }}
                />



                <Text style={{ color: '#FF8718', fontSize: 20, left: 195, top: -9, fontWeight: 500 }}> 3.0 </Text>
                <Text style={{ fontWeight: 500, fontSize: 24, top: -4, left: 35, color: '#000000' }} > Tiệc Trăng Máu </Text>

                <Image
                    style={{ width: 20, height: 20, top: -29, left: 330 }}
                    source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/BuyTickets%2Ficonlove.png?alt=media&token=66b275d2-89e7-4791-936d-8d15715da0ec&_gl=1*jcu963*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5Njk1MzgwOC4xMC4xLjE2OTY5NTM4NzAuNjAuMC4w'
                    }}
                />

                <Text style={{ fontWeight: 500, fontSize: 14, top: -20, left: 39 }} > Tâm lí / Hài đen </Text>
                <Text style={{ width: 380, height: 75, lineHeight: 12, fontWeight: 500, fontSize: 10, top: -13, margin: 10 }} > Trong buổi họp mặt của nhóm bạn thân, một thành viên bất ngờ đề xuất trò chơi chia sẻ điện thoại nhằm tăng tinh thần “đoàn kết”. Bảy người, với 7 chiếc điện thoại chính là “hộp paroda” của họ và những cuộc gọi, những tin nhắn đến giống như bóc từng lớp mặt nạ, lột trần từng bí mật của mỗi người. </Text>
                <Text style={{ fontWeight: 500, fontSize: 24, width: 161, height: 27, color: '#000000', top: -40, left: 35 }}> Diễn Viên </Text>

                <View style={styles.imgdv} >
                    <ScrollView horizontal={true}>
                        <Image
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20676.png?alt=media&token=6679433e-175b-4314-8312-3f47b16f892f&_gl=1*an4frc*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM1MjkyNi42LjEuMTY5NjM1MjkzMS41NS4wLjA." }} style={{ width: 63, height: 62, left: 10 }}
                        />
                        <Image
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20678.png?alt=media&token=a108ecc1-d8ba-43d5-9fec-5d040b5fef29&_gl=1*lxu7n0*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM0NzUxMi41LjEuMTY5NjM0OTk0OS41Mi4wLjA." }} style={{ width: 63, height: 62, left: 20 }}
                        />
                        <Image
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20679.png?alt=media&token=64957707-4db5-490a-871f-a673ded59f73&_gl=1*oyvtk3*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM0NzUxMi41LjEuMTY5NjM0OTk1NC40Ny4wLjA." }} style={{ width: 63, height: 62, left: 30 }}
                        />
                        <Image
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Rectangle%20680.png?alt=media&token=87d5f541-4df8-4adf-863b-dd841fa0a393&_gl=1*lbjc33*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM0NzUxMi41LjEuMTY5NjM0OTk1OC40My4wLjA." }} style={{ width: 63, height: 62, left: 40 }}
                        />
                        <Image
                            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng.jpeg?alt=media&token=21879f18-078d-4e5b-8ca3-1ea10c2e3367&_gl=1*iobsam*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjM1NTIxNy43LjEuMTY5NjM1NTk2Mi41MS4wLjA." }} style={{ width: 63, height: 62, left: 50 }}
                        />
                    </ScrollView>
                </View>

                <TouchableOpacity style={{ width: 300, height: 50, backgroundColor: '#D65555', borderRadius: 10, padding: 12, left: 43, top: -13 }} onPress = {() => {
                        navigation.navigate('Location');
                    }} 
                
                >
                    <Text style={{ width: 300, height: 26, fontWeight: 500, fontSize: 22, color: '#FFFFFF', left: 102, top: -3 }}>Mua vé</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default BuyTickets

const styles = StyleSheet.create({
    imgdv:{
        top: -25,
        left: 33
    },
    boder: {
        backgroundColor: '#FFFFFF',
        width: 393,
        height: 337,
        top: -110,
        borderRadius: 58
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
})