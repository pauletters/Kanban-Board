import { Link } from 'react-router-dom';

import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

// This component is responsible for rendering a ticket card
interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
  editTicket: (ticketId: number) => void; 
}

// This component is responsible for rendering a ticket card
const TicketCard: React.FC<TicketCardProps> = ({ ticket, deleteTicket, editTicket }) => {

  // This function will handle the deletion of a ticket
  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    if (!isNaN(ticketId)) {
      try {
        const data = await deleteTicket(ticketId);
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <Link to='/edit' state={{id: ticket.id}} type='button' className='editBtn' onClick={() => 
        ticket.id !== null && editTicket(ticket.id)}>Edit</Link>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;
