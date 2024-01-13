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
            console.log('PhimHome', error)
            return false;
        }
    }
    const phimDangChieu = async (_id) => {
        try {
            const respon =  await customAxios().get('/phim/PhimDangChieu')
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('PhimDangChieu', error)
            return false;
        }
    }
    const getPhimHomeSC = async (_id) => {
        try {
            const respon =  await customAxios().get('/phim/PhimHomeSC')
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('PhimHomeSC', error)
            return false;
        }
    }
    const phimSapChieu = async (_id) => {
        try {
            const respon =  await customAxios().get('/phim/PhimSapChieu')
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('PhimSapChieu', error)
            return false;
        }
    }
    const getAllDV = async (_id) => {
        try {
            const respon =  await customAxios().get('/dienVien/getAll')
            if (respon.success) {   
                
                return { success: true, message: respon.message }
            }
            else {
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('PhimSapChieu', error)
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
            console.log('getIDContext', error)
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
            console.log('newYeuThichContext', error)
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
            console.log('newYeuThichContext', error)
            return false;
        }
    }
    
    const getYeuThich = async (persons) => {
        try {
            const respon =  await customAxios().get(`/yeuthich/getYeuThich?persons=${persons}`)
            if (respon.success) {   
                return { success: true, message: respon.message }
            } else {
                console.log("successSAI: " + respon.success);
                console.log("message: " + respon.message);
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('getYeuThichContext', error)
            return false;
        }
    }
   
    const getMangPhim = async (_id) => {
        try {
            const respon =  await customAxios().get(`/phim/getMangPhim?_id=${_id}`)
            if (respon.success) {   
              
                return { success: true, message: respon.message }
            } else {
                console.log("successSAI: " + respon.success);
                console.log("message: " + respon.message);
                return { success: false, message: respon.message }
            }
        } catch (error) {
            console.log('getMangPhimContext', error)
            return false;
        }
    }
    const kiemTraYeuThich = async (persons, phim) => {
    try {
        const response = await customAxios().get(`/yeuthich/kiemTraYeuThich?persons=${persons}&phim=${phim}`);
        if (response.success) {   
          
            return { success: true }
        } else {
       
            return { success: false }
        }
    } catch (error) {
        console.log('kiemTraYeuThichContext', error);
        return { success: false };
    }
}
const getSeat = async (Phim,Rap,ngay, gio) => {
    try {
        const response = await customAxios().get(`/lichchieu?Phim=${Phim}&Rap=${Rap}&ngay=${ngay}&gio=${gio}`);
      
            return response;
        
    } catch (error) {
        console.log('getSeat', error);
        return null;
    }
}
const updateSeat = async (phongId, gheIds,Phim ,Rap,ngay, gio) => {
    try {
        const response = await customAxios().put('/updateGhe',{phongId,gheIds,Phim ,Rap,ngay, gio});
      
            return response;
        
    } catch (error) {
        console.log('updateSeat', error);
        return null;
    }
}
const addBinhLuan = async (_id,userID,ngay,noiDung,hinhAnh,userTen) => {
    try {
        const respon =  await customAxios().post('/binhluan/add', { _id,userID,ngay,noiDung,hinhAnh,userTen})
        if (respon.success) {   
            
            return { success: true, message: respon.message }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('newYeuThichContext', error)
        return false;
    }
}
const getBinhLuanPhim = async (_id) => {
    try {
        const respon =  await customAxios().get(`/binhluan/get?_id=${_id}`)
        if (respon.success) {   
            
            return { success: true,idBinhLuan: respon.idBinhLuan, message: respon.message,  }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('PhimSapChieu', error)
        return false;
    }
}
const removeBinhLuanFromPhim = async (_id,binhLuanId) => {
    try {
        const respon =  await customAxios().delete('/binhluan/remove',  {
            data: { _id, binhLuanId },
          })
        if (respon.success) {   
            
            return { success: true, message: respon.message }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('newYeuThichContext', error)
        return false;
    }
}
const getPhimId = async (_id) => {
    try {
        const respon =  await customAxios().get(`/phim/getIdPhim?_id=${_id}`)
        if (respon.success) {   
            
            return { success: true, message: respon.message }
        }
        else {
            return { success: false, message: respon.message }
        }
    } catch (error) {
        console.log('PhimSapChieu', error)
        return false;
    }
}
    return (
        <PhimContext.Provider value={{getPhimId,removeBinhLuanFromPhim,getBinhLuanPhim,addBinhLuan,updateSeat, getSeat,getAllDV,phimSapChieu, getPhimHomeSC,phimDangChieu,getPhimHome,getDienVien,newYeuThich,xoaYeuThich,getYeuThich,getMangPhim,kiemTraYeuThich}}>
            {children}
        </PhimContext.Provider>
    )
}