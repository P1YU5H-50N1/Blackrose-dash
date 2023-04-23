import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './state/store'
import router from './router'


import { initFirebaseBackend } from './helpers/firebase/authUtils';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_APIKEY,
    authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
    databaseURL: import.meta.env.VITE_APP_DATABASEURL,
    projectId: import.meta.env.VITE_APP_PROJECTId,
    storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APP_APPId,
    measurementId: import.meta.env.VITE_APP_MEASUREMENTID
};

initFirebaseBackend(firebaseConfig);


const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
