import React from 'react';

export const ProfilePicture = ({ size, image_path }) => {
  return (
    <div className={`image-label ${size}`}>
      <div className="image-container" style={{backgroundImage: `url("/profile-images/${image_path}")` }}>
      </div>
    </div>
  )
};
