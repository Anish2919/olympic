import React, {useContext, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import LoginStyles from "../../login/SignIn.module.css";
import {Toaster, toast} from 'react-hot-toast'; 
import { CurrentUserContext } from "../../../App";
import { AdminLogin } from "../../../api/APIRequests";


function AdminSignIn() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate ()

    const {setCurrentUser} = useContext(CurrentUserContext); 

    function handleSubmit(e){
        e.preventDefault();
        if(email !== "" && password !== ""){
            const loginUserPromise = AdminLogin({email, password}); 
            toast.promise(loginUserPromise, {
                loading: <b>Logging..</b>, 
                success: (data) => <b>Successfully logged In</b>, 
                error: (error) => <b>{error.message}</b>
            })
            .then(data => {
                // save to local storage
                localStorage.setItem('user_info', JSON.stringify(data.result));
                localStorage.setItem('access_token', data.jwt_token);
                setCurrentUser(data.result);
                navigate('/admin/adminpanel');
            }) 
        } else {
            alert("Please fill up the form before loggin")
        }
    }

    return (
        <div className={LoginStyles.loginContainer}>
            <Toaster/>
            <div className={LoginStyles.loginContainerv2}>
                <h1>Admin Login Page</h1>

                <div className={LoginStyles.inputContainer}>
                    <label>EMAIL</label>
                    <input onChange={e=> setEmail(e.target.value)} placeholder="enter your email" type="email" autoComplete="on"/>
                </div>

                <div className={LoginStyles.inputContainer}>
                    <label>PASSWORD</label>
                    <input onChange={e=> setPassword(e.target.value)} placeholder="enter your password" type="password"/>
                </div>

                <div className={LoginStyles.forgetmeContainer}>
                    <div>
                        Remember Me <input type="checkbox" />
                    </div>
                    <div>
                        <Link to="/admin/forgetpassword">Forgot password?</Link>
                    </div>
                </div>

                <button onClick={handleSubmit} className={LoginStyles.loginBTN}>LOGIN</button> 
                <span className={LoginStyles.notreg}>Not registered yet?  
                <Link className={LoginStyles.singupBTN} to="/signup">Signup</Link></span>
                    
            </div>

        </div>
    )
}

export default AdminSignIn;
