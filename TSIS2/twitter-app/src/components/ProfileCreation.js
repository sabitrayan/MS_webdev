import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ProfileCreation.css';

function ProfileCreation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    bio: '',
  });

  React.useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('profileData'));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Created:', formData);

    localStorage.setItem('profileData', JSON.stringify(formData));

    navigate('/feed');
  };

  return (
    <div className="profile-creation-container">
      <h1>Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <button className="create-profile-button" type="submit">
          Create Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileCreation;
