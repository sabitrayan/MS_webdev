const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;
const secretKey = 'your-secret-key'; // Replace with a secure secret key

app.use(cors());
app.use(express.json());

// In-memory array to store posts
let posts = [
  { id: 1, text: 'This is post 1' },
  { id: 2, text: 'This is post 2' },
  { id: 3, text: 'This is post 3' },
];

// JWT middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(`Got error: ${err}`)
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Get all posts (protected route)
app.get('/api/posts', authenticateToken, (req, res) => {
  res.json(posts);
});

// Add a new post (protected route)
app.post('/api/posts', authenticateToken, (req, res) => {
  const { text } = req.body;
  const newPost = { id: posts.length + 1, text };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Edit a post (protected route)
app.put('/api/posts/:id', authenticateToken, (req, res) => {
  const postId = parseInt(req.params.id);
  const { text } = req.body;

  posts = posts.map((post) =>
    post.id === postId ? { ...post, text } : post
  );

  res.json(posts.find((post) => post.id === postId));
});

// Delete a post (protected route)
app.delete('/api/posts/:id', authenticateToken, (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.sendStatus(204);
});

// Login route to generate JWT token
app.post('/api/login', (req, res) => {
  // Replace this with your actual user authentication logic
  const user = { username: 'demo', password: 'password' };

  if (req.body.username === user.username && req.body.password === user.password) {
    const token = jwt.sign({ username: user.username }, secretKey);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
