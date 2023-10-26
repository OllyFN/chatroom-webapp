import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from "firebase/database";
import Chat from './components/Chat/Chat.tsx'
import './font.css'

/*

This file handles firebase initialization and communication.

*/

// Firebase initialization
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// check Chat.tsx for explanation as to why we're exporting the databaseRef
export const databaseRef = ref(database); 

const sendMessage = (message:string) => // Function used by the Input component 
  push(databaseRef, {message, createdAt: Date.now()})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Chat databaseRef={databaseRef} sendMessage={sendMessage} />
  </React.StrictMode>,
)
