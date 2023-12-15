import React, { useState } from 'react';
import './styles/Feed.css';
import EditPost from './EditPost';

function Feed({ posts, onEditPost }) {
  const [likes, setLikes] = useState({});
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handleEditClick = (post) => {
    setEditingPost(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };


  const handleLike = (postId) => {
    setLikes({ ...likes, [postId]: (likes[postId] || 0) + 1 });
  };

  const handleDislike = (postId) => {
    setLikes({ ...likes, [postId]: (likes[postId] || 0) - 1 });
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Post deleted successfully');
        // You may want to update the state to reflect the changes
        // For example, you can refetch the posts after deleting one
        // or update the state without making an additional request
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }

    setDeletedPosts([...deletedPosts, postId]);
  };

  const isDeleted = (postId) => {
    return deletedPosts.includes(postId);
  };


  return (
    <div className="feed-container">
      <h1>Feed</h1>
      {posts.map((post) => (
        !isDeleted(post.id) && (
          <div className="post" key={post.id}>
            <p className="post-text">{post.text}</p>
            <div className="post-actions">
              <button className="button" onClick={() => handleLike(post.id)}>
                Like
              </button>
              <button className="button" onClick={() => handleDislike(post.id)}>
                Dislike
              </button>
              <span className="like-count">
                Likes: {likes[post.id] || 0}
              </span>
              <button className="delete-button" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default Feed;
