import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
const SeatSelect = () => {
    const [selectedGhe, setSelectedGhe] = useState([]);
    const [data, setData] = useState([
        { id: 1, image: require("../icon/seat.png"), selected: false, name: "A01" },
        { id: 2, image: require("../icon/seat.png"), selected: false, name: "A02" },
        { id: 3, image: require("../icon/seat.png"), selected: false, name: "A03" },
        { id: 4, image: require("../icon/seat.png"), selected: false, name: "A04" },
        { id: 5, image: require("../icon/seat.png"), selected: false, name: "A05" },
        { id: 6, image: require("../icon/seat.png"), selected: false, name: "A06" },
        { id: 7, image: require("../icon/seat.png"), selected: false, name: "B01" },
        { id: 8, image: require("../icon/seat.png"), selected: false, name: "B02" },
        { id: 9, image: require("../icon/seat.png"), selected: false, name: "B03" },
        { id: 10, image: require("../icon/seat.png"), selected: false, name: "B04" },
        { id: 11, image: require("../icon/seat.png"), selected: false, name: "B05" },
        { id: 12, image: require("../icon/seat.png"), selected: false, name: "B06" },
        { id: 13, image: require("../icon/seat.png"), selected: false, name: "C01" },
        { id: 14, image: require("../icon/seat.png"), selected: false, name: "C02" },
        { id: 15, image: require("../icon/seat.png"), selected: false, name: "C03" },
        { id: 16, image: require("../icon/seat.png"), selected: false, name: "C04" },
        { id: 17, image: require("../icon/seat.png"), selected: false, name: "C05" },
        { id: 18, image: require("../icon/seat.png"), selected: false, name: "C06" },
        { id: 19, image: require("../icon/seat.png"), selected: false, name: "D01" },
        { id: 20, image: require("../icon/seat.png"), selected: false, name: "D02" },
        { id: 21, image: require("../icon/seat.png"), selected: false, name: "D03" },
        { id: 22, image: require("../icon/seat.png"), selected: false, name: "D04" },
        { id: 23, image: require("../icon/seat.png"), selected: false, name: "D05" },
        { id: 24, image: require("../icon/seat.png"), selected: false, name: "D06" },
        { id: 25, image: require("../icon/seat.png"), selected: false, name: "E01" },
        { id: 26, image: require("../icon/seat.png"), selected: false, name: "E02" },
        { id: 27, image: require("../icon/seat.png"), selected: false, name: "E03" },
        { id: 28, image: require("../icon/seat.png"), selected: false, name: "E04" },
        { id: 29, image: require("../icon/seat.png"), selected: false, name: "E05" },
        { id: 30, image: require("../icon/seat.png"), selected: false, name: "E06" },
        { id: 31, image: require("../icon/seat.png"), selected: false, name: "F01" },
        { id: 32, image: require("../icon/seat.png"), selected: false, name: "F02" },
        { id: 33, image: require("../icon/seat.png"), selected: false, name: "F03" },
        { id: 34, image: require("../icon/seat.png"), selected: false, name: "F04" },
        { id: 35, image: require("../icon/seat.png"), selected: false, name: "F05" },
        { id: 36, image: require("../icon/seat.png"), selected: false, name: "F06" },
        { id: 37, image: require("../icon/seat.png"), selected: false, name: "G01" },
        { id: 38, image: require("../icon/seat.png"), selected: false, name: "G02" },
        { id: 39, image: require("../icon/seat.png"), selected: false, name: "G03" },
        { id: 40, image: require("../icon/seat.png"), selected: false, name: "G04" },
        { id: 41, image: require("../icon/seat.png"), selected: false, name: "G05" },
        { id: 42, image: require("../icon/seat.png"), selected: false, name: "G06" },
        { id: 43, image: require("../icon/seat.png"), selected: false, name: "H01" },
        { id: 44, image: require("../icon/seat.png"), selected: false, name: "H02" },
        { id: 45, image: require("../icon/seat.png"), selected: false, name: "H03" },
        { id: 46, image: require("../icon/seat.png"), selected: false, name: "H04" },
        { id: 47, image: require("../icon/seat.png"), selected: false, name: "H05" },
        { id: 48, image: require("../icon/seat.png"), selected: false, name: "H06" },
       
    ])
    const handleSeatPress = (id) => {
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
        let updatedSelectedGhe = [...selectedGhe];
        const selectedSeat = data.find((item) => item.id === id);

        if (selectedSeat) {
            // Đảm bảo rằng ghế chưa được chọn trước đó
            if (selectedSeat.selected) {
                // Nếu ghế đã được chọn trước đó, hủy chọn ghế này
                updatedSelectedGhe = updatedSelectedGhe.filter((ghe) => ghe.id !== id);
            } else {
                // Nếu ghế chưa được chọn trước đó, thêm ghế này vào danh sách các ghế đã chọn
                updatedSelectedGhe.push(selectedSeat);
            }
            // Cập nhật state với danh sách ghế đã chọn
            setSelectedGhe(updatedSelectedGhe);
        }
    }

    useEffect(() => {
        console.log("Danh sách ghế đã chọn:");
        selectedGhe.forEach((ghe) => {
            console.log(ghe.name);
        });
        console.log("Danh sách ghế đã hiện: "+selectedGhe.name);
    }, [selectedGhe]);
   

    const renderRow = (startId) => {
        return (
            <View style={styles.row}>
                {data.slice(startId, startId + 6).map(seat => (
                    <TouchableOpacity key={seat.id} onPress={() => handleSeatPress(seat.id)}>
                        <Image
                            style={{
                                width: 30,
                                height: 20,
                                margin: 4,
                                tintColor: seat.selected ? '#976504' : 'white'
                            }}
                            source={seat.image}
                        />

                    </TouchableOpacity>


                ))}

            </View>
        )
    }

    return (
        <LinearGradient
            colors={['rgba(14, 14, 14, 0.50)', 'rgba(53, 36, 11, 0.22)', 'rgba(14, 14, 14, 0.50)']}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1.0, y: 0.5 }}
            style={styles.container}
        >
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity>
                        <Image style={styles.image} source={require("../icon/back.png")} />
                    </TouchableOpacity>
                    <Text style={styles.txtchooseSeats}>Chọn ghế</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', marginBottom: 10, marginTop: 10}}>
                    <Text style={{color: 'white',fontSize: 8}}>*Màn hình</Text>
                    <View style={{width: 200, height: 1, backgroundColor: '#880000'}}></View>
                </View>
                <View style={{ height: 250}}>
                    <View>
                        <View style={{ width: 320, marginTop: 20, justifyContent: 'center' }}>
                            <View style={{}}>
                                {renderRow(0, 6)}
                                {renderRow(6, 12)}
                                {renderRow(12, 18)}
                                {renderRow(18, 24)}
                                {renderRow(24, 30)}
                                {renderRow(30, 36)}
                                {renderRow(36, 42)}
                                {renderRow(42, 48)}

                            </View>


                        </View>

                    </View>
                </View>
                <Image style={{ width: 341, tintColor: "white" }}
                    source={require("../icon/line11.png")}
                />
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', padding: 10 }}>
                    <View style={[styles.box, { backgroundColor: "#976504" }]}>
                    </View>
                    <Text style={styles.textcolor}>Đang chọn</Text>
                    <View style={[styles.box, { backgroundColor: "#FF1F11" }]}>
                    </View>
                    <Text style={styles.textcolor}>Đã đặt</Text>
                    <View style={[styles.box, { backgroundColor: "#FFFFFF" }]}>
                    </View>
                    <Text style={styles.textcolor}>Còn trống</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 12 }}>
                    <Image style={{ width: 33, height: 25 }}
                        source={require('../icon/time.png')}
                    />
                    <Text style={styles.txttime}>8 JUNE, 2023</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                    <Image style={{ width: 20, height: 25 }}
                        source={require('../icon/time.png')}
                    />
                    <Text style={styles.txttime}>4:00 PM</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 12 }}>
                    <Image style={{ width: 30, height: 22 }}
                        source={require('../icon/time.png')}
                    />
                    <Text style={styles.txttime}> {selectedGhe.map((ghe) => ghe.name).join(', ')}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 12 }}>
                    <Image style={{ width: 25, height: 16 }}
                        source={require('../icon/time.png')}
                    />
                    <Text style={styles.txttime}>Tổng cộng: 200.000đ</Text>
                </View>
                <TouchableOpacity style={{ width: 250, height: 40, borderRadius: 10, backgroundColor: "#E38025", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Text style={styles.txtdatngay}>Đặt ngay</Text>
                </TouchableOpacity>

            </ScrollView>
        </LinearGradient>

    )
}

export default SeatSelect

const styles = StyleSheet.create({
    txtdatngay: {
       
        alignItems: 'center',
        height: 34,
        fontSize: 20,
        fontWeight: '600',
        color: "#FFFFFF"


    },
    txttime: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: "400",
        lineHeight: 21,
        color: "#FFFFFF"

    },
    textcolor: {

        fontSize: 15,
        lineHeight: 21,
        fontWeight: "400",
        color: "#FFFFFF"
    },
    box: {
        width: 17,
        height: 18,

    },
    txtchooseSeats: {
        fontSize: 20,
        lineHeight: 28,
        alignItems: "center",
        fontWeight: '600',
        color: "#FFFFFF",
        marginLeft: '20%',
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#18191A",

    },
    image: {
        width: 44,
        height: 44,
        marginLeft: 25,
        marginTop: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
