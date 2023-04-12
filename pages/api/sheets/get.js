export default async (req, res) => {
    try {
        const spreadsheetId = encodeURIComponent(req.query.id);
        const sheetName = encodeURIComponent(req.query.name);
        const range = encodeURIComponent(req.query.range);

        let url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}`;

        let options = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + req.query.accessToken
            }
        };

        const response = await fetch(url, options)
        const data = await response.json()
        data.values = data.values?.map((row, id) => ({
            id,
            date: row[0],
            cost: row[1],
            description: row[2]
        }))
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}