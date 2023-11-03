import React, { useState } from 'react';
import Feed from './Feed';
import Post from './Post';
import Profile from './Profile';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, content: 'Berga' },
    { id: 2, content: 'Post' },
  ]);

  const [user, setUser] = useState({ name: 'Berga', bio: 'Senior Web Developer' });

  const addPost = (content) => {
    const newPost = { id: Date.now(), content };
    setPosts([...posts, newPost]);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="App">
      <Feed posts={posts} addPost={addPost} />
      <Post post={posts[0]} />
      <Profile user={user} updateUser={updateUser} />
    </div>
  );
}

export default App;
