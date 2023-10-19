import React, { useState, useContext  } from 'react';
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
import MovieItem from '../renderItem/renderMovie';
import DirectorItem from '../renderItem/renderDirector';
import { UserContext } from '../context/UserContext';

const Home = (props) => {
 
  const { khachHang } = useContext(UserContext);
  
  console.log("khachContext: "+JSON.stringify(khachHang));
  
  const { navigation } = props;
  // data phim
  const [movie, setMovie] = useState(movieList);
  const [director, setDirector] = useState(directorList);
  const [actor, setActor] = useState(actorList);


  const clickNext = () => {
    navigation.navigate('User');
  };

  const renderItem = ({ item }) => {
    return <MovieItem item={item} />; // Sử dụng MovieItem component
  };

  const renderItem1 = ({ item }) => {
    return <DirectorItem item={item} />; // Sử dụng MovieItem component
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.screen}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.txtHeader}>
              {khachHang && khachHang.tenKhachHang && (
                <Text style={styles.txt1}>Xin chào, {khachHang.tenKhachHang}</Text>
              )}
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
              <Text style={{ fontSize: 24, color: 'white' }}>Đang chiếu</Text>
              <Image
                style={{ width: 77, height: 1 }}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Line.png?alt=media&token=5e09f7de-ab43-40cd-a64a-60ecceeff5c5&_gl=1*w0d55j*_ga*MTQ3NDUwNTMwMy.4xNjk1NDY8NDE5*_ga_CW55HF8NVT*MTY5NTkwOTAwNS45LjEuMTY5NTkxMTU4NS40My4wLjA.',
                }}
              />
              <TouchableOpacity>
                <Text style={{ fontSize: 13, color: '#E38025' }}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phim */}
            <FlatList
              style={{ flex: 1 }}
              horizontal
              data={movie}
              keyExtractor={(item, index) => item.name + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={renderItem}
            />
          </View>

          {/* Danh sách phim thứ 2 */}
          <View style={styles.director}>
            {/* Tiêu đề */}
            <View style={styles.headerDirector}>
              <Text style={{ fontSize: 24, color: 'white' }}>Đạo diễn   </Text>
              <Image
                style={{ width: 77, height: 1 }}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Line.png?alt=media&token=5e09f7de-ab43-40cd-a64a-60ecceeff5c5&_gl=1*w0d55j*_ga*MTQ3NDUwNTMwMy.4xNjk1NDY8NDE5*_ga_CW55HF8NVT*MTY5NTkwOTAwNS45LjEuMTY5NTkxMTU4NS40My4wLjA.',
                }}
              />
              <TouchableOpacity>
                <Text style={{ fontSize: 13, color: '#E38025' }}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>
            {/* Danh sách phim */}
            <FlatList
              style={{ flex: 1 }}
              horizontal
              data={director}
              keyExtractor={(item, index) => item.Dic + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={renderItem1}
            />
          </View>

          {/* Danh sách phim thứ 3 */}
          <View style={styles.actor}>
            {/* Tiêu đề */}
            <View style={styles.headerActor}>
              <Text style={{ fontSize: 24, color: 'white' }}>Đang chiếu</Text>
              <Image
                style={{ width: 77, height: 1 }}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/Line.png?alt=media&token=5e09f7de-ab43-40cd-a64a-60ecceeff5c5&_gl=1*w0d55j*_ga*MTQ3NDUwNTMwMy.4xNjk1NDY8NDE5*_ga_CW55HF8NVT*MTY5NTkwOTAwNS45LjEuMTY5NTkxMTU4NS40My4wLjA.',
                }}
              />
              <TouchableOpacity>
                <Text style={{ fontSize: 13, color: '#E38025' }}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>
            {/* Danh sách phim */}
            <FlatList
              style={{ flex: 1 }}
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
    backgroundColor: '#18191A',
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
    color: '#ffffff',
    fontFamily: 'Roboto',
  },
  txt2: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#C57831',
  },

  // Movie

  txtRap: {
    marginTop: 15,
    fontSize: 32,
    fontFamily: 'Roboto',
    color: '#ffffff',
  },

  headerMovie: {
    marginTop: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerDirector: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerActor: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  actor: {
    marginBottom: 20,
  }
});
