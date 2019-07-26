

const handleProfileGet = (req, res, knex) => {
    const { id } = req.params;

    knex('users').where({ id: id }).select('*').then(user => {
        if (user.length)
            res.json(user[0]);
        else
            res.status(400).json('Unable to fetch profile')
    })
        .catch(err => res.status(400).json('Unable to fetch profile'));
}

module.exports = {
    handleProfileGet: handleProfileGet
}