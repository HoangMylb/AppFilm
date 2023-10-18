import React from 'react';
import { View, Text, Image } from 'react-native';

const MovieComingItem = ({ item }) => {
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
    </View>
  );
};

export default MovieComingItem;
