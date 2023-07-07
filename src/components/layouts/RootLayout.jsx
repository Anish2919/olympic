import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
        <Navbar/> 
        <div className='container-fluid'>
            <Outlet/>
        </div>
        <Footer/>
    </>
  );
}

export default RootLayout;
