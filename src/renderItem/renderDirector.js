import React from 'react';
import {View, Text, Image} from 'react-native';

const DirectorItem = ({item}) => {
  return (
    <View
      style={{
        backgroundColor: '#595E65',
        width: 121,
        height: 197,
        margin: 10,
        borderRadius: 12,
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
        source={{uri: item.imgDic}}
      />
      <Text style={{color: 'white', fontSize: 20,margin: 5}}>{item.Dic}</Text>
      <Text style={{color: 'white', fontSize: 14,margin: 5}}>{item.movie}</Text>
      <View style = {{flexDirection: 'row', justifyContent: 'space-between', margin: 5}}>
        <Image
          style={{
            width: 20,
            height: 20,
            resizeMode: 'cover',
          }}
          source={{uri: item.favour}}
        />
        <Text style={{color: 'white', fontSize: 16}}>{item.more}</Text>
      </View>
    </View>
  );
};

export default DirectorItem;
