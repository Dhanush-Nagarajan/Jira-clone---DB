import React from 'react'
import style from './CreateSprintModal.module.css';

const CreateSprintModal = ({close}) => {

  const handleOverlayCreate = (e) => {
    if (e.target.className === style.Modal) {
      close(false);
    }
  };


  return (
    <div className={style.Modal} onClick={handleOverlayCreate}>
      <div className={style.Modal1}>
        <div>
          <h3 className={style.h}>Start Sprint</h3>
          <div>
            <label>Sprint name</label> <br />
            <input type="text" className={style.inp} /> <br/>
            <label htmlFor="access">
              Duratrion
              <select name="access" id="access" className={style.opt}>
                <option value="days1">3 days</option>
                <option value="days2">5 days</option>
                <option value="days3">7 days</option>
              </select>
              </label>
            <label>Sprint goal</label> <br />
            <input type="text" className={style.desc} />
          </div>
        </div>

        <div className={style.button}>
          <button className={style.cancel} onClick={() => close(false)}>Cancel</button>
          <button className={style.start}>Start </button>
        </div>
        
      </div>
    </div>
  )
}

export default CreateSprintModal