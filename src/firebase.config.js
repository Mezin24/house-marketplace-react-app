import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCQzwdYIyEEj3EDpabwqKRv8hbBinGCtvU',
  authDomain: 'housemarket-place-react-app.firebaseapp.com',
  projectId: 'housemarket-place-react-app',
  storageBucket: 'housemarket-place-react-app.appspot.com',
  messagingSenderId: '916558994925',
  appId: '1:916558994925:web:28b3831ff0385b13c2dbe4',
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
