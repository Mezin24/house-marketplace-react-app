import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { ReactComponent as ArrowIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import hiddenIcon from '../assets/svg/hide-private-hidden-icon.svg';

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [enteredValues, setEnteredValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { name, email, password } = enteredValues;

  const onInputChangeHandler = (e) => {
    setEnteredValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...enteredValues };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='name'
              name='name'
              className='nameInput'
              onChange={onInputChangeHandler}
              value={name}
            />
            <input
              type='email'
              placeholder='Email'
              name='email'
              className='emailInput'
              onChange={onInputChangeHandler}
              value={email}
            />
            <div className='passwordInputDiv'>
              <input
                type={isVisible ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                name='password'
                onChange={onInputChangeHandler}
                value={password}
              />
              {isVisible ? (
                <img
                  src={hiddenIcon}
                  alt='hide password'
                  className='showPassword'
                  onClick={toggleVisibility}
                />
              ) : (
                <img
                  src={visibilityIcon}
                  alt='show password'
                  className='showPassword'
                  onClick={toggleVisibility}
                />
              )}
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password
            </Link>
            <div className='signInBar'>
              <p className='signInText'>Sign Up</p>

              <button className='signInButton'>
                <ArrowIcon fill='#fff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          {/* Google Auth */}
          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignIn;
