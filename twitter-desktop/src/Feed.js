import React, { useState } from 'react';

const Feed = ({ posts, addPost }) => {
  const [newPost, setNewPost] = useState('');

  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      addPost(newPost);
      setNewPost('');
    }
  };

  return (
    <div>
      <h1>Feed</h1>
      <div>
        <input
          type="text"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's happening?"
        />
        <button onClick={handleAddPost}>Post</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.content} <button>Edit</button> <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
