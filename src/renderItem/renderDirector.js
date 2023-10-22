import React from 'react';
import { View, Text, Image } from 'react-native';

const DirectorItem = ({ item }) => {
  return (
    <View style={{backgroundColor: '#777B81',width: 121,height: 197,margin: 10, borderRadius: 12, justifyContent: 'space-around'}}>
      <Image
        style={{
          width: 70,
          height: 70,
          resizeMode: 'cover',
          borderRadius: 12,
          margin: 10,
        }}
        source={{ uri: item.imgDic }}
      />
      <Text style={{ color: 'white', fontSize: 20,margin: 10 }}>{item.Dic}</Text>
      <Text style={{ color: 'white', fontSize: 12,margin: 10 }}>{item.movie}</Text>
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between',margin:10}}>
        <Image
            style={{
            width: 15,
            height: 14,
            resizeMode: 'cover',
            }}
            source={{ uri: item.favour }}
        />
        <Text style={{ color: 'white', fontSize: 16 }}>{item.more}</Text>
      </View>
    </View>
  );
};

export default DirectorItem;
