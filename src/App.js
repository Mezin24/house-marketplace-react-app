import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Explore from './pages/Explore';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Explore />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
      <ToastContainer />
      <Navbar />
    </Router>
  );
};

export default App;
