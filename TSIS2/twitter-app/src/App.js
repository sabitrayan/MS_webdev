import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Post from './components/Post';
import Profile from './components/Profile';
import PostCreation from './components/PostCreation';
import EditPost from './components/EditPost';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (response.ok) {
          const fetchedPosts = await response.json();
          console.log('Printing fetchedPosts')
          console.log(fetchedPosts)
          setPosts(fetchedPosts);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
    // const samplePosts = [
    //   { id: 1, text: 'This is post 1' },
    //   { id: 2, text: 'This is post 2' },
    //   { id: 3, text: 'This is post 3' },
    // ];
    // console.log('Printing samplePosts')
    // console.log(samplePosts)
    // setPosts(samplePosts);
  }, []);

  const addPost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        const addedPost = await response.json();
        console.log('Printing addedPost')
        console.log(addedPost)
            setPosts([...posts, addedPost]);
      } else {
        console.error('Failed to add post');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  // const addPost = (newPost) => {
  //   console.log('Printing newPost')
  //   console.log(newPost)
  //   setPosts([...posts, newPost]);
  // };

  const editPost = (postId, newText) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, text: newText } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <PostCreation onAddPost={addPost} />
                <Feed posts={posts} onEditPost={editPost} />
              </div>
            }
          />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
