import React, { useState, useEffect } from 'react';
import Style from './AddPeopleModal.module.css';
import axios from 'axios';
import { useProjectContext } from '../../../../Context/ProjectContext';

const AddPeopleModal = ({ close, updateUsers }) => {
  const [email, setEmail] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState(''); 
  const [showInviteInput, setShowInviteInput] = useState(false); // State to show invite input

  const { projectDetails } = useProjectContext();
  const projectId = projectDetails?._id;
  
  const token = localStorage.getItem('token');

  // Fetch users when the modal is opened
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/projects/getusers/${projectId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setUsers(response.data);
        if (response.status === 500) {      
          
      }
      } catch (error) {
        alert('You are not a admin');
        
      }
    };

    if (projectId && token) {
      fetchUsers();
    }
  }, [projectId, token]);


  useEffect(() => {
    if (email) {
      setFilteredUsers(users.filter(user => user.email.toLowerCase().includes(email.toLowerCase())));
    } else {
      setFilteredUsers([]);
    }
  }, [email, users]);

  const handleSelectEmail = (user) => {
    const { _id, email } = user;
    if (!selectedUsers.find((u) => u._id === _id)) {
      setSelectedUsers((prev) => [...prev, { _id, email }]);
    }
    setEmail('');
    setFilteredUsers([]);
  };

  const handleRemoveEmail = (userIdToRemove) => {
    setSelectedUsers(selectedUsers.filter((user) => user._id !== userIdToRemove));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
  
    const selectedUserIds = selectedUsers.map((user) => user._id);
  
    try {
      const response = await axios.post(
        `http://localhost:2000/api/projects/add/${projectId}`,
        { userIds: selectedUserIds },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        setMessage('Users added successfully!');
        if (typeof updateUsers === 'function') {
          updateUsers(selectedUsers);
        }
        setSelectedUsers([]);
      } else {
        setMessage('Failed to add users.');
      }
    } catch (error) {
      console.error('Error adding users:', error);
      setMessage('An error occurred. Please try again later.');
    }

    close(false);
  };

  const handleInviteViaEmail = async (e) => {
    e.preventDefault();
    if (inviteEmail.trim() === '') {
      setMessage('Please enter an email to invite.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:2000/api/invite/${projectId}`, {
        emails: [inviteEmail],
        projectId: projectId,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.status === 200) {
        setMessage('Invitation sent successfully!');
        setInviteEmail(''); 
        setShowInviteInput(false); 
      } else {
        setMessage('Failed to send invitations.');
      }
    } catch (error) {
      console.error('Error sending invitations:', error);
      setMessage('An error occurred while sending invitations.');
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
          <h3 className={Style.h3}>Add People to Project</h3>

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
            {filteredUsers.length > 0 && (
              <ul className={Style.suggestions}>
                {filteredUsers.map((user) => (
                  <li
                    key={user._id}
                    className={Style.suggestionItem}
                    onClick={() => handleSelectEmail(user)}
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

        {selectedUsers.length > 0 && (
          <div className={Style.selectedEmails}>
            <h4>Selected Users:</h4>
            <ul>
              {selectedUsers.map((user) => (
                <li key={user._id}>
                  {user.email}
                  <button onClick={() => handleRemoveEmail(user._id)} className={Style.removeButton}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

  
        <div className={Style.inviteButtonContainer}>
          <button onClick={() => setShowInviteInput((prev) => !prev)} className={Style.inviteButton}>
            {showInviteInput ? 'Cancel Invite' : 'Invite via Email'}
          </button>
        </div>

        {showInviteInput && (
          <div className={Style.ipfont}>
            <label>Invite Email</label> <br />
            <input
              type="email"
              value={inviteEmail}
              required
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter email to invite"
              className={Style.ip}
            />
            <button onClick={handleInviteViaEmail} className={Style.buttonaddsend}>
              Send Invite
            </button>
          </div>
        )}

        <div className={Style.button}>
          <button className={Style.buttoncancel} onClick={() => close(false)}>
            Cancel
          </button>
          <button onClick={handleAddUser} className={Style.buttonadd} disabled={selectedUsers.length === 0}>
            Add
          </button>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddPeopleModal;
