import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const MovieItem2 = ({ item , navigation, idUser }) => {
  
  const onPressItem = () => {
     navigation.navigate('BuyTicketsSC', { item, idUser });
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
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem2;
