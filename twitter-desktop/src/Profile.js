import React, { useState } from 'react';

const Profile = ({ user, updateUser }) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  const handleUpdate = () => {
    updateUser({ name, bio });
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Bio:</label>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Profile;

