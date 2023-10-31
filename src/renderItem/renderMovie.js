import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const MovieItem = ({ item , navigation, idUser }) => {
  
  const onPressItem = () => {
     navigation.navigate('BuyTickets', { item, idUser });
  };
  return (
    <TouchableOpacity onPress={onPressItem}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {!item.poster ? (<Text style={{ color: 'white', fontSize: 16 }}>Đang tải</Text>
        ) : (
          <Image
            style={{
              width: 120,
              height: 200,
              resizeMode: 'cover',
              borderRadius: 12,
              margin: 10,
            }}
            source={{ uri: item.poster }}
          />
        )}

        <Text style={{ color: 'white', fontSize: 14 }}>{item.tenPhim}</Text>
        {!item.iconStart ? (<Text style={{ color: 'white', fontSize: 16 }}>Đang tải</Text>
        ) : (
          <Image
            style={{
              width: 90,
              height: 14,
              resizeMode: 'cover',
            }}
            source={{ uri: item.iconStart }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;
