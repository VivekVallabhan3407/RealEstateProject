import React from 'react'
import { Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css'
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import Contact from './components/Contact';
import Wishlist from "./pages/Wishlist";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MortgageCalculator from './pages/MortgageCalculator';

import Footer from './components/Footer';

function App() {


  const Home = () => (
    <div className='w-full overflow-hidden'>
      <Header />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
        {/* HOME PAGE ROUTE */}
        <Route path="/" element={<Home />} />

        {/* LISTINGS PAGE ROUTE */}
        <Route path="/properties" element={<Listings />} />


        <Route path="/listings" element={<Listings />} />


        {/* DETAILS PAGE ROUTE */}
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/mortgage" element={<MortgageCalculator />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </>

  );
}

export default App
