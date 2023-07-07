import React, { useState } from 'react';
import styles from './ForgetPassword.module.css'; 
import { sendUserOTP } from '../../api/APIRequests';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const ForgetPassword = ({userType}) => {
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    // send otp 
    const sendOTPPromise = sendUserOTP(email, userType); 
    toast.promise(sendOTPPromise, {
      loading:<b>Sending...</b>, 
      success:(data) => <b>{ data.message } </b>,
      error: err => <b>{err.message}</b>
    }).then(() => {
      setTimeout(() => {
        if(!userType) {
          navigate(`/${email}/verifyotp`)
        } else {
          navigate(`/admin/${email}/verifyotp`); 
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
        <form method='POST' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label" style={{fontWeight:'bold', marginTop:'20px'}}>Email address</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
          </div>
          <button type="submit" className="btn btn-primary">Request OTP</button>
        </form>
        </div>
    </div>
  );
}

export default ForgetPassword;
