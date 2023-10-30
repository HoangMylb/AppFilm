import React from 'react';
import { View, Text, Image } from 'react-native';

const DirectorItem = ({ item }) => {
  return (
    <View style={{backgroundColor: '#222222',width: 121,height: 180, borderRadius: 12,margin: 10,
    justifyContent: 'space-around'
    }}>
      <Image
        style={{
          width: 62,
          height: 63,
          resizeMode: 'cover',
          borderRadius: 12,
          margin: 10,
        }}
        source={{ uri: item.hinhAnh }}
      />
      <Text style={{ color: 'white', fontSize: 16,margin: 5, }}>{item.tenDienVien}</Text>
     
    </View>
  );
};

export default DirectorItem;
