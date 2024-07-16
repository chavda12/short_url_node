const User = require("../models/user_model")

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });

    return res.json({ "Success": true });
}

module.exports = {handleUserSignup};