const express = require( 'express' )
const app = express()
const path = require('path')

const api = require( './routes/api' )
//*****adding api.js path to the server module

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//adding body-parser package to use POST method, for adding a player to the dream team

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.static(path.join(__dirname,'..','node_modules')))

app.use( '/', api )
//*****mapping all '/' api requests to api.js (our API handler module)

const port = 3000
app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})
