import React, { useState } from "react";

export function User({ user, onDelete, onSave }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const onChange = (event) => {
    const { value, name } = event.target;

    setUserData({...userData, [name]: value });
  };

  const onSaveUser = () => {
    onSave(user.id, userData);
    setIsEditMode(false);
  };

  return (
    <div>
      {
        isEditMode && (
          <>
            <label htmlFor="firstName">First name</label>
            <input type="text" name="firstName" value={userData.firstName} onChange={onChange} />

            <label htmlFor="lastName">Last name</label>
            <input type="text" name="lastName" value={userData.lastName} onChange={onChange} />

            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={userData.email} onChange={onChange} />

            <button onClick={() => onSaveUser()}>Save</button>
            <button onClick={() => setIsEditMode(false)}>Cancel</button>
          </>
        )
      }
      {
        !isEditMode && (
          <>
            <h2>{user.firstName} {user.lastName}</h2>
            <p>Email: {user.email}</p>

            <div>
              <button onClick={() => onDelete(user.id)}>Delete</button>
              <button onClick={() => setIsEditMode(!isEditMode)}>Edit</button>
            </div>
          </>
        )
      }
    </div>
  );
}