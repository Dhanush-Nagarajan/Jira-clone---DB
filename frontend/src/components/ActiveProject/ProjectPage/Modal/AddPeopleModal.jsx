import React, { useState } from 'react';
import Style from './AddPeopleModal.module.css';
import axios from 'axios';

const AddPeopleModal = ({ close }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInvite = async (e) => {
    e.preventDefault();


    try {
      
      const response = await axios.post('http://localhost:3000/api/send-invite', 
        {
        email,
        });

      
      if (response.status === 200) {
        setMessage('Invitation sent successfully!');
        setEmail(''); 
      } else {
        setMessage('Failed to send the invitation.'); 
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.'); 
    }
  }
  
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
            <label onSubmit={handleInvite}>Email</label> <br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className={Style.ip} /> <br />
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
          <button className={Style.buttoncancel} onClick={() => close(false)}>Cancel</button>
          <button type="submit" className={Style.buttonadd}>Add</button>
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddPeopleModal;
