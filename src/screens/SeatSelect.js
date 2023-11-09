import { StyleSheet, ToastAndroid, Text, View, SafeAreaView, Image, TouchableOpacity,Alert, FlatList, ScrollView } from 'react-native'
import { StyleSheet, ToastAndroid, Text, View,Alert, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import viLocale from 'date-fns/locale/vi';
import { format } from 'date-fns';
import { ThanhToanContext } from '../context/ThanhToanContext'
import { useStripe } from '@stripe/stripe-react-native';
import { PhimContext } from '../context/PhimContext';
const SeatSelect = ({ navigation }) => {
    const route = useRoute();
    const { ThanhToan, newDonHang } = useContext(ThanhToanContext);
    const { getSeat, updateSeat } = useContext(PhimContext);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const item = route.params.item;
    const item1 = route.params.item1;
    const idUser = route.params.idUser;
    const ngay = route.params.ngay;
    const thang = route.params.thang;
    const nam = route.params.nam;
    const gio = route.params.gio;
    const thangSeat = route.params.thangSeat;

    const [tongTien, setTongTien] = useState(0)
    const [dataSeat, setdataSeat] = useState([]);
    const [numColumns, setNumColumns] = useState(6);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalSeats, setTotalSeats] = useState(0);
    const [idPhong, setidPhong] = useState('')
    const [ArrayGhe, setArrayGhe] = useState('')
    
    let idGheArray;
    useEffect(() => {
        const seat = async () => {
            const a = await getSeat(item._id, item1._id,thangSeat, gio);
            setdataSeat(a[0].ghe);
            setidPhong(a[0]._id)
        };
        seat();
    }, []);
    const updateSeated = async () => {
        const ghe = selectedSeats.map((seat) => seat._id);
   
        await updateSeat(idPhong, ghe,item._id, item1._id,thangSeat,gio);
    }
    const selectSeat = (index) => {
        const updatedDataSeat = [...dataSeat];
        const selectedSeat = updatedDataSeat[index];

        if (selectedSeat.empty === false && selectedSeat.selected === false) {
            // Ghế đã được đặt trước, hiển thị thông báo
            Alert.alert('Ghế này đã được người khác đặt');
        } else {
            // Cho phép thay đổi giá trị của ghế
            selectedSeat.selected = !selectedSeat.selected;
            selectedSeat.empty = !selectedSeat.empty;

            if (selectedSeat.selected) {
                setSelectedSeats([...selectedSeats, selectedSeat]);
                setTotalSeats(totalSeats + 1);
            } else {
                const deselectedSeat = selectedSeat;
                setSelectedSeats(selectedSeats.filter((seat) => seat._id !== deselectedSeat._id));
                setTotalSeats(totalSeats - 1);
            }
        }

        setdataSeat(updatedDataSeat);
    };
    useEffect(() => {
        let tenGheArray = selectedSeats.map((seat) => seat.tenGhe);
        idGheArray = selectedSeats.map((seat) => seat._id);
        setArrayGhe(tenGheArray.join(', '))
        console.log('Tên các ghế đã chọn: ' + tenGheArray.join(', '));
        console.log('Id các ghế đã chọn: ' + idGheArray);
        console.log('Id phong: ' + idPhong);


    }, [selectedSeats, dataSeat])
    //
    const [formattedNumber, setFormattedNumber] = useState();
    const tien = () => {
        const a = 100000;
        let b = totalSeats * a;
        setTongTien(b);
    }
    useEffect(() => {
        tien();
    }, [totalSeats])
    useEffect(() => {
        const formattedNumber = tongTien.toLocaleString('vi-VN');
        setFormattedNumber(formattedNumber)
    }, [tongTien])

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
    const navigateToPayLosing = (user, phim, rapPhim, ngay, xuatChieu, ghe, soLuong, tien, idPhong, idGhe) => {
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
                idPhong: idPhong,
                idGhe: idGhe

            })
        );
    };
    const donHang = async (user, phim, rapPhim, ngayDat, xuatChieu, ghe, soLuong, tien) => {
        const a = await newDonHang(user, phim, rapPhim, ngayDat, xuatChieu, ghe, soLuong, tien)
        if (a.success) {

            ToastAndroid.show("Thanh toán thành công", 1)
        } else {
            ToastAndroid.show("Thanh toán thất bại", 1)

        }
    }
    const thanhToan = async () => {
        if (totalSeats <= 0) {
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
                navigateToPayLosing(idUser, item._id, item1._id, ngayDat, gio + " - " + ngay + "/" + thang + "/" + nam, ArrayGhe, totalSeats, tongTien, idPhong, selectedSeats)
                ToastAndroid.show("Thanh toán thất bại", 1)
            } else {
                updateSeated();
                const now = new Date();
                const ngayDat = format(now, 'p PP', { locale: viLocale });
                donHang(idUser, item._id, item1._id, ngayDat, gio + " - " + ngay + "/" + thang + "/" + nam, ArrayGhe, totalSeats, tongTien)
                
                navigateToPaySuccess(formattedNumber, ngayDat)

            }
        }
    };
    return (
        <ScrollView>
            <LinearGradient
                colors={['rgba(14, 14, 14, 0.50)', 'rgba(53, 36, 11, 0.22)', 'rgba(14, 14, 14, 0.50)']}
                start={{ x: 0.0, y: 0.5 }}
                end={{ x: 1.0, y: 0.5 }}
                style={styles.container}
            >

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
                <View style={{ height: 350, position: 'relative' }}>
                    <Image style={{ width: 25, height: 290, position: 'absolute', resizeMode: 'contain', top: '11%',left: '-1%' }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Infomation%2FA%E2%80%A8%E2%80%A8B%E2%80%A8%E2%80%A8C%E2%80%A8%E2%80%A8D%E2%80%A8%E2%80%A8E%E2%80%A8%E2%80%A8F%E2%80%A8%E2%80%A8G%E2%80%A8%E2%80%A8H.png?alt=media&token=d83fa922-d332-435e-acdf-e16701eefd8f&_gl=1*qky73y*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODUwNzU3NC40MS4xLjE2OTg1MDc5NTQuOC4wLjA.' }}
                    />
                    <ScrollView horizontal={true} style={{alignSelf: 'center'}}>
                    <FlatList
                        style={{ alignSelf: 'center', marginTop: 20, }}
                        numColumns={numColumns}
                        data={dataSeat}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={{ margin: 10 }} onPress={() => selectSeat(index)}>
                                    {item.empty === false && item.selected === true ? (
                                        <Image
                                            style={{ width: 30, height: 20 }}
                                            source={{
                                                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/seat%2FSeatNau.png?alt=media&token=e34478a0-bf3b-4a43-8893-678f853fad9a&_gl=1*1rpr441*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5OTIwMzQxNS41MC4xLjE2OTkyMDQzNzMuNDYuMC4w'
                                            }}
                                        />
                                    ) : item.empty === true && item.selected === false ? (
                                        <Image
                                            style={{ width: 30, height: 20 }}
                                            source={{
                                                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/seat%2FSeatTrang.png?alt=media&token=e98202e7-c62a-4c4b-a784-6ce0f9fe1924&_gl=1*1f0osq1*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5OTIwMzQxNS41MC4xLjE2OTkyMDQzNzcuNDIuMC4w'
                                            }}
                                        />
                                    ) : item.empty === false && item.selected === false ? (
                                        <Image
                                            style={{ width: 30, height: 20 }}
                                            source={{
                                                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/seat%2FSeatDo.png?alt=media&token=dce8ad62-e9f1-442b-8517-037f6082fb3d&_gl=1*1p3qclr*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5OTE5OTM1My40OS4wLjE2OTkxOTkzNTMuNjAuMC4w'
                                            }}
                                        />
                                    ) : null}
                                </TouchableOpacity>
                            );
                        }}
                    />
                    </ScrollView>
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
                    <Text style={styles.txttime}>  {ArrayGhe}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 12 }}>
                    <Image style={{ width: 25, height: 16 }}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/FavouriteMovie%2FVector%20(2).png?alt=media&token=a2a1062c-3e9e-4f8a-a9c6-08f8dfef59bb&_gl=1*1n70prd*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5ODUwNTQxMy40MC4xLjE2OTg1MDU2NzcuNTYuMC4w' }}
                    />{tongTien ? (<Text style={styles.txttime}>{formattedNumber}đ</Text>) : (<Text style={styles.txttime}></Text>)}

                </View>
                <TouchableOpacity onPress={thanhToan} style={{ width: 250, height: 40, borderRadius: 10, backgroundColor: "#E38025", alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Text style={styles.txtdatngay}>Thanh toán</Text>
                </TouchableOpacity>

               
            </LinearGradient>
            </ScrollView>

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
