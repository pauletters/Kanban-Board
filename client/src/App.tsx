import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Auth from './utils/auth';

function App() {
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (Auth.loggedIn()) {
          console.log('Logged out due to inactivity');
          Auth.logout();
        }
      }, 1 * 60 * 1000); // 5 minutes of inactivity
    };

    // Set up event listeners
    window.addEventListener('mousemove', resetInactivityTimer);
    window.addEventListener('keypress', resetInactivityTimer);

    // Initial setup
    resetInactivityTimer();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, []);

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
