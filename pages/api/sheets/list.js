export default async function handler(req, res) {
  const accessToken = req.query.access_token;

  try {
    console.log(accessToken)
    const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.status)
    const spreadsheets = await response.json();
    res.status(200).json(spreadsheets.files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve spreadsheets' });
  }
}
