import jwt from 'jsonwebtoken';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const app = express();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT),
});

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}));

app.use(express.json());

app.post('/register', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
            [name, email, hashedPassword]
        );
        res.status(201).json({ userId: result.rows[0].id });
    } catch (error: any) {
        if (error.code === '23505'){
            res.status(400).json({ error: 'Email already exists' });
        } else{
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// /login route
// update the /login route with code that creates a JWT token using jwt.sign() and sends it back to the client in the response. The token should include the user's email and a unique identifier (e.g., user ID) as payload, and should be signed with a secret key stored in an environment variable (e.g., JWT_SECRET). The response should also include a success message and the token itself.
app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '7d' });
            res.status(200).json({ message: 'Login successful', token, name: user.name });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
