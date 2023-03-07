import moment from 'moment-timezone';

export default async (req, res) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${req.query.token}`)

    const requestOptions = {
      method: 'GET',
      headers
    }

    const response = await fetch(`https://secure.splitwise.com/api/v3.0/get_expenses?group_id=${req.query.groupId}&limit=1000`, requestOptions)
    const rawData = await response.json()
    const data = {
      expenses: rawData.expenses.map(e => ({
        ...e,
        date: moment(e.date).tz('America/Toronto').format('LLL')
      }))
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}