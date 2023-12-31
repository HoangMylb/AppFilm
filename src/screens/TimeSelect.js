import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, ToastAndroid, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import { format, addDays } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { StackActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const TimeSelect = ({ navigation }) => {
  const route = useRoute();
  const item = route.params.item;
  const item1 = route.params.item1;
  const idUser = route.params.idUser;
  const [data, setData] = useState([]);
  const [selectedNgay, setSelectedNgay] = useState('');
  const [selectedGio, setSelectedGio] = useState('');
  const [Thang, setThang] = useState('');
  const [ngaySeat, setngaySeat] = useState('');
  useEffect(() => {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, index) => addDays(today, index));

    const newData = next7Days.map((date, index) => {
      const day = date.getDate();
      const month = format(date, 'MMMM', { locale: viLocale });
      const year = format(date,'yyyy',{ locale: viLocale })
      setThang(date.getMonth() + 1);
      return { id: index + 1, day, month,year, selected: false };
    });

    setData(newData);
  }, []);

  const [data1, setData1] = useState([
    { id: 1, time: "13:00", selected: false },
    { id: 2, time: "16:00", selected: false },
    { id: 3, time: "19:00", selected: false },
    { id: 4, time: "21:00", selected: false },
    
  ]);

  const toggleSelection = (id) => {

    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, selected: true } : { ...item, selected: false }
      )
    );
    const selectedDay = data.find((item) => item.id === id);
    if (selectedDay) {
      setngaySeat( selectedDay.day+"/"+Thang+"/"+selectedDay.year)
      console.log("Ngày đã chọn2222:",selectedDay);
      // Lưu trạng thái của ngày được chọn vào biến selectedNgay
      setSelectedNgay(selectedDay);
    }
  };

  const toggleSelection1 = (id) => {
    setData1(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, selected: true } : { ...item, selected: false }
      )
    );
    const selectedGio = data1.find((item) => item.id === id);
    if (selectedGio) {
      console.log("Giờ đã chọn:", selectedGio.time);
      // Lưu trạng thái của ngày được chọn vào biến selectedNgay
      setSelectedGio(selectedGio);
    }
  };


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => toggleSelection(item.id)}>

        <View style={{ width: 75, height: 75, backgroundColor: item.selected ? "#E38025" : "#3B3428", borderRadius: 80, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: "#FFFFFF" }}>{item.day}</Text>
          <Text style={{ color: "#FFFFFF" }}>{item.month}</Text>

        </View>

      </TouchableOpacity>
    );
  }

  const renderItem1 = ({ item }) => {

    return (
      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <TouchableOpacity onPress={() => toggleSelection1(item.id)} style={{ width: 60, height: 40, backgroundColor: item.selected ? "#E38025" : "#3B3428", borderRadius: 8 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: "#FFFFFF", alignItems: 'center', marginTop: 9 }}>{item.time}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const navigateToSeatSelect = (item1, item, idUser, ngay,thang,nam,gio,thangSeat) => {
    navigation.dispatch(
      StackActions.replace('SeatSelect', {
        item1: item1,
        item: item,
        idUser: idUser,
        ngay:  ngay,
        thang: thang,
        nam: nam,
        gio:  gio,
        thangSeat:thangSeat
      })
    );
  };
  const nextTo = async () => {
   if (selectedNgay=='' || selectedGio=='') {
    ToastAndroid.show("Vui lòng chọn ngày và giờ", 1);
   }else{
    navigateToSeatSelect(item1, item, idUser,selectedNgay.day,selectedNgay.month,selectedNgay.year,selectedGio.time,ngaySeat)
    
   }
   
  };
  const nextToo = () => {

    navigation.navigate('Location', { item, idUser });
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#000000', flex: 1 }}>
      <ScrollView>
        <View style={{ position: 'relative' }}>
          <Image
            style={{ width: '100%', height: 480, resizeMode: 'cover', alignSelf: 'center' }}
            source={{
              uri: item.poster
            }}
          />
          <TouchableOpacity onPress={nextToo} style={{ position: 'absolute', marginLeft: 20, marginTop: 20 }}>
            <Image style={{ width: 44, height: 44 }}
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*8qq0vj*_ga*MTY3NjEyNTMzOC4xNjk3MzU5OTA1*_ga_CW55HF8NVT*MTY5NzY3MjY4Ni40LjEuMTY5NzY3Mjk3Mi41NC4wLjA.' }}
            />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#FFFFFF",margin:20, fontSize: 20, fontWeight: "600" }}>Ngày và giờ</Text>

        <View style={{ marginHorizontal: 2}}>
          <FlatList
            horizontal={true}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={{ marginHorizontal: 5}}>
        <FlatList
          horizontal={true}
          data={data1}
          renderItem={renderItem1}
          keyExtractor={(item1) => item1.id.toString()}
        />
       </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
       
            <TouchableOpacity onPress={nextTo} style={{ width: 217, height: 48, backgroundColor: "#E38025", borderRadius: 10, alignItems: 'center', textAlign: "center", marginVertical: 40 }}>
              <Text style={{ fontSize: 17, lineHeight: 25.5, fontWeight: 600, color: "white", marginTop: 12 }}>Đặt vé</Text>
            </TouchableOpacity>
       
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TimeSelect;

const styles = StyleSheet.create({

});
