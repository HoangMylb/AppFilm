import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native';
import React, { useState } from 'react';
import movieComing from '../data/comingsoon';

const Coming = () => {
  const [movie, setMovie] = useState(movieComing);

  const windowWidth = Dimensions.get('window').width;
  const imageWidth = windowWidth * 0.43; // Điều chỉnh theo nhu cầu
  const imageHeight = imageWidth * 1.7; // Duy trì tỷ lệ hình ảnh

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row',justifyContent:'center', alignItems: 'center', }}>
        <View style={{ margin: 10 }}>
          <Image
            source={{ uri: item.url }}
            style={{ width: imageWidth, height: imageHeight, borderRadius: 12 }}
          />
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>{item.name}</Text>
        </View>

        {/* Thêm một cặp hình ảnh và văn bản khác */}
        <View style={{ margin: 10 }}>
          <Image
            source={{ uri: item.url }}
            style={{ width: imageWidth, height: imageHeight, borderRadius: 12 }}
          />
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#18191A' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginBottom: 10 }}>
        <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Arrow%20Left%20Button2.png?alt=media&token=4ecc2c70-56d8-4da2-abac-750f6ca28639&_gl=1*cy7qkk*_ga*ODc4NjkwNDYzLjE2OTc4ODI4NzE.*_ga_CW55HF8NVT*MTY5ODI0MzEwOC40LjEuMTY5ODI0MzY0OC41OC4wLjA.'}}
          style={{ width: 44, height: 44, marginLeft: 10 }}
        />
        <Text style={{ color: 'white', fontSize: 16, marginLeft: 60, fontWeight: 'bold' }}>Sắp chiếu </Text>
      </View>
      <FlatList
        data={movie}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name + index.toString()}
      />
    </View>
  );
};

export default Coming;

const styles = StyleSheet.create();
