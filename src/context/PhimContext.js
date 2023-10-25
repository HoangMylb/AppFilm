import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from "../helper/AxiosHelper"
export const PhimContext = createContext();
export const PhimProvider = (props) => {
    const { children } = props;
   
    const getPhimHome = async (_id) => {
        try {
            const respon =  await customAxios().get('/phim/PhimHome')
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
    const getDienVien = async (_id) => {
        try {
            const respon =  await customAxios().get(`/dienVien/getDienVien?_id=${_id}`)
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
    const newYeuThich = async (persons, phim) => {
        try {
            const respon =  await customAxios().post('/yeuthich/newYeuThich', { persons, phim})
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('newYeuThich', error)
            return false;
        }
    }
    const xoaYeuThich = async (persons, phim) => {
        try {
            const respon =  await customAxios().post('/yeuthich/xoaYeuThich', { persons, phim})
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('newYeuThich', error)
            return false;
        }
    }
    const getYeuThich = async (persons) => {
        try {
            const respon =  await customAxios().get('/yeuthich/getYeuThich', { persons})
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('getYeuThich', error)
            return false;
        }
    }
    return (
        <PhimContext.Provider value={{ getPhimHome,getDienVien,newYeuThich,xoaYeuThich,getYeuThich}}>
            {children}
        </PhimContext.Provider>
    )
}