const clarifai = require('clarifai')
const app = new clarifai.App({ apiKey: '0d65de07d4ce4db9890324fcbabe5b31'});

const handleApiCall = (req, res) => {
    const { url } = req.body;

    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        url)
          .then(response => res.json(response))
          .catch(console.log)
}

const handleImage = (req, res, knex) => {
    const { id } = req.body;

    knex('users').returning('entries').where({ id: id }).increment('entries', 1)
        .then(response => {
            if (response.length)
                res.json(response)
            else
                res.status(400).json("Error: could not update entry count")
        })
        .catch(err => res.status(400).json("Error: could not update entry count"))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}