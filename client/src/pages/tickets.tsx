import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Tickets() {
  const [authenticated, setAuthenticated] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setAuthenticated(loggedInUser);
    }
  }, []);

  if (!authenticated) {
    return <Navigate replace to='/' />;
  }
  return <div>tickets</div>;
}
