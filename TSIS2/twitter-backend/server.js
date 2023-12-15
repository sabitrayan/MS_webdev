const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000; // Choose any port you prefer

app.use(cors());
app.use(express.json());

// In-memory array to store posts
let posts = [
  { id: 1, text: 'This is post 1' },
  { id: 2, text: 'This is post 2' },
  { id: 3, text: 'This is post 3' },
];

// Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Add a new post
app.post('/api/posts', (req, res) => {
  const { text } = req.body;
  const newPost = { id: posts.length + 1, text };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Edit a post
app.put('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { text } = req.body;

  posts = posts.map((post) =>
    post.id === postId ? { ...post, text } : post
  );

  res.json(posts.find((post) => post.id === postId));
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((post) => post.id !== postId);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
