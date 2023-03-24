import { useGoogleLogin } from '@react-oauth/google'
import { Button, Col, Input, InputNumber, Row } from 'antd'
import Head from 'next/head'
import Expenses from '../components/Expenses'
import GoogleSheet from '../components/GoogleSheet'
import Groups from '../components/Groups'
import SplitwiseLogin from '../components/SplitwiseLogin'
import { useLocalStorage } from '../context/LocalStorage'
import useExpenses from '../hooks/useExpenses'
import styles from '../styles/home.module.css'
import { getAmount } from '../util/amount'

const D_USER_ID = 7743509
const N_USER_ID = 56707094
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function Home() {
  const title = 'Export Splitwise Expenses to Google Sheet'
  const { googleResponse, setGoogleResponse, groupId, setGroupId, spreadsheet, setSpreadsheet } = useLocalStorage()
  const { data: expenseData } = useExpenses(groupId)
  const { id, name, range } = spreadsheet ?? {}
  const accessToken = googleResponse ? googleResponse['access_token'] : undefined

  const onLoginSuccess = (codeResponse) => {
    setGoogleResponse(codeResponse)
  }

  const login = useGoogleLogin({
    scope: SCOPE,
    flow: 'implicit',
    onError: (error) => console.log(error),
    onSuccess: (codeResponse) => onLoginSuccess(codeResponse)
  });

  const exportToGoogleSheet = () => {
    const data = expenseData?.expenses?.map(obj => ([obj.date, getAmount(obj.users, [D_USER_ID, N_USER_ID]), obj.description]))
    fetch(`/api/sheets/export?id=${id}&name=${name}&range=${range}&accessToken=${accessToken}`, {
      method: 'PUT',
      body: JSON.stringify({
        values: data
      })
    })
  }

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
            <Row gutter={16} align='middle'>
              <Col>
                <b>{'Enter Splitwise Group ID: '}</b>
              </Col>
              <Col span={8}>
                <InputNumber
                  value={groupId} // The current value of the input
                  onChange={setGroupId} // The function to call when value changes
                  size="large" // The size of the input box
                  placeholder="Enter group ID" // The placeholder text when empty
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
            <br />
            <Expenses groupId={groupId} />
          </Col>
        </Row>
        <h1>Google Sheet Data</h1>
        <Row gutter={[16, 24]}>
          <Col xs={24} md={12}>
            <>
              {!googleResponse
                ? <Button
                  type="primary"
                  size="large"
                  style={{ width: '70%' }}
                  onClick={() => login()}
                >
                  Log in to Google Sheets
                </Button>
                : <Button
                  type="primary"
                  size="large"
                  style={{ width: '70%' }}
                  onClick={() => exportToGoogleSheet()}
                >
                  Export to Google Sheets
                </Button>
              }
              <br />
              <br />
            </>
            <b>{'Enter SpreadSheet ID: '}</b>
            <Input
              value={spreadsheet?.id}
              onChange={(e) => setSpreadsheet({ ...spreadsheet, id: e.target.value })}
              size="large"
              placeholder="Enter SpreadSheet ID"
            />
            <br />
            <br />
            <b>{'Enter SpreadSheet Name: '}</b>
            <Input
              value={spreadsheet?.name}
              onChange={(e) => setSpreadsheet({ ...spreadsheet, name: e.target.value })}
              size="large"
              placeholder="Enter SpreadSheet Name"
            />
            <br />
            <br />
            <b>{'Enter SpreadSheet Range: '}</b>
            <Input
              value={spreadsheet?.range}
              onChange={(e) => setSpreadsheet({ ...spreadsheet, range: e.target.value })}
              size="large"
              placeholder="Enter SpreadSheet Range"
            />
            <br />
            <br />
          </Col>
          <Col xs={24} md={12}>
            <GoogleSheet />
          </Col>
        </Row>
      </main>
    </>
  )
}

export default Home
