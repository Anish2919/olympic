import React, {useContext, useState} from "react";
import SignUp from "../components/Signup.module.css";
import {Link,useNavigate} from "react-router-dom"

import {Toaster, toast} from 'react-hot-toast'; 
import { registerUser, registerUserByGoogleOauth } from "../api/APIRequests";

import {useGoogleLogin} from '@react-oauth/google'; 
import { CurrentUserContext } from "../App";
// import {useDispatch} from 'react-redux';
// import {signup, signupGoogle} from "../../redux/actions/auth";


const InitState = {
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    confirmPassword: ''
}


function Signup() {
    const nagivate = useNavigate();
    // const dispatch = useDispatch();
    const [sForm,setsForm] = useState(InitState)

    const handleChange = (e) => setsForm({
        ...sForm,
        [e.target.name]: e.target.value
    });

    const {setCurrentUser} = useContext(CurrentUserContext); 
    const navigate = useNavigate(); 

    function handleGoogleLoginSuccess(tokenResponse) {

        const accessToken = tokenResponse.access_token;

        const registerUserbyGoogleOauthPromise = registerUserByGoogleOauth(accessToken, setCurrentUser); 

        toast.promise(registerUserbyGoogleOauthPromise, {
                loading:'creating...', 
                success:(data) => <b>Sign up successfull</b>, 
                error: (error) => <b>{error}</b>
        }).then(() => {
            setTimeout(() => {
                navigate('/')
            }, 500);
        })

        // dispatch(signupGoogle(accessToken,nagivate))
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            // dispatch(signup(sForm,nagivate))
            // signup post api 
            console.log({...sForm}); 
            const registerUserPromise = registerUser({...sForm}); 

            toast.promise(registerUserPromise, {
                loading:'creating...', 
                success:(data) => <b>{data.message}</b>, 
                error: (error) => <b>{error}</b>
            })

        }
    }

    const login = useGoogleLogin({onSuccess:handleGoogleLoginSuccess}); 

    // const login = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
    return (
        <>
        <Toaster/>
        <div className={SignUp.loginContainer}>
            <div className={SignUp.loginContainerv2}>
                <h1>Create your account</h1>

                <div className={SignUp.inputContainer}>
                    <label>FRIST NAME</label>
                    <input onChange={handleChange} name="firstName" placeholder="enter your first name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>LAST NAME</label>
                    <input name="lastName" onChange={handleChange} placeholder="enter your last name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>EMAIL</label>
                    <input name="email" onChange={handleChange} placeholder="enter your email" type="email"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>PASSWORD</label>
                    <input name="password" onChange={handleChange} placeholder="enter your password" type="password"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>CONFIRM PASSWORD</label>
                    <input name="confirmPassword" onChange={handleChange} placeholder="retype your password" type="password"/>
                </div>

                <div className={SignUp.footerContainer}>
                        <div>
                            Already Signed Up? <Link to="/signin">Login</Link>
                        </div>
                        <div>
                            <Link to="/forgetpassword">Forgot Password?</Link>
                        </div>
                    </div>

                <button onClick={handleOnSubmit} className={SignUp.loginBTN}>REGISTER</button>
                 <span className={SignUp.or}>or</span>
                 <button  onClick={() => login()}  className={SignUp.googleBTN}>
                  Sign up with google</button>

                 
            </div>

        </div>
        </>
    )
}

export default Signup;