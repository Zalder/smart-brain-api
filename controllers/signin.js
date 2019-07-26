const saltRounds = 10;

const handleSignin = (req, res, bcrypt, knex) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json('Incorrect parameters')
    }

    knex('login').select('email', 'hash').where({email: email})
    .then(login => {
        if(login.length && bcrypt.compareSync(password, login[0].hash)) {
            return knex('users').select('*').where({email: email})
            .then(user => {
                if (user.length)
                    res.json(user[0]);
                else
                    res.status(400).json('Unable to login');
            })
            
        }
        else {
            res.status(400).json('Unable to login');
        }
    })
    .catch((err) => res.status(400).json('Unable to login'))
}

module.exports = {
    handleSignin: handleSignin
}