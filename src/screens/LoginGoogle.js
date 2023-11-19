import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState,useContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { UserContext } from '../context/UserContext';


const LoginGoogle = () => {
    const {googleSignIn,signOut} = useContext(UserContext)

    const SignIn = async () => {
        googleSignIn();
    }

    const signOutGG = async () => {
        signOut();
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.btnBox}
                onPress={() => SignIn().then(res => {

                }).catch(error => console.log(error))}
            >
                <Text style={styles.title}>Google Signin</Text>
            </Pressable>
            <Pressable
                style={styles.btnBox}
                onPress={signOutGG}
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