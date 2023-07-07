import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Highlights = () => {
    const navigate = useNavigate(); 

   useEffect(() => {
    const user = localStorage.getItem('user_info'); 
    if(!user) {
        navigate('/login')
    }
   }, []); 
  return (
    <div>
      <div className="container-fulid">
            <div className="d-flex gap-5">
                <div className="mt-4">
                    <iframe width="300" height="200" src="https://www.youtube.com/embed/AKtTeEYG2uc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <p style={{fontWeight:"bold", fontSize:'16px'}}>Argentina Vs France</p>
                </div>
                <div className="mt-4">
                    <iframe width="300" height="200" src="https://www.youtube.com/embed/y1CEmM0SghU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <p style={{fontWeight:"bold", fontSize:'16px'}}>Sirlanka Vs West Indians </p>
                </div>
                <div className="mt-4">
                    <iframe width="300" height="200" src="https://www.youtube.com/embed/C4f945tpBLc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <p style={{fontWeight:"bold", fontSize:'16px'}}>Top 10 plays of 2023</p>
                </div>
            </div>
            <div className="row d-flex gap-5"> 
                <h3 className='mt-3'>All highlights</h3>
                <div className="card mt-4 rounded-3 mt-4" style={{width: "18rem"}}>
                    <img src='https://www.golfdigest.com/content/dam/images/golfdigest/fullset/2021/8/ariya-jutanugarn-olympics-2021-practice-olympic-rings.jpg' className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Golf</h5>
                        <p className="card-text">Watch Live</p>
                        <a href="#" className="btn btn-danger">Watch Live</a>
                    </div>
                </div>
                <div className="card mt-4 rounded-3 mt-4" style={{width: "18rem"}}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/b/bf/Algeria_and_Japan_women%27s_national_volleyball_team_at_the_2012_Summer_Olympics_%287913959028%29.jpg' className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Volley ball</h5>
                        <p className="card-text">Australia Vs Japan || watch live now</p>
                        <a href="#" className="btn btn-danger">Watch Live</a>
                    </div>
                </div>
                <div className="card mt-4 rounded-3 mt-4" style={{width: "18rem"}}>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/40._Schwimmzonen-_und_Mastersmeeting_Enns_2017_100m_Brust_Herren_USC_Traun-9897.jpg' className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Swimming</h5>
                        <p className="card-text">India Vs Pakistan || Watch live now</p>
                        <a href="#" className="btn btn-danger">Watch Live</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Highlights;
