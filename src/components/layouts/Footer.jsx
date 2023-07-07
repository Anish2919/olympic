import React from 'react';
import styles from './Layout.module.css'; 
import googlePlayStore from '../../assets/googleplaystore.png';

import facebookLogo from '../../assets/facebook.svg'; 
import twitterLogo from '../../assets/twitter.svg';
import instagramLogo from '../../assets/instagram.svg'; 
import youtubeLogo from '../../assets/youtube.svg';  

const Footer = () => {
  return (
    <div>
      <footer className={`container-fulid ${styles.footer}`} style={{width:'100%',overflow:'hidden'}}>
        <section className={`container-fluid d-md-flex ${styles.footer_media_handler}`} >
          <div className={styles.website_name}>
            Olympic 2023
          </div>
          <div className={`d-md-flex gap-md-5 gap-sm-2  ${styles.social_media_icons}`}>
              <img src={twitterLogo} alt="twitter logo"  />
              <img src={facebookLogo} alt="facebook logo"/>
              <img src={instagramLogo} alt="twitter logo"  />
              <img src={youtubeLogo} alt="facebook logo"/>
          </div>
          <div className="download_app d-md-flex gap-5">
            <p className='mt-auto mb-auto fw-bold mt-auto'>download olympic app to enjoy</p> 
            <div className="googleplayStore d-sm-block" >
              <img src={googlePlayStore} alt="google play store"  style={{height:'52px', width:'200px'}}/>
            </div>
          </div>
        </section>
        
        <section className={`container-fluid d-md-flex ${styles.policy_copyright_handler}`}>
          <div className={`${styles.policy}`}>
            <ul>
              <li>privacy policy</li>
              <li>terms of services</li>
              <li>preference center</li>
            </ul>
          </div>
          <div className={` ${styles.copyright}`}>
            <p>Copyright c 1993 - 2023. All right reserved.</p>
          </div>
        </section>
      </footer>
    </div>
  );
}

export default Footer;
