const express = require('express')
const app = express()
const Controller = require('./Controllers/controller')
const ControllerLogin = require('./Controllers/controllerLogin')
const {authentication} = require('./middleware/auth')
// const showError = require('./middleware/nextError')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//user
app.post("/login", ControllerLogin.login)
//pub
app.post("/register", ControllerLogin.register)

app.use(authentication)//middleware

app.post("/")





// app.use(showError)


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

module.exports = app