import React, { useState, useEffect } from 'react';
import Style from './AddPeopleModal.module.css';
import axios from 'axios';
import { useProjectContext } from '../../../../Context/ProjectContext';

const AddPeopleModal = ({ close, updateUsers }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]); // State to track all users
  const [filteredUsers, setFilteredUsers] = useState([]); // State to track filtered users based on search input

  const { projectDetails } = useProjectContext();
  const projectId = projectDetails?._id;
  const token = localStorage.getItem('token');

  // Fetch users initially when the modal is opened
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/projects/getusers/${projectId}`, {
          headers: {
            Authorization: `${token}`, // Ensure Bearer token format
          },
        });
        setUsers(response.data); // Store all users
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    if (projectId && token) {
      fetchUsers();
    }
  }, [projectId, token]);

  // Filter users based on input email
  useEffect(() => {
    if (email) {
      setFilteredUsers(users.filter(user => user.email.toLowerCase().includes(email.toLowerCase())));
    } else {
      setFilteredUsers([]); // Clear the suggestions if no input
    }
  }, [email, users]);

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/api/send-invite',
        {
          email,
          projectId, // Ensure the project ID is included in the invite request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the token is sent
          },
        }
      );

      if (response.status === 200) {
        setMessage('Invitation sent successfully!');
        setEmail('');

        // Add the new user to the users array
        setUsers((prevUsers) => [...prevUsers, { email }]);

        // Call the parent component function to update the list
        updateUsers(email);
      } else {
        setMessage('Failed to send the invitation.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === Style.Modal) {
      close(false);
    }
  };

  return (
    <div className={Style.Modal} onClick={handleOverlayClick}>
      <div className={Style.Modalcon}>
        <div>
          <h3 className={Style.h3}>Add People to project</h3>

          <div className={Style.ipfont}>
            <label>Email</label> <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Search for user email"
              required
              className={Style.ip}
            />
            {/* Show filtered users as suggestions below the input */}
            {filteredUsers.length > 0 && (
              <ul className={Style.suggestions}>
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className={Style.suggestionItem}
                    onClick={() => setEmail(user.email)} // Set the clicked email in the input
                  >
                    {user.email}
                  </li>
                ))}
              </ul>
            )}
            <br />
            <label htmlFor="access">
              Role
              <select name="access" id="access" className={Style.ip}>
                <option value="Member">Member</option>
                <option value="Administrator">Administrator</option>
              </select>
            </label>
          </div>
        </div>

        <div className={Style.button}>
          <button className={Style.buttoncancel} onClick={() => close(false)}>
            Cancel
          </button>
          <button onClick={handleInvite} className={Style.buttonadd}>
            Add
          </button>
        </div>

        {message && <p>{message}</p>}
        {/* Display the number of users */}
        <p>Number of users in the project: {users.length}</p>
      </div>
    </div>
  );
};

export default AddPeopleModal;
