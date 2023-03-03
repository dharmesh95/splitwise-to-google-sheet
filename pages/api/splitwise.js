export default async (req, res) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${req.query.token}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    const response = await fetch('https://secure.splitwise.com/api/v3.0/get_current_user', requestOptions)
    const data = await response.json()
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error })
  }
}