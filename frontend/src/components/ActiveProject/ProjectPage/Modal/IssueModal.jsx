import React from 'react'
import style from './IssueModal.module.css';
import { IoClose } from "react-icons/io5";


const IssueModal = ({closeModal}) => {
  return (
    <div className={style.modalcon}>
      <div className={style.modal}>
        <div className={style.close} onClick={() => closeModal(false)}><IoClose/></div>
      <div className={style.leftcon}>
            <h3>Login</h3> 
            <br />
            <h5>Description</h5>
            <input type="text" placeholder='Add description...' className={style.input} />
            <br />
            <h3>Activity</h3>
            <br />
            <div className={style.addcomment}>
                <div className={style.usname}>
                    <p>B</p>
                </div>
                <input type="text" className={style.commentip} placeholder='Add a comment'/> <button className={style.submit}>Submit</button>
            </div>

            <br />
            <div className={style.cbox}>
            <div className={style.vucomment}>
              <div>
                <div className={style.usname}>
                    <p>B</p>
                </div>
                </div>
              <div>
                <h5>Bala</h5>
                <p>It's nice</p>
              </div>
            </div>

            <div className={style.vucomment}>
              <div>
                <div className={style.usname}>
                    <p>B</p>
                </div>
                </div>
              <div>
                <h5>Bala</h5>
                <p>It's nice</p>
              </div>
            </div>

            <div className={style.vucomment}>
              <div>
                <div className={style.usname}>
                    <p>B</p>
                </div>
                </div>
              <div>
                <h5>Bala</h5>
                <p>It's nice</p>
              </div>
            </div>

            <div className={style.vucomment}>
              <div>
                <div className={style.usname}>
                    <p>B</p>
                </div>
                </div>
              <div>
                <h5>Bala</h5>
                <p>It's nice</p>
              </div>
            </div>


            <div className={style.vucomment}>
              <div>
                <div className={style.usname}>
                    <p>B</p>
                </div>
                </div>
              <div>
                <h5>Bala</h5>
                <p>It's nice</p>
              </div>
            </div>

            <div className={style.vucomment}>
              <div>
                <div className={style.usname}>
                    <p>B</p>
                </div>
                </div>
              <div>
                <h5>Bala</h5>
                <p>It's nice</p>
              </div>
            </div>
            </div>
      </div>
      <div className={style.tablebox}>
        <div className={style.detail}><p>Details</p></div>
        <div className={style.tableboxbottom}>
          <div >
            <p className={style.tablecontent}>Label</p>
            <p className={style.tablecontent}>Parent</p>
            <p className={style.tablecontent}>Team</p>
            <p className={style.tablecontent}>Sprint</p>
            <p className={style.tablecontent}>Reporter</p>
          </div>
          <div>
            <p className={style.tablecontent}>None</p>
            <p className={style.tablecontent}>None</p>
            <p className={style.tablecontent}>None</p>
            <p className={style.tablecontent}>Goat Sprint 1</p>
            <p className={style.tablecontent}>Bala</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default IssueModal