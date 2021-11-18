import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as firebase from 'firebase/app'
import 'firebase/compat/auth'
import 'firebase/analytics'
import 'bootstrap/dist/css/bootstrap.min.css'



const firebaseConfig = {
  apiKey: "AIzaSyDttrCZkJycXUjbLZuW8roA_ZyO4RKyVCs",
  authDomain: "let-schat-e9e2a.firebaseapp.com",
  projectId: "let-schat-e9e2a",
  storageBucket: "let-schat-e9e2a.appspot.com",
  messagingSenderId: "732729789408",
  appId: "1:732729789408:web:bd7ed25876970f034d7985",
  measurementId: "G-4ZGQMH7T4V"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
