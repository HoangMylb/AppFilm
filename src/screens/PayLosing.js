import {
    StyleSheet, Text, View,
    SafeAreaView, ScrollView,
    TouchableOpacity, ToastAndroid,Image
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { ThanhToanContext } from '../context/ThanhToanContext'
import { useStripe } from '@stripe/stripe-react-native';
import { PhimContext } from '../context/PhimContext';
import { UserContext } from '../context/UserContext';
const PayLosing = ({navigation}) => {
    const route = useRoute();
    const { ThanhToan,newDonHang } = useContext(ThanhToanContext);
    const { getSeat, updateSeat } = useContext(PhimContext);
    const { getId,sendOTP } = useContext(UserContext);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const user = route.params.user;
    const phim = route.params.phim;
    const rapPhim = route.params.rapPhim;
    const ngayDat = route.params.ngayDat;
    const xuatChieu = route.params.xuatChieu;
    const ghe = route.params.ghe;
    const soLuong = route.params.soLuong;
    const phongChieu = route.params.phongChieu;
    const tien = route.params.tien;
    const idPhong = route.params.idPhong;
    const idGhe = route.params.idGhe;
    const gio = route.params.gio;
    const thangSeat = route.params.thangSeat;
    const tenUser = route.params.tenUser;
    const formattedNumber = tien.toLocaleString('vi-VN');
   

    const [email, setEmail] = useState('')
    const trangThai = "lịch sử";

    useEffect(() => {
        
        const getEmail =async () =>{
            const a = await getId(user);
            setEmail(a.message.userName);
        }
        getEmail()
    }, []);
    const handleSendHistory = async () => {      
    await sendOTP(email,trangThai);
      }

    const nextTo = async () => {
        navigation.dispatch(StackActions.replace('Home'));
      };
      const donHang= async (user, phim,rapPhim, ngayDat,xuatChieu, ghe,  soLuong,phongChieu, tien)=>{
        const a = await newDonHang(user, phim,rapPhim, ngayDat,xuatChieu, ghe,  soLuong, phongChieu,tien)
        if (a.success) {
            
            ToastAndroid.show("Thanh toán thành công",1)
        }else{
            ToastAndroid.show("Thanh toán thất bại",1)
            
        }
    }
    const navigateToPaySuccess = (tien, ngay) => {
        navigation.dispatch(
          StackActions.replace('PaySuccess', {
            tien: tien,
            ngay: ngay,
          })
        );
      };
      const updateSeated = async () => {
        const ghe = idGhe.map((seat) => seat._id)
        await updateSeat(idPhong,ghe ,phim, rapPhim,thangSeat,gio);
    }
      const thanhToan = async () => {
            const a = await ThanhToan(tien);
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
                ToastAndroid.show("Thanh toán thất bại",1)
            } else {
                updateSeated();
               
                const now = new Date();
                const ngayDat = format(now, 'p PP', { locale: viLocale });
                handleSendHistory(email,trangThai,tenUser,ngayDat,phongChieu,soLuong,ghe,xuatChieu,tien);
                donHang(user, phim,rapPhim, ngayDat,xuatChieu, ghe,  soLuong,phongChieu, tien)
                
                navigateToPaySuccess(formattedNumber,ngayDat)
               
            }
        
    };
    return (
        <SafeAreaView style={styles.savContainer}>
            <ScrollView>
            <View style={styles.headerContainer}>
                    <View
                        style={styles.congratsImg}>
                    </View>
                </View>
                <View style={styles.articleContainer}>
                    <Image
                        style={styles.articleImg}
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PaySuccess%2FContent.png?alt=media&token=993fe712-8135-4cda-b646-ce73a361e53e&_gl=1*6y7f21*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzk2MzQ1Ny41LjEuMTY5Nzk2NDMyNC41NC4wLjA.' }}>
                    </Image>
                    <View style={styles.contentContainer}>
                        <Image
                            style={styles.successImg}
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/PayLosing%2FLosing.png?alt=media&token=b2597b31-08a9-42f4-9edc-52a85eb65568&_gl=1*bwlamy*_ga*MzE0OTk3MTQxLjE2OTcyNzI0ODQ.*_ga_CW55HF8NVT*MTY5Nzk3MTM2MS43LjEuMTY5Nzk3MTQwNy4xNC4wLjA.' }}>
                        </Image>
                        <Text style={styles.successLabel}>Thất bại !</Text>
                        <Text style={styles.paymentSuccessLabel}>Bạn chưa thanh toán thất bại cho CinematicVoyage</Text>
                        <Text style={styles.totalPaymentLabel}>Tổng thanh toán</Text>
                        <Text style={styles.priceLabel}>{formattedNumber}đ</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                    
                        <TouchableOpacity onPress={thanhToan} style={styles.doneButton}>
                            <Text style={styles.doneLabel}>Thanh toán lại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={nextTo} style={styles.doneButton}>
                            <Text style={styles.doneLabel}>Trở về</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PayLosing

const styles = StyleSheet.create({
    doneLabel: {
        color: '#D9D9D9',
        fontSize: 13,
        fontWeight: '600'
    },

    doneButton: {
        marginTop: 15,
        height: 32,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E38025',
        borderRadius: 10,
        marginHorizontal: 25,
    },

    timeLabel: {
        position: 'absolute',
        color: '#976504',
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 15.4,
        letterSpacing: -0.11,
        right: 5
    },

    paymentLabel: {
        color: '#976504',
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 15.4,
        letterSpacing: -0.11
    },

    CVLabel: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
       alignSelf:'center'
    },

    CVImg: {
        width: 49,
        height: 50,
        top: 8
    },

    bottomContent: {
        width: '100%',
        height: 65,
        backgroundColor: '#C0C0C0',
        marginTop: 3,
        borderRadius: 10,
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },

    paymentFor: {
        color: '#62656A',
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18.2,
        letterSpacing: -0.13,
        marginLeft: 10
    },

    bottomContainer: {
        width: '60%',
        height: 100,
        position: 'absolute',
        top: '73.5%',
    },

    priceLabel: {
        color: '#000',
        fontSize: 36,
        fontWeight: '500',
        letterSpacing: 0.54,
        marginTop: 3,
        marginBottom: 100
    },

    totalPaymentLabel: {
        color: '#62656A',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.12,
        marginTop: 17
    },

    paymentSuccessLabel: {
        color: '#62656A',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16.8,
        letterSpacing: -0.12,
        marginTop: 3,
        textAlign: 'center'
    },

    successLabel: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600',
        marginTop: 24
    },

    successImg: {
        width: 100,
        height: 100,
        borderRadius: 50,
    
    },

    contentContainer: {
        width: '60%',
        position: 'absolute',
        alignItems: 'center',
    },

    articleImg: {
        width: '95%',
        height: 520,
        marginHorizontal: 34,
        marginTop: -50,
        resizeMode: 'cover',
        position: 'relative'
    },

    articleContainer: {
        width: '100%',
        alignItems: 'center'
    },

    congratsImg: {
        width: '100%',
        height: 80,
        resizeMode: 'cover',
        backgroundColor: '#000000'
    },

    headerContainer: {
        width: '100%'
    },

    savContainer: {
        flex: 1,
        backgroundColor: '#0E0E0E'
    }
})