import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React,{ useContext, useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { ThanhToanContext } from '../context/ThanhToanContext';
const DetailNotification = ({ navigation }) => {
    const route = useRoute();
    const { LayUser,LayPhim,LayRap } = useContext(ThanhToanContext);
    const item = route.params.item;
    const [phim, setPhim] = useState('');
    const [rap, setRap] = useState('');
    const [user, setUser] = useState('');
    const getPhim= async (_id) => {
        const b = await LayPhim(_id);
        if (b.success) {
            
             setPhim( b.message);
            
            // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
           
        }
    }
    const getRap= async (_id) => {
        const c = await LayRap(_id);
        if (c.success) {
             setRap(c.message);
          
            // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
           
        }
    }
    const getUser= async (_id) => {
        const c = await LayUser(_id);
        if (c.success) {
            setUser(c.message);
            
            // Đã cập nhật giá trị của movie, bạn có thể log nó ở đây
           
        }
    }
    useEffect(() => {
        getUser(item.user);
        getPhim(item.phim);
        getRap(item.rapPhim);
    }, [item])
    
    const nextTo = () => {
        navigation.dispatch(StackActions.replace('ThongBao'));
    };
    return (
        <View style={styles.container}>
            {item? (<ScrollView  >
                <View style={{ width: 180, margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={nextTo}>
                        <Image
                            style={{ width: 44, height: 44 }}
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 20, marginTop: 10, fontWeight: '700' }}>Hóa đơn</Text>
                </View>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Đặt phim: </Text>
                <View style={{ backgroundColor: "#222222", marginTop: 5 }}>

                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                        {phim.poster?( <Image
                            source={{ uri: phim.poster  }}
                            style={{ width: 80, height: 100, alignSelf: 'center', marginBottom: 5 }}
                        />):(<Text style={{ color: 'white', fontSize: 16, }}> Đang tải ...</Text>)}
                       
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 215, marginLeft: 5, marginTop: 5 }}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Phim: </Text>
                                <Text style={{ color: 'white', fontSize: 16, }}> {phim.tenPhim}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 215, marginLeft: 5, marginTop: 10 }}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Thể loại: </Text>
                                <Text style={{ color: 'white', fontSize: 16, }}> {phim.theLoaiPhim}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 215, marginLeft: 5, marginTop: 10 }}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Thời lượng phim: </Text>
                                <Text style={{ color: 'white', fontSize: 16, }}> {phim.thoiLuongPhim}</Text>
                            </View>

                        </View>
                    </View>
                </View>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Xem tại rạp: </Text>
                <View style={{ backgroundColor: "#222222", marginTop: 5 }}>

                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                    { rap.hinh?( <Image
                            source={{ uri:  rap.hinh}}
                            style={{ width: 80, height: 100, alignSelf: 'center', marginBottom: 5 }}
                        />):(<Text style={{ color: 'white', fontSize: 16, }}> Đang tải ...</Text>)}
                       
                        <View style={{}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 215, marginLeft: 5, marginTop: 5 }}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Tên rạp: </Text>
                                <Text style={{ color: 'white', fontSize: 16, }}> {rap.tenRapPhim}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 200, marginLeft: 5, marginTop: 10 }}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Địa chỉ: </Text>
                                <Text style={{ color: 'white', fontSize: 16, }}> {rap.diaChi}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 215, marginLeft: 5, marginTop: 10 }}>
                                <Text style={{ color: 'white', fontSize: 16, }}>Hotline: </Text>
                                <Text style={{ color: 'white', fontSize: 16, }}> {rap.SDT}</Text>
                            </View>

                        </View>
                    </View>
                </View>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>Thông tin chi tiết: </Text>
                <View style={{ backgroundColor: "#222222", marginTop: 5 }}>

                    <View style={{ marginLeft: 10 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 290, marginLeft: 5, marginTop: 5 }}>
                            <Text style={{ color: 'white', fontSize: 16, }}>Người đặt: </Text>
                            <Text style={{ color: 'white', fontSize: 16, }}> {user.tenKhachHang}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 290, marginLeft: 5, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, }}>Ngày đặt: </Text>
                            <Text style={{ color: 'white', fontSize: 16, }}> {item.ngayDat}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 290, marginLeft: 5, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, }}>Phòng chiếu: </Text>
                            <Text style={{ color: 'white', fontSize: 16, }}>Cinema {item.phongChieu}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 290, marginLeft: 5, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, }}>Số lượng vé: </Text>
                            <Text style={{ color: 'white', fontSize: 16, }}> {item.soLuong}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 290, marginLeft: 5, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, }}>Ghế: </Text>
                            <Text style={{ color: 'white', fontSize: 16, }}> {item.ghe}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 290, marginLeft: 5, marginTop: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, }}>Xuất chiếu: </Text>
                            <Text style={{ color: 'white', fontSize: 16, }}> {item.xuatChieu}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 290, marginLeft: 5, marginTop: 10,marginBottom: 10 }}>
                            <Text style={{ color: 'white', fontSize: 16, }}>Thanh toán thành công: </Text>
                            <Text style={{ color: 'white', fontSize: 16, }}> {item.tien}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>):(<Text style={{ color: 'white', fontSize: 16, }}> Đang tải ...</Text>)}
            
        </View>
    )
}

export default DetailNotification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18191A',
    }
})