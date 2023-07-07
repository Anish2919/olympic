import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const LiveComponent = () => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const user = localStorage.getItem('user_info'); 
        if(!user) {
            navigate('/login')
        }
    }, []); 
  return (
    <div className='container-fluid'>
        <div class="ratio ratio-16x9">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/nfrwNJ_LfK0?autoplay=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div className="container-fulid">
            <div className="row d-flex gap-5">
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

export default LiveComponent;
