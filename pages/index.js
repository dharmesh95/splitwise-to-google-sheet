import { Button, Col, InputNumber, Row } from 'antd'
import Head from 'next/head'
import { useState } from 'react'
import Expenses from '../components/Expenses'
import Groups from '../components/Groups'
import SplitwiseLogin from '../components/SplitwiseLogin'
import styles from '../styles/home.module.css'

function Home() {
  const title = 'Export Splitwise Expenses to Google Sheet'
  const [groupId, setGroupId] = useState(null)

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
        <Row gutter={[16, 24]}>
          <Col xs={24} md={12}>
            <SplitwiseLogin />
            <br />
            <br />
            <Groups />
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={16}>
              <Col span={8}>
                <InputNumber
                  value={groupId} // The current value of the input
                  onChange={setGroupId} // The function to call when value changes
                  size="large" // The size of the input box
                  placeholder="Enter group ID" // The placeholder text when empty
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={12} offset={4}>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: '100%' }}
                >
                  Export to Google Sheets
                </Button>
              </Col>
            </Row>
            <br />
            <Expenses groupId={groupId} />
          </Col>
        </Row>
      </main>
    </>
  )
}

export default Home
