import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Signout = () => {
    const {navigate} = useNavigate();
    useEffect(() => {
       localStorage.removeItem('username')
          navigate("/");
      }, []);
    }

export default Signout