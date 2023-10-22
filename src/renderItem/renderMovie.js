import React from 'react';
import { View, Text, Image } from 'react-native';

const MovieItem = ({ item }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{
          width: 120,
          height: 200,
          resizeMode: 'cover',
          borderRadius: 12,
          margin: 10,
        }}
        source={{ uri: item.url }}
      />
      <Text style={{ color: 'white', fontSize: 16 }}>{item.name}</Text>
      <Image
        style={{
          width: 90,
          height: 14,
          resizeMode: 'cover',
        }}
        source={{ uri: item.start }}
      />
    </View>
  );
};

export default MovieItem;
