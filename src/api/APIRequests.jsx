import axios from 'axios'; 

const API = axios.create({baseURL:'http://localhost:5000'}); 

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("user_info")){
        req.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`
    }
    return req;
})

export async function registerUser(credentials) {
    try {
        const {firstName, lastName, email, password} = credentials; 
        const {data, status} = await axios.post('http://localhost:5000/users/signup',{firstName, lastName, email, password} ); 
        return Promise.resolve(data);  
     } catch(error) {
        if(error.response) {
            // return Promise.reject(error.response.data.error); 
            if (error.response.status === 400) {
                    return Promise.reject('Invaild paylod or failed validation'); 
            } 
            // 409 conflit status code. 
            if(error.response.status === 409) {
                return Promise.reject(error.response.data.error); 
   
            }
            return Promise.reject('Internal server error!'); 
        } else {
            return Promise.reject('Internal server error!'); 
        }
    }
}

export async function registerUserByGoogleOauth(access_token, setCurrentUser) {
    try {
        const {data, status} = await axios.post('http://localhost:5000/users/signup',{googleAccessToken:access_token} ); 
        if(data.token || data.result) {
            localStorage.setItem('user_info', JSON.stringify(data.result)); 
            localStorage.setItem('access_token', data.token); 
            setCurrentUser(data.result);
        }
        return Promise.resolve(data);  
     } catch(error) {
        console.log(error.message);
        if(error.response) {
            // return Promise.reject(error.response.data.error); 
            if (error.response.status === 400) {
                    return Promise.reject('Email already exists'); 
            } 
            // 409 conflit status code. 
            if(error.response.status === 409) {
                return Promise.reject(error.response.data.error); 
   
            }
            return Promise.reject('Internal server error!'); 
        } else {
            return Promise.reject('Internal server error!'); 
        }
    }
}

// Login user 
export async function loginUser(credentials) {
    try {
        const {email, password, setCurrentUser} = credentials; 
        const {data, status} = await axios.post('http://localhost:5000/users/signin', {email, password} ); 
        console.log({...data}); 
        if(data.token || data.result) {
            localStorage.setItem('user_info', JSON.stringify(data.result)); 
            localStorage.setItem('access_token', data.token); 
            setCurrentUser(data.result);
        }
        return Promise.resolve(data);  
     } catch(error) {
        console.log(error.message);
        if(error.response) {
            // return Promise.reject(error.response.data.error); 
            if (error.response.status === 400) {
                    return Promise.reject('Wrong Password! Please check your password.'); 
            } 
            // 409 conflit status code. 
            if(error.response.status === 409) {
                return Promise.reject(error.response.data.error); 
   
            }
            if(error.response.status === 404) {
                return Promise.reject('User doesnot exist. Please signup first before login!')
            }
            return Promise.reject('Internal server error!'); 
        } else {
            return Promise.reject('Invalid Username and Password'); 
        }
    }
}

// Login using google auth 
export async function loginUserGoogleOauth(access_token, setCurrentUser) {
    try {
        const {data, status} = await axios.post('http://localhost:5000/users/signin',{googleAccessToken:access_token} ); 
        console.log({...data}); 
        if(data.token || data.result) {
            localStorage.setItem('user_info', JSON.stringify(data.result)); 
            localStorage.setItem('access_token', data.token); 
            setCurrentUser(data.result); 
        }
        return Promise.resolve(data);  
     } catch(error) {
        console.log(error.message);
        if(error.response) {
            // return Promise.reject(error.response.data.error); 
            if (error.response.status === 400) {
                    return Promise.reject('Invaild paylod or failed validation'); 
            } 
            // 409 conflit status code. 
            if(error.response.status === 409) {
                return Promise.reject(error.response.data.error); 
   
            }
            return Promise.reject('Internal server error!'); 
        } else {
            return Promise.reject('Internal server error!'); 
        }
    }
}

// send user otp
export async function sendUserOTP(email, type="") {
    try{
        const {data, status} = await axios.post(`http://localhost:5000/${(type==='' ? 'users' : type)}/sendOTP`, {email}); 
        return Promise.resolve(data); 
    } catch(error) {
        console.log(error.response.status); 
        if(error.response.status === 400) {
            return Promise.reject({message:'Email is missing! Enter email address!'}); 
        }
        if(error.response.status === 404) {
            return Promise.reject({message:'Email doesnot exist. Please sign up first.'}); 
        }
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}

export async function verifUserOTP(email, otp, userType='') {
    try{
        const response = await axios.get(`http://localhost:5000/${(userType==='' ? 'users' : userType)}/${email}/verifyOTP/${otp}`);
        if(response.status === 200) {
            return Promise.resolve(response.data); 
        }
    } catch(error) {
        if(error.response.status === 400) {
            return Promise.reject({message:error.response.data.errorMessage}); 
        }
        if(error.response.status === 404) {
            return Promise.reject({message:'Email doesnot exist. Please sign up first.'}); 
        }
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}

// reset user papssword
export async function resetUserPassword(email, password, userType='') {
    try{
        console.log(email, password);
        const response = await axios.post(`http://localhost:5000/${(userType === '') ? 'users' : userType}/resetPassword`, {email:email, password:password});
        if(response.status === 200) {
            return Promise.resolve(response.data); 
        }
    } catch(error) {
        if(error.response.status === 400) {
            return Promise.reject({message:error.response.data.errorMessage}); 
        }
        if(error.response.status === 404) {
            return Promise.reject({message:'User not available. Please make sure to signup first.'}); 
        }
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}

// update profile 
export async function updateUserProfile({firstName, lastName}) {
    try{
        const response = await API.put('/users/updateUserDetails', {firstName, lastName});
        if(response.status === 200) {
            return Promise.resolve(response.data); 
        }
    } catch(error) {
        console.log(error);
        if(error.response.status === 400) {
            return Promise.reject({message:'UnAuthorized Access'}); 
        }
        if(error.response.status === 404) {
            return Promise.reject({message:'User not available. Please make sure to signup first.'}); 
        }
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}

// update user password 
export async function updateUserPassword({oldPassword, newPassword}) {
    try{
        console.log(oldPassword,newPassword)
        const response = await API.put('/users/updatePassword', {oldPassword, newPassword});
        if(response.status === 200) {
            return Promise.resolve(response.data); 
        }
    } catch(error) {
        console.log(error);
        if(error.response.status === 400) {
            return Promise.reject({message:error.response.data.errorMessage}); 
        }
        if(error.response.status === 404) {
            return Promise.reject({message:'User not available. Please make sure to signup first.'}); 
        }
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}

// admin api request 
export async function AdminLogin({email, password}) {
    try{
        const response = await API.post('/admin/signin', {email, password}); 
            return Promise.resolve(response.data); 
    } catch(error) {
        return Promise.reject({message:"Invalid Credentials"}) 
    }
}

// veiry master admin 
export async function verifyMasterAdmin() {
    try{
        const response = await API.get('/admin/verifyMasterAdmin');
            return Promise.resolve(response.data); 
    } catch(error) {
        console.log(error);
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}


// send user otp
export async function sendAdminOTP(email) {
    try{
        const {data, status} = await axios.post('http://localhost:5000/admin/sendotp', {email}); 
        return Promise.resolve(data); 
    } catch(error) {
        console.log(error.response.status); 
        if(error.response.status === 400) {
            return Promise.reject({message:'Email is missing! Enter email address!'}); 
        }
        if(error.response.status === 404) {
            return Promise.reject({message:'Email doesnot exist. Please sign up first.'}); 
        }
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}

// veirfy otp
export async function veirfyAdminOTP(email, otp) {
    try{
        const response = await axios.get(`http://localhost:5000/users/${email}/verifyOTP/${otp}`);
        if(response.status === 200) {
            return Promise.resolve(response.data); 
        }
    } catch(error) {
        if(error.response.status === 400) {
            return Promise.reject({message:error.response.data.errorMessage}); 
        }
        if(error.response.status === 404) {
            return Promise.reject({message:'Email doesnot exist. Please sign up first.'}); 
        }
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}



// get user list 
export async function getUserList() {
    try{
        const response = await API.get('http://localhost:5000/admin/getUserList');
        return response.data.userList;  
    } catch(error) {
        console.log(error); 
       return error;
    }
}


// Add user by admin 
export async function AddUserByAdmin(formData) {
    try{
        console.log({...formData}); 
        const response = await API.post('http://localhost:5000/admin/addUser', {...formData});
        return Promise.resolve(response.data); 
    } catch(error) {
        if(error.response.status === 400) {
            return Promise.reject({message:error.response.data.errorMessage}); 
        }
        if(error.response.status === 404) {
            return Promise.reject({message:'Email doesnot exist. Please sign up first.'}); 
        }
        return Promise.reject({message:'Something went wrong. Please try again later.'}); 
    }
}

// update user details by admin 
export async function updateUserByAdmin({id,firstName,lastName,password}) {
    try{
        const response = await API.put('http://localhost:5000/admin/updateUserDetails', {id, firstName, lastName, password});
        return Promise.resolve(response.data);  
    } catch(error) {
       return Promise.reject(error); 
    }
}
// delete user by admin
export async function deleteUserByAdmin(id) {
    try{
        const response = await API.post(`http://localhost:5000/admin/deleteUser`, {id});
        return Promise.resolve(response.data);  
    } catch(error) {
        console.log(error);
       return Promise.reject(error); 
    }
}