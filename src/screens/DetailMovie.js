import { StyleSheet, Text, SafeAreaView,View,Image } from 'react-native'
import React from 'react'

const DetailMovie = () => {
  return (
    <View style={styles.container}>
    <View style={styles.header}>
        <View style={styles.iconBack}>
            <Text style={{ marginTop: '20%', marginLeft: '20%',color:'#000' }}>Icon</Text>
        </View>
        <Text ></Text>
        <Text style={{ width: 44, }}></Text>
    </View>
    <Image
    style={{width:'100%',height:'35%', backgroundColor:'blue'}}
    src='https://firebasestorage.googleapis.com/v0/b/fir-cinemaapp-dcbcf.appspot.com/o/movie3.png?alt=media&token=e0604275-ad78-4f05-944f-70fd0f8ee123&_gl=1*i6m1ny*_ga*MTQ3NDUwNTMwMy.4xNjk1NDY4NDE5*_ga_CW55HF8NVT*MTY5NTk5Mzg1Mi4xMC4xLjE2OTU5OTUwMDMuNjAuMC4w'
    />
    
   
        
</View>
  )
}

export default DetailMovie

const styles = StyleSheet.create({
    iconBack: {
        width: 44,
        height: 44,
        backgroundColor: 'pink', 
        borderRadius: 50,


    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 44,
        marginTop:'4%'
    },

    container: {
        display: 'flex',
        flex:1,
        backgroundColor: '#fff'
    },
})