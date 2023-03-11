import Head from 'next/head'
import Expenses from '../components/Expenses'
import Groups from '../components/Groups'
import OAuth2 from '../components/SplitwiseLogin'
import styles from '../styles/home.module.css'

function Home() {
  const title = 'Export Splitwise Expenses to Google Sheet'

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <main className={styles.main}>
        <h1 className="title">
          {title}!
        </h1>
        <OAuth2 />
        <Groups />
        <br />
        <Expenses />
      </main>
    </>
  )
}

export default Home
