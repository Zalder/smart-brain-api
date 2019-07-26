const saltRounds = 10;

const handleRegister = (req, res, bcrypt, knex) => {
    const { email, name, password } = req.body;

    if(!email || !password || !name) {
        return res.status(400).json('Incorrect parameters')
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log(hash);

        knex.transaction(trx => {
            trx.insert({ email: email, hash: hash }).into('login').returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*').insert({
                    name: name,
                    email: loginEmail[0],
                    joined: new Date()
                }).then(user => { res.json(user[0]) })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })

    });
}

module.exports = {
    handleRegister: handleRegister
}