// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import PostCreation from './components/PostCreation';
import LoginPage from './components/LoginPage';

function App() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const fetchedPosts = await response.json();
          setPosts(fetchedPosts);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const addPost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const addedPost = await response.json();
        setPosts([...posts, addedPost]);
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={login} />} />
          <Route
            path="/"
            element={
              token ? (
                <div>
                  <PostCreation onAddPost={addPost} />
                  <Feed posts={posts} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
