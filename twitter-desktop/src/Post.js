import React from 'react';

const Post = ({ post }) => {
  return (
    <div>
      <h1>{post.content}</h1>
      <button>Like</button> <button>Dislike</button>
    </div>
  );
};

export default Post;
