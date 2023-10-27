import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from "../helper/AxiosHelper"
export const TinTucContext = createContext();
export const TinTucProvider = (props) => {
    const { children } = props;
   
    const getAllTinTuc = async () => {
        try {
            const respon =  await customAxios().get('/tintuc/getAll')
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('getAllTinTucdContext', error)
            return false;
        }
    }
   

    return (
        <TinTucContext.Provider value={{ getAllTinTuc}}>
            {children}
        </TinTucContext.Provider>
    )
}