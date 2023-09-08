/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import DeverseWaitingList from './components/deversewaitinglist';
import '../src/App.css'
const App = () => {
  return (
    <>
    <Routes>
      <Route exact path="/" element={<DeverseWaitingList />} />
    </Routes>
    </>
  )
}

export default App
