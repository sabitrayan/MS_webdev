import React, { useState } from 'react';
import './styles/PostCreation.css';

function PostCreation({ onAddPost }) {
  const [postText, setPostText] = useState('');

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      text: postText,
    };

    onAddPost(newPost);

    setPostText('');
  };

  return (
    <div className="post-creation-container">
      <h2>Create a New Post</h2>
      <form onSubmit={handlePostSubmit}>
        <textarea
          rows="4"
          placeholder="What's on your mind?"
          value={postText}
          onChange={handlePostTextChange}
        />
        <button type="submit" className="create-post-button">
          Post
        </button>
      </form>
    </div>
  );
}

export default PostCreation;
