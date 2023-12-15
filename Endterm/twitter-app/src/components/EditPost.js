import React, { useState } from 'react';

function EditPost({ post, onEditPost, onCancel }) {
  const [editedText, setEditedText] = useState(post.text);

  const handleEdit = () => {
    onEditPost(post.id, editedText);
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <textarea
        rows="4"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
      ></textarea>
      <button onClick={handleEdit}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default EditPost;
