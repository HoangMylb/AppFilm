import React from 'react';
import { View, Text, Image } from 'react-native';

const DirectorItem = ({ item }) => {
  return (
    <View style={{backgroundColor: '#777B81',width: 121,height: 197,margin: 10, borderRadius: 12,}}>
      <Image
        style={{
          width: 62,
          height: 63,
          resizeMode: 'cover',
          borderRadius: 12,
          margin: 10,
        }}
        source={{ uri: item.imgDic }}
      />
      <Text style={{ color: 'white', fontSize: 16 }}>{item.Dic}</Text>
      <Text style={{ color: 'white', fontSize: 16 }}>{item.movie}</Text>
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
  );
};

export default DirectorItem;
