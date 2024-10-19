import React from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './auth'; 

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const navigate = useNavigate();

    const checkAuth = () => {
        if (!Auth.loggedIn()) {
          navigate('/login');
          return false;
        }
        return true;
      };
  
      return <WrappedComponent {...props} checkAuth={checkAuth} />;
    };
  };
  
  export default withAuth;