/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import ErrorPage from './components/ErrorPage';
import "./App.css";
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import JobPosting from './components/JobPosting';
import FLAppbar from './components/FLAppbar';
import Wallet from './components/Web3Wallet';
const App = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const UserCall = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);
      setIsLoading(false);

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    UserCall();
  }, []);

  return (
    <>
    {isLoading ? null : userData.designation ? <FLAppbar /> : < Navbar/>}
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/Web3" element={<Wallet />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/UserSignIn" element={<UserSignIn />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/UserSignUp" element={<UserSignUp />} />
      <Route path="/JobPosting" element={<JobPosting />} />
      <Route path="/UserSignOut" element={<UserSignOut />} />
    </Routes>
    </>
  )
}

export default App
