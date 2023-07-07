import React, {useContext, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import LoginStyles from "./SignIn.module.css";
import {useGoogleLogin} from '@react-oauth/google';
import {Toaster, toast} from 'react-hot-toast'; 
import { loginUser, loginUserGoogleOauth } from "../../api/APIRequests";
import { CurrentUserContext } from "../../App";

function SignIn() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [show, setShow] = useState(false); 

    const navigate = useNavigate ()

    const {setCurrentUser} = useContext(CurrentUserContext); 


    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;
        // login api post using google
        const loginUserPromise = loginUserGoogleOauth(accessToken, setCurrentUser); 
            toast.promise(loginUserPromise, {
                loading: <b>Logging..</b>, 
                success: (data) => {
                    console.log(data); 
                    return (<b>Successfully logged In</b>)
                }, 
                error: (err) => <b>{err}</b>
            }).then((data) => {
                navigate('/');
            }); 
    }
    const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    function handleSubmit(e){
        e.preventDefault();
        if(email !== "" && password !== ""){
            // login using password and email
            const loginUserPromise = loginUser({email, password, setCurrentUser}); 
            toast.promise(loginUserPromise, {
                loading: <b>Logging..</b>, 
                success: (data) => <b>Successfully logged In</b>, 
                error: (err) => <b>{err}</b>
            }).then(() => {
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            })
        }
    }

    return (
        <div className={LoginStyles.loginContainer}>
            <Toaster/>
            <div className={LoginStyles.loginContainerv2}>
                <h1>Welcome back</h1>

                <div className={LoginStyles.inputContainer}>
                    <label>EMAIL</label>
                    <input onChange={e=> setEmail(e.target.value)} placeholder="enter your email" type="email"/>
                </div>

                <div className={LoginStyles.inputContainer}>
                    <label>PASSWORD</label>
                    <input onChange={e=> setPassword(e.target.value)} placeholder="enter your password" type={(show) ? 'text' : 'password'}/>
                </div>

                <button type="button" onClick={() => setShow(!show)} className="btn btn-secondary  mt-3 ms-1">show</button>
                <div className={LoginStyles.forgetmeContainer}>
                    <div>
                        Remember Me <input type="checkbox" />
                    </div>
                    <div>
                        <Link to="/forgetpassword">Forgot password?</Link>
                    </div>
                </div>

                <button onClick={handleSubmit} className={LoginStyles.loginBTN}>LOGIN</button>
                <span className={LoginStyles.or}>or</span>
                 <button onClick={() => login()} className={LoginStyles.googleBTN}>
                    Sign in with google</button>
                
                    
                    <span className={LoginStyles.notreg}>Not registered yet?  <Link className={LoginStyles.singupBTN} to="/signup">Signup</Link></span>
                    
            </div>

        </div>
    )
}

export default SignIn;
