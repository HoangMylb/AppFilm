import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from "../helper/AxiosHelper"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
export const UserContext = createContext();
export const UserProvider = (props) => {
    const { children } = props;
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '453299861632-2rgp3trk74pnt4p52i7eba5bsjf8nv7v.apps.googleusercontent.com',
        
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
        try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
    
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
            // Sign-in the user with the credential
            const userCredential = await auth().signInWithCredential(googleCredential);
    
            return userCredential; // Trả về userCredential chứa thuộc tính user
        } catch (error) {
            console.error('googleSignIn error:', error);
            throw error;
        }
    };
    

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
    const login = async (userName, passWord) => {
        try {
            const respon = await customAxios().post('/khachhang/login', { userName: userName, passWord: passWord });
            if (respon.success) {
                console.log('Đăng nhập thành công');
                
               
                return { success: true, khach: respon.khachHang };
            }
            else {
                console.log('Đăng nhập thất bại');
                
                return { success: false , khach: null };
            }
        } catch (error) {
            console.log('login', error)
            return false;
        }
    }
    const register = async (tenKhachHang ,userName , passWord, rePassWord, SDT, ngaySinh, vaiTro, gioiTinh, hinhAnh) => {
        try {
            const respon = await customAxios().post('/khachhang/newKhachHang', 
            { tenKhachHang: tenKhachHang,userName: userName, passWord: passWord, rePassWord: rePassWord, SDT: SDT, ngaySinh: ngaySinh, vaiTro: vaiTro, gioiTinh: gioiTinh, hinhAnh: hinhAnh });
            if (respon.success) {
                console.log('register thành công '+respon.success);
                return { success: true, message: '', messageTen: '', messageUser: '', messageSDT:'', messageGender: '', messageDate: '', messageUser2: '', messageSDT2: '' }
            }
            else {
                console.log('register thành thất bại ' +respon.messageUser);
                return { success: false, message: respon.message , messageTen: respon.messageTen, messageUser: respon.messageUser, messageSDT: respon.messageSDT, messageGender: respon.messageGender, messageDate: respon.messageDate, messagePass: respon.messagePass, messageRePass: respon.messageRePass, messageUser2: respon.messageUser2, messageSDT2: respon.messageSDT2 }
            }
        } catch (error) {
            console.log('register', error)
            return false;
        }
    }
    const getId = async (_id) => {
        try {
            const respon =  await customAxios().get(`/khachhang/getId?_id=${_id}`)
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('getID', error)
            return false;
        }
    }
    const suaHoTen = async (_id, tenKhachHang) => {
        try {
            const respon =  await customAxios().post('/khachhang/SuaHoTen', { _id: _id, tenKhachHang});
            if (respon.success) {           
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('SuaHoTen', error)
            return false;
        }
    }
    const suaSDT = async (_id, SDT) => {
        try {
            const respon =  await customAxios().post('/khachhang/SuaSDT', { _id: _id, SDT});
            if (respon.success) {           
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('SuaSDT', error)
            return false;
        }
    }
    const suaNgaySinh = async (_id, ngaySinh) => {
        try {
            const respon =  await customAxios().post('/khachhang/SuaNgaySinh', { _id: _id, ngaySinh});
            if (respon.success) {           
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('SuaNgaySinh', error)
            return false;
        }
    }
    const suaEmail = async (_id, userName) => {
        try {
            const respon =  await customAxios().post('/khachhang/SuaEmail', { _id: _id, userName});
            if (respon.success) {           
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('SuaEmail', error)
            return false;
        }
    }
    const suaGioiTinh = async (_id, gioiTinh) => {
        try {
            const respon =  await customAxios().post('/khachhang/SuaGioiTinh', { _id: _id, gioiTinh});
            if (respon.success) {           
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('SuaGioiTinh', error)
            return false;
        }
    }
    const suaPassWord = async (_id, passWord, rePassWord) => {
        try {
            const respon =  await customAxios().post('/khachhang/SuaPassWord', { _id: _id, passWord, rePassWord});
            if (respon.success) {           
                return { success: true, message: respon.message,message1: respon.message1 }
            }
            else {
                return { success: false, message: respon.message,message1: respon.message1 }
            }
        } catch (error) {
            console.log('SuaPassWord', error)
            return false;
        }
    }
    const suaHinhAnh = async (_id, hinhAnh) => {
        try {
            const respon =  await customAxios().post('/khachhang/SuaHinhAnh', { _id: _id, hinhAnh});
            if (respon.success) {           
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('SuaHinhAnh', error)
            return false;
        }
    }
    const checkOTP = async (userName) => {
        try {
            const respon = await customAxios().get(`/khachhang/checkOTP?userName=${userName}`);
            if (respon.success) {
               
                return { success: true, message: respon.message  };
            }
            else {
                
                return { success: false, message: respon.message  };
            }
        } catch (error) {
            console.log('checkOTP', error)
            return false;
        }
    }
    
    const sendOTP = async (email, trangThai,nguoiDat,ngayDat, phongChieu, soLuong , ghe, xuatChieu,tien) => {
        try {
            const respon = await customAxios().post('/otp/signup', { email, trangThai,nguoiDat,ngayDat, phongChieu, soLuong , ghe, xuatChieu,tien});
            if (respon.status) {
     
                return { success: true, message: respon.data };
            }
            else {
                
                return { success: false , message: null };
            }
        } catch (error) {
            console.log('login', error)
            return false;
        }
    }
    const verifyOTP = async (userId, otp) => {
        try {
            const respon = await customAxios().post('/otp/verifyOTP', { userId, otp});
            if (respon.status) {
     
                return { success: true, message: respon.message };
            }
            else {
                
                return { success: false , message: respon.message };
            }
        } catch (error) {
            console.log('login', error)
            return false;
        }
    }
    const getByUser = async (userName) => {
        try {
            const respon =  await customAxios().get(`/khachhang/getUser?userName=${userName}`)
            if (respon.success) {   
                console.log("respon.success"+respon.success);
                console.log("respon.message"+JSON.stringify(respon.message));
                return { success: true, message: respon.message }
            }
            else {
                console.log("respon.success"+respon.success);
                console.log("respon.message"+JSON.stringify(respon.message));
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('getID', error)
            return false;
        }
    }
    return (
        <UserContext.Provider value={{googleSignIn,signOut,getByUser,verifyOTP,sendOTP,checkOTP, login,register,suaHinhAnh,suaHoTen,suaPassWord, getId, suaSDT,suaNgaySinh,suaEmail,suaGioiTinh  }}>
            {children}
        </UserContext.Provider>
    )
}