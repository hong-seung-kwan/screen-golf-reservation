import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import React from 'react'
import Homepage from './pages/HomePage';
import ReservationPage from './pages/ReservationPage';
import MyReservationsPage from './pages/MyReservationPage';
import Navbar from './components/Navbar';
import StoreListPage from './pages/StoreListPage';
import StoreDetailPage from './pages/StoreDetailPage';
import Step1 from './pages/reservation/Step1';
import Step2 from './pages/reservation/Step2';
import Step3 from './pages/reservation/Step3';
import SearchPage from './pages/SearchPage';
function App() {
  

  return (
    
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/reservation/step1" element={<Step1/>}></Route>
        <Route path="/reservation/step2" element={<Step2 />}></Route>
        <Route path="/reservation/step3" element={<Step3 />}></Route>
        <Route path="/SearchPage" element={<SearchPage/>}></Route>
        <Route path="/stores" element={<StoreListPage />} />
        <Route path="/store/:id" element={<StoreDetailPage/>}></Route>
        <Route path="/reserve" element={<ReservationPage/>}></Route>
        <Route path="/my-reservations" element={<MyReservationsPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App
