import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseURL = 'https://192.168.43.95:3000/';
const customAxios = (contentType = 'application/json')=>{
    const axiosInstance = axios.create({
        baseURL: baseURL
    });
    axiosInstance.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem('token');
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );
    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    );
    return axiosInstance;
}
export default customAxios;