import React, { useContext, useEffect, useState } from 'react';
import styles from './UserProfile.module.css'; 
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateUserPassword, updateUserProfile } from '../../api/APIRequests';
import { CurrentUserContext } from '../../App';

const initialPasswordFormData = {
    oldPassword: '', 
    newPassword: ''
}

const UserProfile = () => {
  const [formData, setFormData] = useState({firstName:'', lastName:''});
  const [passwordFormData, setPasswordFormData] = useState(initialPasswordFormData); 
  const [changed, setChanged] = useState(false); 

  const navigate = useNavigate(); 
  const {setCurrentUser} = useContext(CurrentUserContext);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user_info')); 
    setFormData(() => ({firstName:data.firstName,lastName:data.lastName })); 
  }, [changed])

  // onchange event handler
  const handleInputChange = e => {
    const {name, value} = e.target; 
    if(name==='firstName' || name === 'lastName') {
        setFormData((prevData) => ({...prevData,[name]:value})); 
        return;
    }
    setPasswordFormData(prevData => ({...prevData, [name]:value})); 
  }
  

  // handle change user details 
  const handleChangeUserDetails = (e) => {
    e.preventDefault(); 
    if(formData.firstName === '' && formData.lastName === '') {
        alert('Please fill up the complete form'); 
        return; 
    }
    // get access_token from localhost 
    const updateUserProfilePromise = updateUserProfile(formData); 
    toast.promise(updateUserProfilePromise, {
        loading:<b>Updating...</b>, 
        success:(data) => <b>{ data.message } </b>,
        error: err => <b>{err.message}</b>
      }).then(data => {
        localStorage.setItem('user_info', JSON.stringify(data.result));
        setCurrentUser(data.result);
        setChanged(!changed);
      })
  }

  // handle password change 
  const handlePasswordChange = e => {
    e.preventDefault(); 
    if(passwordFormData.oldPassword === '' || passwordFormData.newPassword === '') {
        alert('Please fill up both old and new password'); 
    }
    const updatePasswordPromise = updateUserPassword(passwordFormData); 
    toast.promise(updatePasswordPromise, {
        loading:<b>Updatign...</b>, 
        success:(data) => <b>{ data.message } </b>,
        error: err => <b>{err.message}</b>
      }).then(data => {
        setPasswordFormData(initialPasswordFormData); 
      })

  }
  return (
    <div className='d-flex justify-content-center' style={{height:'100vh', alignItems:'center'}}  >
      <Toaster/>
        <div className={styles.form}>
        <h3>Update your profile here</h3>
        <small>Here you can change your profile details and password seperately.</small>
        {/* profile edit form */}
        <form method='POST' onSubmit={handleChangeUserDetails}>
            {/* firstName */}
          <div className="mb-3">
            <label htmlFor="exampleInputFirstName" className="form-label" style={{fontWeight:'bold', marginTop:'20px'}}>First Name</label>
            <input value={formData.firstName} onChange={handleInputChange} type="text" className="form-control" id="exampleInputFirstName" name='firstName' />
          </div>
            {/* lastName */}
          <div className="mb-3">
            <label htmlFor="exampleInputLastName" className="form-label" style={{fontWeight:'bold', marginTop:'20px'}}>LastName</label>
            <input value={formData.lastName} onChange={handleInputChange} type="text" className="form-control" id="exampleInputLastName" name='lastName' />
          </div>
          <button type="submit" className="btn btn-primary">Change User Details</button>
        </form>
        <hr/>

        {/* change password */}
        <form method='POST' onSubmit={handlePasswordChange}>
            <h3 className='mb-3'>Change password</h3>
            {/* firstName */}
          <div className="mb-3">
            <input value={passwordFormData.oldPassword} onChange={handleInputChange} type="text" className="form-control" id="exampleInputFirstName" placeholder='Enter old password' name='oldPassword' />
          </div>
            {/* lastName */}
          <div className="mb-3">
            <input value={passwordFormData.newPassword} onChange={handleInputChange} type="text" className="form-control" id="exampleInputLastName" placeholder='Enter new password' name='newPassword'/>
          </div>
          <button type="submit" className="btn btn-secondary">Change Password</button>
        </form>
        
        </div>
    </div>
  );
}

export default UserProfile;
