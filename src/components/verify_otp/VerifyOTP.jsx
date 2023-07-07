import React, { useState } from 'react';
import styles from './VerifyOTP.module.css'; 
// import { verifUserOTP } from '../../api/APIRequests';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { sendUserOTP, verifUserOTP } from '../../api/APIRequests';

const VerifyOTP = ({userType}) => {
  const [OTP, setOTP] = useState(0); 
  const {email} = useParams(); 

  const navigate = useNavigate(); 

  const resendOTP = (e) => {
    e.preventDefault(); 
    console.log(email);
    // send otp 
    const sendOTPPromise = sendUserOTP(email, userType); 
    toast.promise(sendOTPPromise, {
      loading:<b>Sending...</b>, 
      success:(data) => <b>{ data.message } </b>,
      error: err => <b>{err.message}</b>
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const verifyOTPPromise = verifUserOTP(email, OTP, userType); 
    
    toast.promise(verifyOTPPromise, {
      loading:<b>Verifying...</b>, 
      success:(data) => <b>{data.message}</b>, 
      error: error => <b>{error.message}</b>
    }).then(() => {
      setTimeout(() => {
        if(userType) {
           navigate(`/admin/${email}/resetpassword`)
        } else {
          navigate(`/${email}/resetpassword`); 
        }
      }, 500);
    })

  }
  return (
    <div className='d-flex justify-content-center' style={{height:'80vh', alignItems:'center'}}  >
      <Toaster/>
        <div className={styles.form}>
        <h3>Forget your password</h3>
        <small>Please enter the email address you'd like your password reset information sent to</small>
        <form method='GET' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputOTP" className="form-label" style={{fontWeight:'bold', marginTop:'20px'}}>Enter OTP: </label>
            <input value={OTP} onChange={(e) => setOTP(e.target.value)} type="number" maxLength='6' className="form-control" id="exampleInputOTP" aria-describedby="OTPHelp" />
          </div>
          <button type="submit" className="btn btn-primary">Veirfy OTP</button>
          <button onClick={resendOTP} style={{marginLeft:'20px', backgroundColor:'#6c7525'}}  type="button" className="btn">Resend OTP</button>
        </form>
        </div>
    </div>
  );
}

export default VerifyOTP;
