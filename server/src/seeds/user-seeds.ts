import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password' },
    { username: 'SunnyScribe', password: 'password' },
    { username: 'RadiantComet', password: 'password' },
  ], { individualHooks: true });

  console.log('Seeded users');
  const users = await User.findAll();
  users.forEach((user: { username: string; id: number }) => {
    console.log(`- ${user.username} (ID: ${user.id})`);
  });
};
