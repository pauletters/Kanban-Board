import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

// This component is responsible for rendering a swimlane for each status
interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
  editTicket: (ticketID: number) => void;
}

// This component will render a swimlane for each status
const Swimlane = ({ title, tickets, deleteTicket, editTicket }: SwimlaneProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'swim-lane todo';
      case 'In Progress':
        return 'swim-lane inprogress';
      case 'Done':
        return 'swim-lane done';
      default:
        return 'swim-lane';
    }
  };

  return (
    <div className={`swimlane ${getStatusClass(title)}`}>
      <h2>{title}</h2>
      {tickets.map(ticket => (
        <TicketCard 
          key={ticket.id}
          ticket={ticket}
          deleteTicket={deleteTicket}
          editTicket={editTicket}
        />
      ))}
    </div>
  );
};

export default Swimlane;
