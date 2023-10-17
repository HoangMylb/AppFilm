import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'
import customAxios from "../helper/AxiosHelper"
export const UserContext = createContext();
export const UserProvider = (props) => {
    const { children } = props;
   
    const [khachHang, setkhachHang] = useState('')
    const login = async (userName, passWord) => {
        try {
            const respon = await customAxios().post('/khachhang/login', { userName: userName, passWord: passWord });
            console.log("success: "+respon.success);
            console.log("khachHang: "+JSON.stringify(respon.khachHang));
            if (respon.success) {
                console.log('Đăng nhập thành công');
               
                return true;
            }
            else {
                console.log('Đăng nhập thất bại');
                return false;
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
                return { success: true, message: respon.message }
            }
            else {
                console.log('register thành thất bại ' +respon.message);
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('login', error)
            return false;
        }
    }
    
    return (
        <UserContext.Provider value={{ login,register }}>
            {children}
        </UserContext.Provider>
    )
}