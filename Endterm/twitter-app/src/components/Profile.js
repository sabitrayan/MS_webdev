import React, { useState, useEffect } from 'react';
import './styles/Profile.css';

function Profile() {
  const [profileData, setProfileData] = useState({
    username: '',
    fullName: '',
    bio: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('profileData'));
    if (savedData) {
      setProfileData(savedData);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    localStorage.setItem('profileData', JSON.stringify(profileData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      {isEditing ? (
        <div className="profile-info-edit">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={profileData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Bio:</label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
            />
          </div>
          <button className="save-profile-button" onClick={handleSaveClick}>
            Save Profile
          </button>
        </div>
      ) : (
        <div className="profile-info">
          <h2>{profileData.fullName}</h2>
          <p>Username: {profileData.username}</p>
          <p>{profileData.bio}</p>
          <button className="edit-profile-button" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
