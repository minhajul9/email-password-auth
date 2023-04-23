import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.config';




const Login = () => {

    const auth = getAuth(app)
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const emailRef = useRef();

    const handleLogIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('User logged successfully')
                setError('')
            })
            .catch(error => {
                setSuccess('')
                setError(error.message)
            })

    }

    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        if(!email){
            alert("Please provide your email address")
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(result=>{

        })
        .catch(error => setError(error.message))
    }

    return (
        <div className='w-25 mx-auto my-4'>
            <h3>Please Login</h3>
            <form onSubmit={handleLogIn}>
                <div className="form-group mt-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" ref={emailRef} name='email' className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control" id="password" placeholder="Password" required />
                </div>
                <div className="form-check mt-2">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Sign In</button>
            </form>

            <p><small>Forget Password? <button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>

            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;