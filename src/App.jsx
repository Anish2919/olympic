import { createContext, useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Router, Route, Routes} from 'react-router-dom'; 
import Home from './components/Home';
import Navbar from './components/layouts/Navbar';
import SignIn from './components/login/SignIn';
import Footer from './components/layouts/Footer';
import Signup from './components/Signup';
import VerifyOTP from './components/verify_otp/VerifyOTP';
import ForgetPassword from './components/forget_password/ForgetPassword';
import ResetUserPassword from './components/reset user password/ResetUserPassword';
import UserProfile from './components/update user profile/UserProfile';
import { verifyMasterAdmin } from './api/APIRequests';
import AdminSignIn from './components/admin components/admin login/AdminSignIn';
import RootLayout from './components/layouts/RootLayout';
import AdminPannel, { ManageAdmin, ManageUser } from './components/admin components/admin pannel/AdminPannel';
import LiveComponent from './components/live component/LiveComponent';
import Highlights from './components/hightlights/Highlights';


export const CurrentUserContext = createContext(null); 
export const MasterAdminContext = createContext(null); 

function App() {
  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user_info'))); 
  },[])

  return (
    <>
      <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        <Routes>
          <Route path='/' element={<RootLayout/>}>
            <Route index element={<Home/>}></Route>
            <Route path='/login' element={<SignIn/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='signin' element={<SignIn/>}/>
            <Route path='/forgetpassword' element={<ForgetPassword/>} /> 
            <Route path='/:email/verifyotp' element={<VerifyOTP/>} /> 
            <Route path='/:email/resetpassword' element={<ResetUserPassword/>} />
            <Route path='/userprofile' element = {<UserProfile/> } />
            <Route path='/live' element={<LiveComponent/>} /> 
            <Route path='/highlights' element={<Highlights/>} />

            //admin 
            <Route path='/admin/login' element={<AdminSignIn/>} />
            <Route path='/admin/forgetpassword' element={<ForgetPassword userType='admin'/>}/> 
            <Route path='/admin/:email/verifyotp' element={<VerifyOTP userType='admin'/>} /> 
            <Route path='/admin/:email/resetpassword' element={<ResetUserPassword userType='admin'/>} />
            <Route path='/admin/adminpanel/' element={<AdminPannel/>}>
                <Route path='manageuser' element={<ManageUser/>} /> 
                <Route path='manageadmin' element={<ManageAdmin/>} /> 
            </Route>
          </Route>
        </Routes>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
