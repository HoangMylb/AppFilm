import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Pressable } from 'react-native';

const TimeSelect = () => {
  const [data, setData] = useState([
    { id: 1, day: 5, month: "june", selected: false },
    { id: 2, day: 6, month: "june", selected: false },
    { id: 3, day: 7, month: "june", selected: false },
    { id: 4, day: 8, month: "june", selected: false },
    { id: 5, day: 9, month: "june", selected: false },
    { id: 6, day: 10, month: "june", selected: false }
  ]);

  const [data1,setData1] = useState([
    {id: 1,time:"10:00",selected: false},
    {id: 2,time:"1:00",selected: false},
    {id: 3,time:"4:00",selected: false},
    {id: 4,time:"7:00",selected: false},

    {id: 5,time:"8:45",selected: false},
    {id: 6,time:"9:00",selected: false},
  ]);

  const toggleSelection = (id) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const toggleSelection1 = (id) => {
    setData1(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };
  const [soluong, setsoluong] = useState(0);
  const addlickticket =() =>{
    setsoluong(soluong+1);
  }  
  const giamclickticket =()=>{
   if(soluong >=1)
   setsoluong(soluong-1);

  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => toggleSelection(item.id)}>
        <View style={{ padding: 5 }}>
          <View style={{ width: 53, height: 53, backgroundColor: item.selected ? "#E38025" : "#181818", borderRadius: 30, marginLeft: 0 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: "#FFFFFF" }}>{item.day}</Text>
              <Text style={{ color: "#FFFFFF" }}>{item.month}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const renderItem1 = ({ item }) => {
    
    return (
      <View style={{ padding: 5,marginTop: 10 }}>
        <TouchableOpacity onPress={()=> toggleSelection1(item.id)}style={{ width: 50, height: 40,  backgroundColor: item.selected ? "#E38025" : "#181818", borderRadius: 5, marginLeft: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: "#FFFFFF",alignItems: 'center',marginTop:9}}>{item.time}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#000000', flex: 1 }}>
     <View style={{ position: 'relative' }}>
      <Image style={{ height: 500 }} source={require('../image/tiectrangmau.png')} />
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
       <View style ={{flexDirection:'row',alignItems:'center',}}>
         <TouchableOpacity onPress={addlickticket} style={{width:30 ,height:30 ,borderRadius: 20, backgroundColor:"#E38025",alignItems:'center'}}>
           <Text style={{color:"white",fontSize:20,}}>+</Text>
         </TouchableOpacity>
         <Text style={{color:"white",marginLeft: 20}}>{soluong}</Text>
         <TouchableOpacity onPress={giamclickticket} style={{marginLeft: 20,width:30 ,height:30 ,borderRadius: 20, backgroundColor:"#E38025",alignItems:'center'}}>
           <Text style={{color:"white",fontSize:20,}}>-</Text>
         </TouchableOpacity>
       </View>
       <View>
         <TouchableOpacity style ={{width:217 ,height:48 ,backgroundColor:"#E38025",borderRadius:10,alignItems:'center',textAlign:"center",}}>
          <Text style ={{fontSize:17,lineHeight: 25.5,fontWeight:600,color:"white",marginTop:12}}>Đặt vé</Text>
         </TouchableOpacity>
       </View>
      </View>
    </SafeAreaView>
  )
}

export default TimeSelect;

const styles = StyleSheet.create({

});
