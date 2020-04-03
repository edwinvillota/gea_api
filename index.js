const express = require('express')
const helmet = require('helmet')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// Configuration
const { config } = require('./config/index')

// Controllers
const usersApi = require('./routes/users')
const modulesApi = require('./routes/modules')
const rolesApi = require('./routes/roles')
const scopesApi = require('./routes/scopes')
const authApi = require('./routes/auth')
const rolScopesApi = require('./routes/rol_scopes')


// Middlewares
const {logErrors, wrapError, errorHandler} = require('./utils/middleware/errorHandler')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

// Cors options
const corsOptions = {
    origin: 'http://localhost:4000'
}

// Use
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())

// Activate routes
authApi(app)
usersApi(app)
modulesApi(app)
rolesApi(app)
scopesApi(app)
rolScopesApi(app)

// Catch Not found
app.use(notFoundHandler)


// Errror handlers
app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)


app.get('/', (req, res) => {
    res.send('Hello World!!')
})

app.get('/json', (req, res) => {
    res.json({hello: 'World'})
})

app.listen(config.port, () => {
    console.log(`Listening http://localhost:${config.port}`)
})