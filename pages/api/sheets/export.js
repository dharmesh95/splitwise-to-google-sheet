export default async (req, res) => {
    try {
        const spreadsheetId = encodeURIComponent(req.query.id);
        const sheetName = encodeURIComponent(req.query.name);
        const range = encodeURIComponent(req.query.range);
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}?valueInputOption=USER_ENTERED`;

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