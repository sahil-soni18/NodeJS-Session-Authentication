import express from 'express';
import session from 'express-session';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 3000;

// Middleware for parsing JSON request bodies

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Session Middleware
app.use(
    session({
      secret: 'session_management-key', // Used to sign the session ID
      resave: false, // Prevents resaving sessions if nothing changed
      saveUninitialized: false, // Prevents saving empty sessions
      cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // 1-hour session
    })
);

// Dummy data

const users = [
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 10) },
  { id: 2, username: 'user2', password: bcrypt.hashSync('password2', 10) },
];


// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
  
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Store user session data
    req.session.user = { id: user.id, username: user.username };
    res.json({ message: 'Login successful' });
  });
  
  // Protected Route
  app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: `Welcome ${req.session.user.username}` });
  });
  
  // Logout Route
  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ message: 'Error logging out' });
      res.json({ message: 'Logged out successfully' });
    });
  });
  
  const server  = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  export {app, server};