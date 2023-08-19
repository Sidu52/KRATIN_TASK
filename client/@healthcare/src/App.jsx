import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Home from './pages/home/Home';
import Footer from './component/footer/Footer';
import Doctor from './pages/doctor/Doctor';
import RegisterDoctor from './pages/registerDoctor/registerDoctor';
import Appointment from './pages/appointment/Appointment';
import RegisterUser from './pages/userRegisterLogin/RegisterUser';
import LoginUser from './pages/userRegisterLogin/loginUser';
import DailyRoutine from './pages/dailyRoutine/dailyRoutine';

// import Background2 from './assets/background.jpg';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctor/register" element={<RegisterDoctor />} />
          <Route path="/user/appointment/:doctorId" element={<Appointment />} />
          <Route path="/user/register" element={<RegisterUser />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/routine" element={<DailyRoutine />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />

    </div>
  )
}
