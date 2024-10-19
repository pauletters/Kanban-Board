import React from 'react';
import Auth from './auth'; 

export interface WithAuthProps {
    checkAuth: () => boolean;
}

export const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
        const WithAuth: React.FC<Omit<P, keyof WithAuthProps>> = (props) => {
        const checkAuth = () => {
        return Auth.checkAuthAndRedirect();
    };
  
      return <WrappedComponent {...props as P} checkAuth={checkAuth} />;
    };

    return WithAuth;
  };
  
  export default withAuth;