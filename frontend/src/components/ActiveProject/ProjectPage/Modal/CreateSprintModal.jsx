import React from 'react'

const CreateSprintModal = ({close}) => {

  const handleOverlayClick = (e) => {
    if (e.target.className === Style.Modal) {
      close(false);
    }
  };


  return (
    <div className={style.Modal} onClick={}>
      <div>
        <h3>Start Sprint</h3>
      </div>
    </div>
  )
}

export default CreateSprintModal