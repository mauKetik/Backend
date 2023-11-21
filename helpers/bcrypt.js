const bcrypt = require("bcryptjs")

function hashPassword(value){
    return bcrypt.hashSync(value, 12)
}

function comparePassword(value, database){
    return bcrypt.compareSync(value, database)
}

module.exports = {hashPassword, comparePassword}