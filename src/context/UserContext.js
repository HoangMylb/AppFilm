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

                console.log('Login thành công'+respon.success);
               
                return true;
            }
            else {
                console.log('Login thành thất bại');
                return false;
            }
        } catch (error) {
            console.log('login', error)
            return false;
        }
    }
    
    return (
        <UserContext.Provider value={{ login }}>
            {children}
        </UserContext.Provider>
    )
}