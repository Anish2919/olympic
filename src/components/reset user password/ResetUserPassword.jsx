import React, { useState } from 'react';
import styles from './ResetUserPassword.module.css'; 
import { resetUserPassword, sendUserOTP } from '../../api/APIRequests';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';


const ResetUserPassword = ({userType}) => {
  const [password, setPassword] = useState(''); 
  const [type, settype] = useState(false); 

  const {email} = useParams(); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // send otp 
    const resetPasswordPromise = resetUserPassword(email, password, userType); 
    toast.promise(resetPasswordPromise, {
      loading:<b>Sending...</b>, 
      success:(data) => <b>{ data.message } </b>,
      error: err => <b>{err.message}</b>
    }).then(() => {
      setTimeout(() => {
        if(userType) {
          navigate('/admin/login')
        } else {
          navigate('/login')
        }
      }, 500);
    })
    
  }
  return (
    <div className='d-flex justify-content-center' style={{height:'80vh', alignItems:'center'}}  >
      <Toaster/>
        <div className={styles.form}>
        <h3>Reset your password</h3>
        <small>Please enter the new password.</small>
        <form method='POST' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label" style={{fontWeight:'bold', marginTop:'20px'}}>New Password: </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={(type) ? 'text' : 'password'} className="form-control" id="exampleInputPassword" aria-describedby="emailHelp" />
          </div>
          <button type='button' className='btn btn-secondary me-3' onClick={() => settype(!type)}>show</button>
          <button type="submit" className="btn btn-primary">Save Password</button>
        </form>
        </div>
    </div>
  );
}

export default ResetUserPassword;
