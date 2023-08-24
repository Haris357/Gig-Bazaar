/* eslint-disable no-unused-vars */
import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const UserSignOut = () => {
    debugger;
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
          try {
            const response = await fetch('/logout', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include',
            });
    
            if (response.status === 200) {
              // navigate('/', { replace: true });
              window.location.href = "/";
              const currentURL = window.location.href;
            } else {
              const error = new Error(await response.text());
              throw error;
            }
          } catch (err) {
            console.log(err);
          }
        };
    
        logout();
      }, [navigate]);
    
      return null;
}

export default UserSignOut
