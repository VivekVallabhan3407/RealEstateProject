import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css'
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Listings from "./pages/Listings";
import PropertyDetails from "./pages/PropertyDetails";
import Contact from './components/Contact';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

function App() {


  const Home = () => (
    <div className='w-full overflow-hidden'>
      <ToastContainer />
      <Header />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* HOME PAGE ROUTE */}
        <Route path="/" element={<Home />} />

        {/* LISTINGS PAGE ROUTE */}
        <Route path="/properties" element={<Listings />} />

        {/* DETAILS PAGE ROUTE */}
        <Route path="/properties/:id" element={<PropertyDetails />} />

        <Route path="/listings" element={<Listings />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
