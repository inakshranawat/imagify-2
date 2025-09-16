import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import Buy from './pages/Buy';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const {showLogin} = useContext(AppContext)
  return (
    <div className="px-10 min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <ToastContainer position='bottom-right'/>

      <Navbar />
      {showLogin && 
      <Login/>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<Buy />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
