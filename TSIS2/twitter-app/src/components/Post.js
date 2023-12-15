import React from 'react';
import './styles/Post.css';

function Post() {
  return (
    <div className="post-container">
      <h1>Post</h1>
      <div className="post-content">
        <p className="post-text">This is a single post.</p>
        <div className="action-buttons">
          <button className="button">Like</button>
          <button className="button">Dislike</button>
          <button className="button">Edit</button>
          <button className="button">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Post;
