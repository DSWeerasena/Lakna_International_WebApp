import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// In a real app, you'd import getDb here. 
// For this environment, we'll implement a robust mock/fallback for the demo
// until the user provides real SQL credentials.

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'lakna_super_secret_key';

// Mock users for the demo
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@lakna.com',
    password: '$2a$10$rBp/Gid6tWj6mS9.yZ9ueO3jT1.Z7N0pY.yZ9ueO3jT1.Z7N0pY', // 'password123'
    name: 'Shanuka Weerasena',
    role: 'ADMIN'
  }
];

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user (Mocking SQL query)
    const user = MOCK_USERS.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Check password
    // In real app: const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === 'password123'; 

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
