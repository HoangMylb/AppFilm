import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from "../helper/AxiosHelper"
export const ThanhToanContext = createContext();
export const ThanhToanProvider = (props) => {
    const { children } = props;
   
    const getAllRapPhim = async () => {
        try {
            const respon =  await customAxios().get('/rapphim/getAll')
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('getAllRapPhimdContext', error)
            return false;
        }
    }
    const ThanhToan = async (amount) => {
        try {
            const respon =  await customAxios().post('/payments/intents',{amount})
              
                
                return respon;
        } catch (error) {
            console.log('payments', error)
            return null;
        }
    }
   

    return (
        <ThanhToanContext.Provider value={{ getAllRapPhim,ThanhToan}}>
            {children}
        </ThanhToanContext.Provider>
    )
}