import './sign.scss'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authSuccess, authRejected } from '../../redux/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/alert/alert';

function Sign() {
  const signInState = {
    email: '',
    password: ''
  };
  const signUpState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: ''
  };
  const [dataSignIn, setDataSignIn] = useState(signInState);
  const [dataSignUp, setDataSignUp] = useState(signUpState);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputSignUp, setInputSignUp] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setInputSignUp(!inputSignUp);
    setErrorMessage('');
  };

  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/v1/user/login',
      data: dataSignIn
    })
      .then((res) => {
        dispatch(authSuccess(res.data.body.token));
        sessionStorage.setItem('token', res.data.body.token);
        if (rememberMe) {
          localStorage.setItem('token', res.data.body.token);
        }
        navigate(`/profile`);
        setDataSignIn(signInState);
      })
      .catch((err) => {
        setDataSignIn(signInState);
        dispatch(authRejected());
        setErrorMessage(err.response.data.message);
      });
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/v1/user/signup',
      data: dataSignUp
    })
      .then(() => {
        handleSubmitSignIn(e);
        setDataSignIn(signInState);
        setDataSignUp(signUpState);
      })
      .catch((err) => {
        setDataSignUp(signUpState);
        setDataSignIn(signInState);
        dispatch(authRejected());
        setErrorMessage(err.response.data.message);
      });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleInfoChange = (e, info) => {
    setErrorMessage('');
    if (info === 'email') {
      setDataSignIn({ ...dataSignIn, email: e.target.value });
      setDataSignUp({ ...dataSignUp, email: e.target.value });
    } else if (info === 'password') {
      setDataSignIn({ ...dataSignIn, password: e.target.value });
      setDataSignUp({ ...dataSignUp, password: e.target.value });
    } else if (info === 'userName') {
      setDataSignUp({ ...dataSignUp, userName: e.target.value });
    } else if (info === 'firstName') {
      setDataSignUp({ ...dataSignUp, firstName: e.target.value });
    } else {
      setDataSignUp({ ...dataSignUp, lastName: e.target.value });
    }
  };

  const navigateToUser = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigateToUser('/profile');
    }
  }, [token, navigateToUser]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1 style={{ display: !inputSignUp ? '' : 'none' }}>Sign In</h1>
        <h1 style={{ display: inputSignUp ? '' : 'none' }}>Sign Up</h1>
        <form
          onSubmit={handleSubmitSignIn}
          style={{ display: !inputSignUp ? '' : 'none' }}
        >
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={dataSignIn.email}
              onChange={(e) => handleInfoChange(e, 'email')}
              minLength={5}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={dataSignIn.password}
              onChange={(e) => handleInfoChange(e, 'password')}
              minLength={10}
              required
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
        <form
          onSubmit={handleSubmitSignUp}
          style={{ display: inputSignUp ? '' : 'none' }}
        >
          <div className="input-wrapper">
            <label htmlFor="firstname">FirstName</label>
            <input
              type="text"
              id="firstname"
              value={dataSignUp.firstName}
              onChange={(e) => handleInfoChange(e, 'firstName')}
              minLength={5}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastname">LastName</label>
            <input
              type="text"
              id="lastname"
              value={dataSignUp.lastName}
              onChange={(e) => handleInfoChange(e, 'lastName')}
              minLength={5}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={dataSignUp.userName}
              onChange={(e) => handleInfoChange(e, 'userName')}
              minLength={5}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={dataSignUp.email}
              onChange={(e) => handleInfoChange(e, 'email')}
              minLength={5}
              required
            />
          </div>          
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={dataSignUp.password}
              onChange={(e) => handleInfoChange(e, 'password')}
              minLength={10}
              required
            />
          </div>                    
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">Sign Up</button>
        </form>
        <button onClick={handleToggleForm} className="sign-in-button">
          {inputSignUp ? 'Back To Sign In' : 'Sign Up'}
        </button>
        {errorMessage && <Alert alert={errorMessage} />}
      </section>
    </main>
  );
}

export default Sign;