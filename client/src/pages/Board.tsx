import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import withAuth, { WithAuthProps } from '../utils/withAuth';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import auth from '../utils/auth';

interface BoardProps extends WithAuthProps {
  checkAuth: () => boolean;
}

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board: React.FC<BoardProps> = ({ checkAuth }) => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    if (checkAuth()) {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
    }
  };

  const handleNewTicket = (e: React.MouseEvent) => {
    if (!checkAuth()) {
      e.preventDefault();
      navigate('/login');
    }
  };

  const handleEditTicket = async (ticketId: number) => {
    if (checkAuth()) {
      navigate(`/edit/${ticketId}`);
    } else {
      navigate('/login');
    }
  };

  const deleteIndvTicket = async (ticketId: number) : Promise<ApiMessage> => {
    if (checkAuth()) {
    try {
      const data = await deleteTicket(ticketId);
      await fetchTickets();
      return data;
    } catch (err) {
      console.error('Failed to delete ticket:', err);
      return Promise.reject(err);
    }
  }
  navigate('/login');
  return Promise.reject(new Error('Not authenticated'));
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if(loginCheck) {
      fetchTickets();
    }
  }, [loginCheck, checkAuth]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
    {
      !loginCheck ? (
        <div className='login-notice'>
          <h1>
            Login to create & view tickets
          </h1>
        </div>  
      ) : (
          <div className='board'>
            <Link to='/create' onClick={handleNewTicket}>
            <button type='button' id='create-ticket-link'>New Ticket
              </button>
              </Link>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (
                  <Swimlane 
                    title={status} 
                    key={status} 
                    tickets={filteredTickets} 
                    deleteTicket={deleteIndvTicket}
                    editTicket={handleEditTicket}
                  />
                );
              })}
            </div>
          </div>
        )
    }
    </>
  );
};

export default withAuth(Board);
