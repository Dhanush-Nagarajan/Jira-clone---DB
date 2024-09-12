import React from 'react';
import Style from './AddPeopleModal.module.css';

const AddPeopleModal = ({ close }) => {
  
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
            <input type="text" placeholder="Email" className={Style.ip} /> <br />
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
          <button className={Style.buttonadd}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddPeopleModal;
