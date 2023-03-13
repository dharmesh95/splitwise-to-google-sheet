const DATA = [['2/1/2023', '$1,232.67', 'Rent Feb']]

export default async (req, res) => {
    try {
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${req.query.id}/values/${req.query.name}!${req.query.range}?valueInputOption=USER_ENTERED`;
        let options = {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + req.query.accessToken,
                "Content-Type": "application/json"
            },
            body: req.body
        }

        const response = await fetch(url, options)
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}