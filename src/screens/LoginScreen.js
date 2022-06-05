import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../firebase'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField';

const LoginScreen = () => {
    const validate = Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    })
    const emailRef= useRef();
    const passwordRef = useRef();
    const auth = getAuth();
    let navigate = useNavigate();

    async function handleLogin(){
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/uploadword' , { replace: true })
    };
    
    const forgotPasswordHandler = () => {
      const email = emailRef.current.value;
      if (email){
        sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("reset password sent to your email")
        emailRef.current.value = "";
        })
      }
    };

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={validate}>
        {formik=> (
          <div className="form-container">
            <div className="register-form">
              <h1 className="title">Login</h1>
                  <TextField placeholder="Email"  reff={emailRef} name="email" type="email"/>
                  <TextField placeholder="Password" reff={passwordRef} name="password" type="password"/>
                  <button className="form-field" type="submit" onClick={handleLogin}>Login</button>
                  <button className="form-field" onClick={forgotPasswordHandler}>Forgot Password?</button>
            </div>
          </div>
        )}
    </Formik>
  )
}
export default LoginScreen