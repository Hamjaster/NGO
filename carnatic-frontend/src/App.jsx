import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import DonationForm from './components/DonationForm'
import Explore from './components/Explore'
import Footer from './components/Footer'
import Dropdown from './components/Dropdown'
import Thanks from './components/Thanks'
import VerifyCarnaticMemberModal from './components/VerifyCarnaticMemberModal'
import Amount from './components/Amount'
import Terms from './components/Terms'
import Privacy from './components/Privacy'
import { Toaster } from 'react-hot-toast'


function App() {


  return (
    <div className='flex bg-[#f4f9fa] flex-col font-roboto'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dropdown' element={<Dropdown />} />
        <Route path='/donate' element={<DonationForm />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/thanks' Component={Thanks} />
        <Route path='/verify' element={<VerifyCarnaticMemberModal />} />
        <Route path='/amount' Component={Amount} />
        <Route path='/terms-and-conditions' element={<Terms />} />
        <Route path='/privacy-policy' element={<Privacy />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
