export default async (req, res) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append("Authorization", `Bearer ${req.query.token}`)

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    }

    const response = await fetch(`https://secure.splitwise.com/api/v3.0/get_groups`, requestOptions)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message })
  }
}