import React, { useEffect } from 'react';
import styles from './Home.module.css';

import banner from '../assets/banner.png'; 
import footballImg from '../assets/football.jpg'; 

import watchLogo from '../assets/watch.svg'; 
import golfImg from '../assets/golf.jpg'; 
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate(); 
  return (
    <>
      <div className="container-fulid" style={{width:'100%'}}>
      <div className="row" style={{height:'600px', width:'100%', padding:'0'}}>
        {/* upcomming event */}
          <div className={`col-md-3 ${styles.upcommingEvents}`} style={{height:'600px'}}>
            <div className=" d-flex justify-content-center mt-2" >
              <img src={banner} alt="logo" className={`img-fluid  ${styles.banner}`} />
            </div>
            <p style={{color:'white', textAlign:'center', marginTop:'20px', fontWeight:'bold', fontSize:'16px'}}>Upcomming Events</p>
            <div className={`d-flex justify-content-center  ${styles.upcommint_event_block}`} style={{width:'100%', height:'130px'}}>
              <UpcommingEventCard country1='Argentina' country2='France' date='8 jul 2023 21:30:00'/>
            </div>
            <div className={`d-flex justify-content-center mt-2  ${styles.upcommint_event_block}`} style={{width:'100%', height:'130px'}}>
            <UpcommingEventCard country1='Croatia' country2='Morocco' date='8 jul 2023 21:30:00'/>
            </div>
          </div>

        {/* watch live or screen button */}
          <div className={`col-md-9 ${styles.liveScreen}`} style={{height:'600px'}} >
            <img src={footballImg} alt="football"  style={{width:'100%', height:'100%'}}/>
            <button onClick={() => navigate('/live')} type='button' className={styles.watchLiveButton}>Watch live</button>
            {/* match details */}
            <p className={styles.match_details}>Argentina vs France || lusial stadium || live</p>
          </div>
      </div>
    </div>

    {/* live sports */}
    <div className={`container-fluid ${styles.liveSportCard_Container}`} >
        <p style={{fontWeight:'bold'}}>LIVE SPORTS</p>
        <div className="showing_live_events d-flex justify-content-between">
            <LiveSportCard imgSrc={golfImg} Description='Aditi Ashok and Pajaree Anannarukarn Third Round Highlights | 2021 DOW Great Lakes Bay Invitational'/>
        </div>
    </div>
    </>
  );
}

const UpcommingEventCard = ({country1, country2, date}) => {
  return(
    <>
      <div className="card" style={{width: '90%'}}>
        <div className={`${styles.statdium_name_and_time}`}>
          <small className={`${styles.stadium_name}`}>
            stadium name
          </small>
          <small className={`${styles.time}`}>
            {date}
          </small>
        </div>
        <div className={styles.country_container}>
          <img src="https://cdn.britannica.com/69/5869-004-7D75CD05/Flag-Argentina.jpg" alt="contry flag" className={styles.country_flag}/>
           <p className={styles.country_name}>{country1} Vs</p>
        </div>
        <div className={styles.country_container}>
          <img src="https://cdn.britannica.com/69/5869-004-7D75CD05/Flag-Argentina.jpg" alt="contry flag" className={styles.country_flag}/>
          <p className={styles.country_name}>{country2}</p>
        </div>
      </div>
    </>
  )
}

const LiveSportCard = ({sportName, Description, imgSrc}) => {
  return(
      <div className="card" style={{width:'18rem'}}>
        <img src={imgSrc} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{sportName}</h5>
          <p className="card-text">{ Description }</p>
          <button className={`btn ${styles.watchLiveBtn_Card}`}> <img src={watchLogo} alt="watch logo"/> Watch Live</button>
        </div>
      </div>
  )
}

export default Home;
