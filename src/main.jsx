import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {GoogleOAuthProvider} from '@react-oauth/google'; 
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider
                clientId={'60196786882-u75tirp39navu50kpa596fljbulj9fcn.apps.googleusercontent.com'}>
        <App />
       </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
