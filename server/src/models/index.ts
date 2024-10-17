import dotenv from 'dotenv';
import path from 'path';
import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { TicketFactory } from './ticket.js';

const envPath = path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_URL:', process.env.DB_URL);


let sequelize: Sequelize;

try {
  if (process.env.DB_URL) {
    sequelize = new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      logging: console.log, // Remove this in production
    });
  } else if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD) {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: console.log, // Remove this in production
      dialectOptions: {
        decimalNumbers: true,
      },
    });
  } else {
    throw new Error('Database configuration is incomplete. Please check your environment variables.');
  }

  // Test the connection
  sequelize.authenticate()
    .then(() => console.log('Database connection has been established successfully.'))
    .catch((err) => console.error('Unable to connect to the database:', err));

} catch (error) {
  console.error('Error initializing Sequelize:', error);
  process.exit(1); // Exit the process if we can't initialize Sequelize
}

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser'});

export { sequelize, User, Ticket };
