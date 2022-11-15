import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactComponent as ArrowIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import hiddenIcon from '../assets/svg/hide-private-hidden-icon.svg';

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { email, password } = enteredValues;

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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              className='emailInput'
              onChange={onInputChangeHandler}
              value={enteredValues.email}
            />
            <div className='passwordInputDiv'>
              <input
                type={isVisible ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                name='password'
                onChange={onInputChangeHandler}
                value={enteredValues.password}
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
              <p className='signInText'>Sign In</p>

              <button className='signInButton'>
                <ArrowIcon fill='#fff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          {/* Google Auth */}
          <Link to='/sign-up' className='registerLink'>
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignIn;
