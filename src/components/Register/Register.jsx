import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)



const Register = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        setError('')
        setSuccess('')

        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        // console.log(name);

        if(!/(?=.*[A-Z])/.test(password)){
            setError("Password must contain uppercase letter");
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Password must contain at least two number');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('New user created successfully');
                setError('');
                sendVerificationEmail(result.user)
                updateUserData(result.user, name)
            })
            .catch(error => {
                console.error(error.message)
                setError(error.message)
            })
    }

    const sendVerificationEmail = user =>{
        sendEmailVerification(user)
        .then(result => {
            console.log(result)
        })
    }

    const handleEmailChange = event => {
        console.log(event.target.value);
    }

    const handlePasswordBlur = event => {
        console.log(event.target.value);

    }

    const updateUserData = (user, name) =>{
        updateProfile(user, {
            displayName: name
        })
        .then( () => console.log('user name updated'))
        .catch(error => setError(error.message))
    }

    return (
        <div className='w-25 mx-auto my-4'>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <input className='my-2'  type="text" name="name" id="name" placeholder='Enter Your Name' required />
                <br />
                <input className='my-2' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Enter Your Email' required />
                <br />
                <input className='my-2' onBlur={handlePasswordBlur} type={showPassword? 'text' : 'password'} name="password" id="password" placeholder='Enter Your Password' required />
                <button onClick={(event) => {
                    event.preventDefault();
                    setShowPassword(!showPassword)}}>
                    <img className='show-pass-icon' src={showPassword? 'Images/icons8-eye-24.png' : 'Images/icons8-hide-30.png'} alt="" />
                </button>
                <br />
                <input className='my-4' type="submit" value="Register" />
            </form>

            <p><small>Already have an account? <Link to='/login'>Login</Link></small></p>

            <p className='text-success'>{success}</p>
            <p className='text-danger'>{error}</p>
        </div>
    );
};

export default Register;