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
            return { success: false, message:'getAllRapPhimdContext fail' }
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
   const newDonHang = async (user, phim, rapPhim, ngayDat,xuatChieu, ghe,  soLuong, tien) => {
    try {
        const respon =  await customAxios().post('/donhang/newDonHang',{user, phim,rapPhim, ngayDat,xuatChieu, ghe, soLuong, tien})
        if (respon.success) {   
                
            return { success: true, message: respon.message }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('newDonHang', error)
        return { success: false, message:'newDonHang fail' }
    }
}

const DonHangUser = async (user) => {
    try {
        const respon =  await customAxios().get(`/donhang/DonHangUser?user=${user}`)
        if (respon.success) {   
            
            return { success: true, message: respon.message }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('DonHangUserContext', error)
        return { success: false, message:'DonHangUserContext fail' }
    }
}
const LayPhim = async (_id) => {
    try {
        const respon =  await customAxios().get(`/phim/getIdPhim?_id=${_id}`)
        if (respon.success) {   
           
            return { success: true, message: respon.message }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('LayPhimContext', error)
        return { success: false, message:'LayPhimContext fail' }
    }
}
const LayRap = async (_id) => {
    try {
        const respon =  await customAxios().get(`/rapphim/getIdRapPhim?_id=${_id}`)
        if (respon.success) {   
            
            return { success: true, message: respon.message }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('LayRapContext', error)
        return { success: false, message:'LayRapContext fail' }
    }
}
const LayUser = async (_id) => {
    try {
        const respon =  await customAxios().get(`/khachhang/getId?_id=${_id}`)
        if (respon.success) {   
            
            return { success: true, message: respon.message }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('LayUserContext', error)
        return { success: false, message:'LayUserContext fail' }
    }
}
    return (
        <ThanhToanContext.Provider value={{ LayUser,LayRap,LayPhim,getAllRapPhim,ThanhToan,newDonHang,DonHangUser}}>
            {children}
        </ThanhToanContext.Provider>
    )
}