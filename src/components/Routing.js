import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginScreen from '../screens/LoginScreen'
import UploadWordScreen from '../screens/UploadWordScreen'
import Word from './Word'
import WordDetails from './WordDetails'
import Details from './Details'
import Activity from './Activity'
import Update from './Update'

const Routing = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<LoginScreen/>} />
            <Route path='/word' element={<Word/>} />
            <Route path='/details' element={<Details/>} />
            <Route path='/worddetails' element={<WordDetails/>} />
            <Route path='/uploadword' element={<UploadWordScreen/>} />
            <Route path='/activity' element={<Activity/>} />
            <Route path='/edit' element={<Update/>} />
            <Route path='*' element={<h1>404 Page Not Found</h1>} />
        </Routes>
    </Router>
  )
}
export default Routing