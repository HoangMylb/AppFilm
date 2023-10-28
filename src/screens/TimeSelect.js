import React, { useState ,useEffect} from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';
import { format, addDays } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

const TimeSelect = ({navigation}) => {
  const [data, setData] = useState([]);
  const [selectedNgay, setSelectedNgay] = useState(null);
  const [selectedGio, setSelectedGio] = useState(null);

  useEffect(() => {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, index) => addDays(today, index));

    const newData = next7Days.map((date, index) => {
      const day = date.getDate();
      const month = format(date, 'MMMM', { locale: viLocale });

      return { id: index + 1, day, month, selected: false };
    });

    setData(newData);
  }, []);

  const [data1,setData1] = useState([
    {id: 1,time:"12:00",selected: false},
    {id: 2,time:"14:00",selected: false},
    {id: 3,time:"16:00",selected: false},
    {id: 4,time:"19:00",selected: false},
    {id: 5,time:"21:45",selected: false},
    {id: 6,time:"23:30",selected: false},
  ]);

  const toggleSelection = (id) => {
    
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, selected: true } : { ...item, selected: false }
      )
    );
    const selectedDay = data.find((item) => item.id === id);
    if (selectedDay) {
      console.log("Ngày đã chọn:", selectedDay.day, selectedDay.month);
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
  const nextTo=()=>{
   
      navigation.navigate('SeatSelect');
  }
  

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => toggleSelection(item.id)}>
       
          <View style={{ width: 60, height: 60, backgroundColor: item.selected ? "#E38025" : "#3B3428", borderRadius: 30, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: "#FFFFFF" }}>{item.day}</Text>
              <Text style={{ color: "#FFFFFF" }}>{item.month}</Text>
           
          </View>
       
      </TouchableOpacity>
    );
  }

  const renderItem1 = ({ item }) => {
    
    return (
      <View style={{ marginLeft: 20,marginTop: 10 }}>
        <TouchableOpacity onPress={()=> toggleSelection1(item.id)}style={{ width: 50, height: 30,  backgroundColor: item.selected ? "#E38025" : "#3B3428", borderRadius: 5}}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: "#FFFFFF",alignItems: 'center',marginTop:9}}>{item.time}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#000000', flex: 1 }}>
      <ScrollView>
     <View style={{ position: 'relative' }}>
     <Image
                style={{ width: 300, height: 480, resizeMode: 'cover', alignSelf: 'center' }}
                source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/image%2024.png?alt=media&token=49bf405b-6196-401b-8ade-11cad69f9111&_gl=1*1cbcdgd*_ga*MTI1MTA0NjU4MC4xNjg5OTM2NTk0*_ga_CW55HF8NVT*MTY5NjE0NjY0My4zLjEuMTY5NjE0NzM5Ni4zOC4wLjA.'
                }}
            />
      <TouchableOpacity style={{ position: 'absolute', marginLeft: 20, marginTop: 30 }}>
        <Image style={{ width: 44, height: 44 }} source={require('../icon/back.png')} />
      </TouchableOpacity>
    </View>
      <Text style={{ color: "#FFFFFF", padding: 10, fontSize: 20, fontWeight: "600" }}>Ngày và giờ</Text>
     
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <FlatList
         horizontal={true}
         data={data1}
         renderItem={renderItem1}
         keyExtractor={(item1) => item1.id.toString()}
      />
      <View style ={{flexDirection: 'row',justifyContent:'space-around'}}>
       <View>
         <TouchableOpacity onPress={nextTo} style ={{width:217 ,height:48 ,backgroundColor:"#E38025",borderRadius:10,alignItems:'center',textAlign:"center",marginTop: 10,marginBottom: 10}}>
          <Text style ={{fontSize:17,lineHeight: 25.5,fontWeight:600,color:"white",marginTop:12}}>Đặt vé</Text>
         </TouchableOpacity>
       </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TimeSelect;

const styles = StyleSheet.create({

});
