import React, { useContext, useState, useEffect } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PhimContext } from '../context/PhimContext';

// ...import statements

const Test = () => {
    const { getSeat ,updateSeat} = useContext(PhimContext);
    const ngay = '6/11/2023';
    const gio = '13:00';
    const Phim = '652bc4ca47d84ead606478d1';
    const Rap = '651e955fb343d4ba2edfbf10';
    //const ghe = ["654908eb05e30fdd323e5fb3", "654908eb05e30fdd323e5fb2"];
    
    const [dataSeat, setdataSeat] = useState([]);
    const [numColumns, setNumColumns] = useState(6);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalSeats, setTotalSeats] = useState(0);
    const [idPhong, setidPhong] = useState('')
    const [ArrayGhe, setArrayGhe] = useState('')

    let idGheArray; 
    const seat = async () => {
        const a = await getSeat(Phim,Rap,ngay, gio);
        if (a && a.length > 0) {
            setdataSeat(a[0].ghe);
            setidPhong(a[0]._id);
            console.log("aaa: " + a);
        } else {
            // Xử lý trường hợp không có dữ liệu trả về
            console.log("Không có dữ liệu ghế");
        }
    };
    useEffect(() => {
        
        seat();
    }, []);
    const updateSeated = async () =>{
        const ghe = selectedSeats.map((seat) => seat._id);
        await updateSeat(idPhong,ghe,Phim ,Rap,ngay, gio);
        
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
    
    
}, [selectedSeats,dataSeat])

    return (
        <View style={{ flex: 1, backgroundColor: 'grey' }}>
           
            <FlatList
            style={{alignSelf: 'center',marginTop: 20,}}
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
            
            <Text style={{ color: 'black', fontSize: 20 }}>ghế đã chọn: {ArrayGhe}</Text>
            <Text style={{ color: 'black', fontSize: 20 }}>Số lượng ghế đã chọn: {totalSeats}</Text>
            <Button
                onPress={updateSeated}
                title="Thay đổi"
            />
        </View>
    );
};

export default Test;

