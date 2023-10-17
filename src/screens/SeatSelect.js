import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'

const SeatSelect = () => {
    const [data, setData] = useState([
        { id: 1, image: require("../icon/seat.png"), selected: false },
        { id: 2, image: require("../icon/seat.png"), selected: false },
        { id: 3, image: require("../icon/seat.png"), selected: false },
        { id: 4, image: require("../icon/seat.png"), selected: false },
        { id: 5, image: require("../icon/seat.png"), selected: false },
        { id: 6, image: require("../icon/seat.png"), selected: false },
        { id: 7, image: require("../icon/seat.png"), selected: false },
        { id: 8, image: require("../icon/seat.png"), selected: false },
        { id: 9, image: require("../icon/seat.png"), selected: false },
        { id: 10, image: require("../icon/seat.png"), selected: false },
        { id: 11, image: require("../icon/seat.png"), selected: false },
        { id: 12, image: require("../icon/seat.png"), selected: false },
        { id: 13, image: require("../icon/seat.png"), selected: false },
        { id: 14, image: require("../icon/seat.png"), selected: false },
        { id: 15, image: require("../icon/seat.png"), selected: false },
        { id: 16, image: require("../icon/seat.png"), selected: false },
        { id: 17, image: require("../icon/seat.png"), selected: false },
        { id: 18, image: require("../icon/seat.png"), selected: false },
        { id: 19, image: require("../icon/seat.png"), selected: false },
        { id: 20, image: require("../icon/seat.png"), selected: false },
        { id: 21, image: require("../icon/seat.png"), selected: false },
        { id: 22, image: require("../icon/seat.png"), selected: false },
        { id: 23, image: require("../icon/seat.png"), selected: false },
        { id: 24, image: require("../icon/seat.png"), selected: false },
        { id: 25, image: require("../icon/seat.png"), selected: false },
        { id: 26, image: require("../icon/seat.png"), selected: false },
        { id: 27, image: require("../icon/seat.png"), selected: false },
        { id: 28, image: require("../icon/seat.png"), selected: false },
        { id: 29, image: require("../icon/seat.png"), selected: false },
        { id: 30, image: require("../icon/seat.png"), selected: false },
        { id: 31, image: require("../icon/seat.png"), selected: false },
        { id: 32, image: require("../icon/seat.png"), selected: false },
        { id: 33, image: require("../icon/seat.png"), selected: false },
        { id: 34, image: require("../icon/seat.png"), selected: false },
        { id: 35, image: require("../icon/seat.png"), selected: false },
        { id: 36, image: require("../icon/seat.png"), selected: false },
        { id: 37, image: require("../icon/seat.png"), selected: false },
        { id: 38, image: require("../icon/seat.png"), selected: false },
        { id: 39, image: require("../icon/seat.png"), selected: false },
        { id: 40, image: require("../icon/seat.png"), selected: false },
        { id: 41, image: require("../icon/seat.png"), selected: false },
        { id: 42, image: require("../icon/seat.png"), selected: false },
        { id: 43, image: require("../icon/seat.png"), selected: false },
        { id: 44, image: require("../icon/seat.png"), selected: false },
        { id: 45, image: require("../icon/seat.png"), selected: false },
        { id: 46, image: require("../icon/seat.png"), selected: false },
        { id: 47, image: require("../icon/seat.png"), selected: false },
        { id: 48, image: require("../icon/seat.png"), selected: false },
        { id: 49, image: require("../icon/seat.png"), selected: false },
        { id: 50, image: require("../icon/seat.png"), selected: false },
        { id: 51, image: require("../icon/seat.png"), selected: false },
        { id: 52, image: require("../icon/seat.png"), selected: false },
        { id: 53, image: require("../icon/seat.png"), selected: false },
        { id: 54, image: require("../icon/seat.png"), selected: false },
    ])
    
    const [data1, setData1] = useState([
        {id:1,Image: require("../icon/time.png"),title:"8 JUNE, 2023"},
        {id:2,Image: require("../icon/hour.png"),title:"8 JUNE, 2023"},
        {id:3,Image: require("../icon/seat.png"),title:"8 JUNE, 2023"},
        {id:4,Image: require("../icon/total.png"),title:"8 JUNE, 2023"},
    ])

    const handleSeatPress = (id) => {
        setData(prevData =>
            prevData.map(item =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        );
    }

    const renderRow = (startId) => {
        return (
            <View style={styles.row}>
                {data.slice(startId, startId + 4).map(seat => (
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
        <SafeAreaView style={styles.container}>
            <View style={{height: 520,backgroundColor:"#111111",marginTop: -25,width:500,marginLeft:-24}}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <TouchableOpacity>
                    <Image  style={styles.image} source={require("../icon/back.png")} />
                </TouchableOpacity>
                <Text style={styles.txtchooseSeats}>Choose Seats</Text>
            </View>
            <Image style={{ width: 342, height: 54, marginTop: 50,marginLeft:40 }} source={require("../icon/line.png")} />
            <View style ={{flexDirection:'row',marginTop:20,}}>
            <View style={{margin:30}}>
            {renderRow(0, 4)}
            {renderRow(4, 8)}
            {renderRow(8, 16)}
            {renderRow(16, 20)}
            </View>
            <View style ={{marginTop:30}}>
            {renderRow(20, 24)}
            {renderRow(24, 28)}
            {renderRow(28, 32)}
            {renderRow(32, 36)}
            </View>
            </View>
            <View>
            <View style={{flexDirection:'row',marginLeft:45}}>
            <View>
            {renderRow(36, 40)}
            {renderRow(40, 44)}
            </View>
            <View>
            {renderRow(44, 48)}
            {renderRow(48, 52)}
            </View>
            </View>
            </View>
            </View>
            <Image style={{with: 341,let:45,tintColor:"white",marginTop: -90}}
            source={require("../icon/line11.png")}
            />
            <View style ={{flexDirection: 'row',marginTop:20,justifyContent:'space-between'}}>
                <View style={[styles.box,{backgroundColor:"#976504"}]}>
                </View>
                <Text style={styles.textcolor}>Đang chọn</Text>
                <View style={[styles.box,{backgroundColor:"#FF1F11"}]}>
                </View>
                <Text style={styles.textcolor}>Đã đặt</Text>
                <View style={[styles.box,{backgroundColor:"#FFFFFF"}]}>
                </View>
                <Text style={styles.textcolor}>Còn trống</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:70,marginLeft:12}}>
                <Image style={{width:33,height:25}}
                source={require('../icon/time.png')}
                />
                <Text style={styles.txttime}>8 JUNE, 2023</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:20,marginLeft:20}}>
                <Image style={{width:20,height:25}}
                source={require('../icon/time.png')}
                />
                <Text style={styles.txttime}>4:00 PM</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:20,marginLeft:12}}>
                <Image style={{width:30,height:22}}
                source={require('../icon/time.png')}
                />
                <Text style={styles.txttime}>G10,G11</Text>
            </View>

            <View style={{flexDirection:'row',marginTop:20,marginLeft:12}}>
                <Image style={{width:25,height:16}}
                source={require('../icon/time.png')}
                />
                <Text style={styles.txttime}>Tổng cộng: 200.000đ</Text>
            </View>
            <TouchableOpacity style={{width:50,height:50,borderRadius:25,backgroundColor:"#976504",alignItems:'center',marginLeft:300,marginTop: -40}}>
                <Text style ={styles.txtdatngay}>Đặt ngay</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default SeatSelect

const styles = StyleSheet.create({
    txtdatngay:{
        marginTop:4,
        width:26,
        textAlign:'center',
        alignItems:'center',
        height:34,
        fontSize:12,
        lineHeight:17,
        fontWeight:'600',
        color:"#FFFFFF"
       
        
    },
    txttime:{
    marginLeft:15,
     fontSize:15,
     fontWeight:"400",
     lineHeight: 21,
     color:"#FFFFFF"

    },
    textcolor:{
        
        fontSize:15,
        lineHeight:21,
        fontWeight:"400",
        color:"#FFFFFF"
    },
    box:{
    width: 17,
    height: 18,
    borderRadius: 1,
    
    },
    txtchooseSeats: {
        fontSize: 20,
        lineHeight: 28,
        alignItems: "center",
        fontWeight: '600',
        color: "#FFFFFF",
        marginLeft: 20,
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: "#18191A",
        padding: 22
    },
    image: {
        width: 44,
        height: 44,
        marginLeft:25,
        marginTop: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
