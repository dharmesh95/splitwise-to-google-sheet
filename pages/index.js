import { useEffect } from 'react'
import OAuth2 from '../components/OAuth2.js'
import SplitwiseForm from '../components/SplitwiseForm.js'
import { getTokenFromSession } from '../helper/session.js'
import styles from '../styles/home.module.css'

function Home() {
  // const spliwiseData = useSplitwiseData()

  return (
    <main className={styles.main}>
      <h1>Export Splitwise expenses to Google Sheet</h1>
      <SplitwiseForm />
      <OAuth2 />
    </main>
  )
}

export default Home
