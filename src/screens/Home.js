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
import MovieItem from '../renderItem/renderMovie';
import DirectorItem from '../renderItem/renderDirector';
import movieComing from '../data/comingsoon';
import MovieComingItem from '../renderItem/renderMovieComing';
import ActorItem from '../renderItem/renderActor';

const Home = (props) => {

  const {navigation} = props;
  // data phim
  const [movie, setMovie] = useState(movieList);
  const [coming, setComing] = useState(movieComing);
  const [director, setDirector] = useState(directorList);
  const [actor, setActor] = useState(actorList);


  const clickNext = () => {
    navigation.navigate('User');
  };

  const clickNextAll = () => {
    navigation.navigate('Launching');
  };
  const clickNextAllComing = () => {
    navigation.navigate('Coming');
  };

  const renderItem = ({ item }) => {
    return <MovieItem item={item} />; // Sử dụng MovieItem component
  };

  const renderItem1 = ({ item }) => {
    return <DirectorItem item={item} />; // Sử dụng MovieItem component
  };

  const renderItem2 = ({ item }) => {
    return <MovieComingItem item={item} />; // Sử dụng MovieItem component
  };

  const renderItem3 = ({ item }) => {
    return <ActorItem item={item} />; // Sử dụng MovieItem component
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

          {/* Movie đang chiếu */}
          <View style={styles.movie}>
            {/* Tiêu đề */}
            <Text style={styles.txtRap}>Phim rạp</Text>
            {/* Danh sách phim đang chiếu */}
            <View style={styles.headerMovie}>
              <Text style={{fontSize: 24, color: 'white'}}>Đang chiếu</Text>
              <TouchableOpacity onPress={clickNextAll}>
                <Text style={{fontSize: 13, color: '#E38025'}}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phim */}
            <FlatList
              style={{flex: 1, marginTop: 15}}
              horizontal
              data={movie}
              keyExtractor={(item, index) => item.name + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={renderItem}
            />
          </View>


          {/* Danh sách phim sắp chiếu  */}
          
          <View style={styles.movieComing}>
            <View style={styles.headerMovieComing}>
              <Text style={{fontSize: 24, color: 'white'}}>Sắp chiếu</Text>
              <TouchableOpacity onPress={clickNextAllComing}>
                <Text style={{fontSize: 13, color: '#E38025'}}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>
            {/* Phim */}
            <FlatList
              style={{flex: 1,marginTop: 15}}
              horizontal
              data={coming}
              keyExtractor={(item, index) => item.name + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={renderItem2}
            />
          </View>

          {/* Danh sách đạo diễn */}
          <View style={styles.director}>
            {/* Tiêu đề */}
            <View style={styles.headerDirector}>
              <Text style={{fontSize: 24, color: 'white'}}>Đạo diễn</Text>
              <TouchableOpacity>
                <Text style={{fontSize: 13, color: '#E38025'}}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>
            {/* Danh sách phim */}
            <FlatList
              style={{flex: 1,marginTop: 15}}
              horizontal
              data={director}
              keyExtractor={(item, index) => item.Dic + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={renderItem1}
            />
          </View>

          {/* Danh sách diễn viên */}
          <View style={styles.actor}>
            {/* Tiêu đề */}
            <View style={styles.headerActor}>
              <Text style={{fontSize: 24, color: 'white'}}>Diễn viên</Text>
              <TouchableOpacity>
                <Text style={{fontSize: 13, color: '#E38025'}}>
                  Xem tất cả &gt;
                </Text>
              </TouchableOpacity>
            </View>
            {/* Danh sách phim */}
            <FlatList
              style={{flex: 1,marginTop: 15}}
              horizontal
              data={actor}
              keyExtractor={(item, index) => item.Dic + index.toString()} // Sử dụng index để đảm bảo key là duy nhất
              renderItem={renderItem3}
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
  headerMovieComing: {
    marginTop: 25,
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

  actor:{
    marginBottom: 20,
  }
});
