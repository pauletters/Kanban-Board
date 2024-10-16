import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Finds the user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Checks if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Creates a token
    const token = jwt.sign(
      {id: user.id, username: user.username},
      process.env.JWT_SECRET_KEY as string,
      {expiresIn: '1h'}
    );

    // Returns the token
    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'A login error occurred' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
