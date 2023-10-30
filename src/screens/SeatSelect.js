import { StyleSheet, ToastAndroid, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import viLocale from 'date-fns/locale/vi';
import { format } from 'date-fns';
import { ThanhToanContext } from '../context/ThanhToanContext'
import { useStripe } from '@stripe/stripe-react-native';

const SeatSelect = ({ navigation }) => {
    const route = useRoute();
    const { ThanhToan ,newDonHang} = useContext(ThanhToanContext);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const item = route.params.item;
    const item1 = route.params.item1;
    const idUser = route.params.idUser;
    const ngay = route.params.ngay;
    const thang = route.params.thang;
    const nam = route.params.nam;
    const gio = route.params.gio;
    const [tongTien, setTongTien] = useState(0)
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
   
    const [formattedNumber, setFormattedNumber] = useState();
    const tien = () => {
        const a = 100000;
        let b = selectedGhe.length * a;
        setTongTien(b);
    }
    useEffect(() => {
        tien();
    }, [selectedGhe.length])
    useEffect(() => {
        const formattedNumber = tongTien.toLocaleString('vi-VN');
        setFormattedNumber(formattedNumber)
    }, [tongTien])
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
    const nextTo = async () => {
        navigation.navigate('TimeSelect', { item, idUser, item1 });
    };
    const navigateToPaySuccess = (tien, ngay) => {
        navigation.dispatch(
          StackActions.replace('PaySuccess', {
            tien: tien,
            ngay: ngay,
          })
        );
      };
      const navigateToPayLosing = (user, phim,rapPhim, ngay,xuatChieu, ghe,  soLuong, tien) => {
        navigation.dispatch(
          StackActions.replace('PayLosing', {
            user: user,
            phim: phim,
            rapPhim: rapPhim,
            ngay: ngay,
            xuatChieu: xuatChieu,
            ghe: ghe,
            tien: tien,
            soLuong: soLuong,
            tien: tien,
           
          })
        );
      };
      const donHang= async (user, phim,rapPhim, ngayDat,xuatChieu, ghe,  soLuong, tien)=>{
            const a = await newDonHang(user, phim,rapPhim, ngayDat,xuatChieu, ghe,  soLuong, tien)
            if (a.success) {
                
                ToastAndroid.show("Thanh toán thành công",1)
            }else{
                ToastAndroid.show("Thanh toán thất bại",1)
                
            }
        }
    const thanhToan = async () => {
        if (selectedGhe.length <= 0) {
            ToastAndroid.show("Vui lòng chọn ghế", 1)
        } else {
            const a = await ThanhToan(tongTien);
            if (a.error) {
                Alert.alert('Something went wrong');
                return;
            }
            // 2. Initialize the Payment sheet
            const initResponse = await initPaymentSheet({
                merchantDisplayName: 'notJust.dev',
                paymentIntentClientSecret: a.paymentIntent,
            });
            if (initResponse.error) {
                console.log(initResponse.error);
                Alert.alert('Something went wrong');
                return;
            }
            // 3. Present the Payment Sheet from Stripe
            const paymentResponse = await presentPaymentSheet();

            if (paymentResponse.error) {
                const now = new Date();
                const ngayDat = format(now, 'p PP', { locale: viLocale });
                navigateToPayLosing(idUser,item._id,item1._id,ngayDat,gio+" - "+ngay+"/"+thang+"/"+nam,selectedGhe.map(ghe => ghe.name).join(', '),selectedGhe.length,tongTien)
                ToastAndroid.show("Thanh toán thất bại",1)
            } else {
                const now = new Date();
                const ngayDat = format(now, 'p PP', { locale: viLocale });
                donHang(idUser,item._id,item1._id,ngayDat,gio+" - "+ngay+"/"+thang+"/"+nam,selectedGhe.map(ghe => ghe.name).join(', '),selectedGhe.length,tongTien)
                navigateToPaySuccess(formattedNumber,ngayDat)
               
            }
        }
    };
    return (
        <LinearGradient
            colors={['rgba(14, 14, 14, 0.50)', 'rgba(53, 36, 11, 0.22)', 'rgba(14, 14, 14, 0.50)']}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1.0, y: 0.5 }}
            style={styles.container}
        >
            <ScrollView>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={nextTo}>
                        <Image style={styles.image}
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.txtchooseSeats}>Chọn ghế</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ color: 'white', fontSize: 8 }}>*Màn hình</Text>
                    <View style={{ width: 200, height: 1, backgroundColor: '#880000' }}></View>
                </View>
                <View style={{ height: 250, position: 'relative' }}>
                    <Image style={{ width: 25, height: 200, position: 'absolute', resizeMode: 'contain', top: 32 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Infomation%2FA%E2%80%A8%E2%80%A8B%E2%80%A8%E2%80%A8C%E2%80%A8%E2%80%A8D%E2%80%A8%E2%80%A8E%E2%80%A8%E2%80%A8F%E2%80%A8%E2%80%A8G%E2%80%A8%E2%80%A8H.png?alt=media&token=d83fa922-d332-435e-acdf-e16701eefd8f&_gl=1*qky73y*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODUwNzU3NC40MS4xLjE2OTg1MDc5NTQuOC4wLjA.' }}
                    />
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

                <View style={{ width: 341, tintColor: "white", height: 1, backgroundColor: 'white' }}>

                </View>
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
                    <Image style={{ width: 20, height: 20 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FavouriteMovie%2FVector.png?alt=media&token=98c12e1c-3f11-4c84-96f2-1bd65ae32dd5&_gl=1*z2vuxg*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODUwNTQxMy40MC4xLjE2OTg1MDU3MTAuMjMuMC4w' }}
                    />
                    <Text style={styles.txttime}>{ngay} {thang}, {nam}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 12 }}>
                    <Image style={{ width: 20, height: 25 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FavouriteMovie%2FVector%20(1).png?alt=media&token=3ca4c5de-9029-4b3e-8006-9e7a3348558d&_gl=1*1i10eks*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODUwNTQxMy40MC4xLjE2OTg1MDU0MzIuNDEuMC4w' }}
                    />
                    <Text style={styles.txttime}>{gio}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 12 }}>
                    <Image style={{ width: 25, height: 16 }}
                        source={require('../icon/seat.png')}
                    />
                    <Text style={styles.txttime}> {selectedGhe.map((ghe) => ghe.name).join(', ')}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 12 }}>
                    <Image style={{ width: 25, height: 16 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FavouriteMovie%2FVector%20(2).png?alt=media&token=a2a1062c-3e9e-4f8a-a9c6-08f8dfef59bb&_gl=1*1n70prd*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODUwNTQxMy40MC4xLjE2OTg1MDU2NzcuNTYuMC4w' }}
                    />{tongTien ? (<Text style={styles.txttime}>{formattedNumber}đ</Text>) : (<Text style={styles.txttime}></Text>)}

                </View>
                <TouchableOpacity onPress={thanhToan} style={{ width: 250, height: 40, borderRadius: 10, backgroundColor: "#E38025", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Text style={styles.txtdatngay}>Thanh toán</Text>
                </TouchableOpacity>

            </ScrollView>
        </LinearGradient>

    )
}

export default SeatSelect

const styles = StyleSheet.create({
    txtdatngay: {
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
