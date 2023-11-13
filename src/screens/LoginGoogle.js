import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import jwt_decode from 'jwt-decode';

const LoginGoogle = () => {
    const [useData, setUseData] = useState({})

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '453299861632-2rgp3trk74pnt4p52i7eba5bsjf8nv7v.apps.googleusercontent.com',
            offlineAccess: true,
            scopes: ['profile', 'email', 'https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/user.phonenumbers.read'],
        });

        if (!firebase.apps.length) {
            firebase.initializeApp({
                // Các thông tin cấu hình Firebase của bạn
                    apiKey: "AIzaSyDIGQ3ihKBMIRt8qXYGqaVgvdKu8GTnV5w",
                    authDomain: "fir-cinemaapp-dcbcf.firebaseapp.com",
                    databaseURL: "https://fir-cinemaapp-dcbcf-default-rtdb.firebaseio.com",
                    projectId: "fir-cinemaapp-dcbcf",
                    storageBucket: "fir-cinemaapp-dcbcf.appspot.com",
                    messagingSenderId: "453299861632",
                    appId: "1:453299861632:web:0ca28d878d4f75223b0e65",
                    measurementId: "G-FYNH0FGHLP"
            });
        }
    }, [])

    const googleSignIn = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();
        const decodedToken = jwt_decode(idToken);
        const birthday = decodedToken;
        
        // Số điện thoại cái này không được nữa nghỉ push code lên mai tao xử lí ok WTF t chưa đổi tên biến ???? để i chang như này rồi push lên ik nghỉ đi
        //xoa fb dung khong ờ
       
        console.log('idToken:', idToken);
        console.log('decodedToken:', birthday);
        

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            console.log('Sign out success')
            // Google Account disconnected from your app.
            // Perform clean-up actions, such as deleting data associated with the disconnected account.
        } catch (error) {
            console.log(error + 'Login Fail!!!');
        }
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.btnBox}
                onPress={() => googleSignIn().then(res => {
                    //console.log('user: '+JSON.stringify(res.user));
                    //console.log('res: '+JSON.stringify(res.user.providerData));
                }).catch(error => console.log(error))}
            >
                <Text style={styles.title}>Google Signin</Text>
            </Pressable>
            <Pressable
                style={styles.btnBox}
                onPress={signOut}
            >
                <Text style={styles.title}>Sign out</Text>
            </Pressable>
        </View>
    )
}

export default LoginGoogle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 22,
        color: 'black'
    },

    btnBox: {
        paddingHorizontal: 20,
        backgroundColor: 'coral',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10
    }
})