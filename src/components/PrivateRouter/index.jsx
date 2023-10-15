import React from 'react';
import { Route, redirect, Navigate } from 'react-router-dom';

const PrivateRouter = ({ children, pathRedirect }) => {
  
  const auth = localStorage.getItem('auth/login');

  if(auth){
    return (
      children 
   );
  }else{
    
    return (<Navigate to={pathRedirect} replace />);
  }
};

export default PrivateRouter;
