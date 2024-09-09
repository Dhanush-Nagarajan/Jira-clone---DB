import React from 'react'
import styles from './Body.module.css'
import CreateProject from '../CreateProject/CreateProject'

const Body = () => {
  return (
    <>
    <div className={styles.home}>
      <div className={styles.top}>
        <p className={styles.title}>Your work</p>
        <hr className={styles.hr}/>
      </div>
      <div className={styles.body}>
        <p className={styles.bp}>You have no recent projects</p>
        <button className={styles.bb}>View all projects</button>
      </div>
      <div>
      <div>
      <div className={styles.body2}>
        <button className={styles.buttonb}>Starred</button>
        <button className={styles.buttonb}>Worked on</button>
        <button className={styles.buttonb}>Viewed</button>
        <button className={styles.buttonb}>Assigned to me</button>
      </div>
      <hr className={styles.hr}/>
      <div className={styles.body3}>
      <h3 className={styles.title}>You haven’t viewed any item recently</h3>
      <p className={styles.pa}>In this page, you’ll find a list of your recently viewed items. Get started by finding the project your team is working on.</p>
      <button className={styles.bb}>View all projects</button>
      </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Body