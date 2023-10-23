import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaDGUAnP3IigzmeLJH1H5j6eQu81QjbDc",
  authDomain: "fir-upload-2f810.firebaseapp.com",
  projectId: "fir-upload-2f810",
  storageBucket: "fir-upload-2f810.appspot.com",
  messagingSenderId: "547188209533",
  appId: "1:547188209533:web:7823cdf1ed3b195fe57e14",
  measurementId: "G-3HJEVY5SKW"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

