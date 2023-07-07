import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/olympic-games-1608127_640.png'; 
import styles from './Layout.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import profileSVG from '../../assets/profile.svg'; 
import {CurrentUserContext} from '../../App'; 

const Navbar = () => {
  const [user, setUser] = useState(null); 

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const userInfo = localStorage.getItem('user_info'); 
    if(userInfo) {
      setUser(() => JSON.parse(userInfo)); 
    }
  }, [currentUser]); 

  const handleSignOut = () => {
      localStorage.removeItem('user_info'); 
      localStorage.removeItem('access_token'); 
      setUser(null);
      console.log('current user', currentUser)
      navigate('/login'); 
      setCurrentUser(null); 
  }

  
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor: '#550065', height:'80px', width:'100%'}}>
          <div className="container-fluid">
            <Link to='/' className='navbar-brand d-flex gap-3' style={{cursor:'pointer'}}>
              <img className={`${styles.navbarLogo}`} src={logo}/> 
              <p className={`fw-bold ${styles.navbar_barnd_name}`} >Olympic</p>
            </Link>
            <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span  className="navbar-toggler-icon"> </span>
            </button>
            <div className={`collapse navbar-collapse ${styles.navbarCollapse}`} id="navbarSupportedContent">
              <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navUl}`} >
                <li className="nav-item">
                  <Link to='/news' className={`nav-link ${styles.navLink}`} aria-current="page" >NEWS</Link>
                </li>
                <li className="nav-item">
                  <Link to='/highlights' className="nav-link" aria-current="page" >HIGHLIGHTS</Link>
                </li>
                <li className="nav-item">
                  <Link to='/live' className="nav-link" aria-current="page" >LIVE</Link>
                </li>
                <li className="nav-item">
                  <Link to='/upcommingevents' className="nav-link" href="#">UPCOMMING EVENTS</Link>
                </li>
                {(currentUser) && (currentUser.adminRole) && (
                  <li className="nav-item">
                    <Link to='/admin/adminpanel' className="nav-link" href="#">ADMIN PANNEL</Link>
                  </li>
                )}
              </ul>
              <div className='d-flex gap-5 me-lg-5 me-sm-auto ms-sm-auto justify-content-center align-items-center' >

                {!user ? (
                  <>
                    <Link to='/login' className={`${styles.signin_signout_button}`}>SIGN IN</Link>
                    <Link to='/signup' className={`${styles.signin_signout_button}`}>SIGN UP</Link>
                  </>
                ) : (
                  <>
                  <div className="d-flex align-items-center gap-3">
                    <Link to='/userprofile' className={`d-flex justify-content-center align-items-center border rounded-circle mt-auto mb-auto ${styles.profile}`}>
                        <img src={profileSVG}  alt="profile icon" />
                    </Link>
                    <small style={{color:'white', fontSize:'16px'}}>{user.firstName || user.adminRole}</small>
                  </div>
                  <Link to='/login'  onClick={handleSignOut} className={`${styles.signin_signout_button}`}>SIGN OUT</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
    </>
  );
}

export default Navbar;
