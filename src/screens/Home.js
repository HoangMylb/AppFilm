import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import movieList from '../data/movieItem';
import directorList from '../data/directorItem';
import actorList from '../data/actorItem';

const Home = (props) => {

  const {navigation} = props;
  // data phim
  const [movie, setMovie] = useState(movieList);
  const [director, setDirector] = useState(directorList);
  const [actor, setActor] = useState(actorList);


  const clickNext = () => {
    navigation.navigate('User');
  };

  const renderItem = ({item}) => {
    return (
      
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            width: 120,
            height: 200,
            resizeMode: 'cover',
            borderRadius: 12,
            margin: 10,
          }}
          source={{uri: item.url}}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
          }}>
          {item.name}
        </Text>
        <Image
          style={{
            width: 90,
            height: 14,
            resizeMode: 'cover',
          }}
          source={{uri: item.start}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>
        <View style={styles.screen}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.txtHeader}>
              <Text style={styles.txt1}>Xin chào, Phúc</Text>
              <Text style={styles.txt2}>Đặt vé xem phim thôi nào</Text>
            </View>
            <TouchableOpacity onPress={clickNext}>
            <Image
              style={styles.imgHeader}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/ImageUser.png?alt=media&token=07b4b15d-4dcf-402b-88c0-87a987022e19&_gl=1*30vg5j*_ga*MTQ3NDUwNTMwMy4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NTkwOTAwNS45LjEuMTY5NTkwOTQyOC4zOS4wLjA.',
              }}
            />
            </TouchableOpacity>
              
            
          </View>
          {/* ... */}
          {/* MOVIE thứ 1 */}
          <View style={styles.movie}>
            {/* Tiêu đề */}
            <Text style={styles.txtRap}>Phim rạp</Text>

            {/* Danh sách phim đang chiếu */}
            <View style={styles.headerMovie}>
              <Text style={{fontSize: 24, color: '#000000'}}>Đang chiếu</Text>
              <Image
                style={{width: 77, height: 1}}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Line.png?alt=media&token=5e09f7de-ab43-40cd-a64a-60ecceeff5c5&_gl=1*w0d55j*_ga*MTQ3NDUwNTMwMy.4xNjk1NDY8NDE5*_ga_CW55HF8NVT*MTY5NTkwOTAwNS45LjEuMTY5NTkxMTU4NS40My4wLjA.',
                }}
              />
              <TouchableOpacity>
                <Text style={{fontSize: 13, color: '#CE1212'}}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phim */}
            <FlatList
              style={{flex: 1}}
              horizontal
              data={movie}
              keyExtractor={item => item.name}
              renderItem={renderItem}
            />
          </View>

          {/* Danh sách phim thứ 2 */}
          <View style={styles.director}>
            {/* Tiêu đề */}
            <View style={styles.headerDirector}>
              <Text style={{fontSize: 24, color: '#000000'}}>Đạo diễn   </Text>
              <Image
                style={{width: 77, height: 1}}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Line.png?alt=media&token=5e09f7de-ab43-40cd-a64a-60ecceeff5c5&_gl=1*w0d55j*_ga*MTQ3NDUwNTMwMy.4xNjk1NDY8NDE5*_ga_CW55HF8NVT*MTY5NTkwOTAwNS45LjEuMTY5NTkxMTU4NS40My4wLjA.',
                }}
              />
              <TouchableOpacity>
                <Text style={{fontSize: 13, color: '#CE1212'}}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>
            {/* Danh sách phim */}
            <FlatList
              style={{flex: 1}}
              horizontal
              data={director}
              keyExtractor={item => item.name}
              renderItem={renderItem}
            />
          </View>

          {/* Danh sách phim thứ 3 */}
          <View style={styles.actor}>
            {/* Tiêu đề */}
            <View style={styles.headerActor}>
              <Text style={{fontSize: 24, color: '#000000'}}>Đang chiếu</Text>
              <Image
                style={{width: 77, height: 1}}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Line.png?alt=media&token=5e09f7de-ab43-40cd-a64a-60ecceeff5c5&_gl=1*w0d55j*_ga*MTQ3NDUwNTMwMy.4xNjk1NDY8NDE5*_ga_CW55HF8NVT*MTY5NTkwOTAwNS45LjEuMTY5NTkxMTU4NS40My4wLjA.',
                }}
              />
              <TouchableOpacity>
                <Text style={{fontSize: 13, color: '#CE1212'}}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>
            {/* Danh sách phim */}
            <FlatList
              style={{flex: 1}}
              horizontal
              data={actor}
              keyExtractor={item => item.name}
              renderItem={renderItem}
            />
          </View>
        </View>
      </ScrollView>
                
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  screen: {
    marginHorizontal: 10,
    marginTop: 10,
  },

  // header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgHeader: {
    width: 50,
    height: 50,
  },

  // title

  txt1: {
    fontSize: 22,
    color: '#000000',
    fontFamily: 'Roboto',
  },
  txt2: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#635F5B',
  },

  // Movie

  txtRap: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: 'Roboto',
    color: '#000000',
  },

  headerMovie: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerDirector: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerActor: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  actor:{
    marginBottom: 20,
  }
});
