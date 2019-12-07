const express = require( 'express' )
const router = express.Router()
const request = require('request')

//**1** initialize express object 
//**2** initialize a router object with express.router AIP functions, from express package
//**3** initialize a request object by moving require('request') to api.js from server.js 

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}
//**4** move the teamToIDs object to api.js so we can access it from api.js 

let dreamTeam= [{firstName: 'Who am I?', lastName: 'Who am I?', jerseyNumber:"What's my no?", position: "Where do i play?"   },
                {firstName: 'Who am I?', lastName: 'Who am I?', jerseyNumber:"What's my no?", position: "Where do i play?"   },
                {firstName: 'Who am I?', lastName: 'Who am I?', jerseyNumber:"What's my no?", position: "Where do i play?"   },
                {firstName: 'Who am I?', lastName: 'Who am I?', jerseyNumber:"What's my no?", position: "Where do i play?"   },
                {firstName: 'Who am I?', lastName: 'Who am I?', jerseyNumber:"What's my no?", position: "where do i play?"   }
               ]
//****** initialize the dreamTeam array

let dreamPlayerCounter = 0
// initialize a dream team player counter to send every team call to prevent refresh bugs

//**5** move all API requests from server.js to api.js and change all app.get() to route.get()

router.get('/teams/:teamName', (req, res) => {
    request.get("http://data.nba.net/10s/prod/v1/2018/players.json", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let playersObj = (JSON.parse(body).league.standard).filter(
                player=>player.teamId == teamToIDs[req.params.teamName] & player.isActive==true
                )
//parsing the json file and filtering by team ID and Active players

                playersArray=playersObj.map(
                    player=> {return {firstName:player.firstName, lastName:player.lastName,jersey:player.jersey, pos:player.pos}}
                    )
                res.send(playersArray)
//mapping an array with the relevant keys and sending back to the client 
        }
    })
}) 
//creating the route to search for teams

router.get('/playerStats/:player', (req, res) => {
    let nameFlip = req.params.player.split('&')
    request.get(`https://nba-players.herokuapp.com/players-stats/${nameFlip[1]}/${nameFlip[0]}`, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body)
        }
    })
})

router.get('/dreamTeam/', (req, res) => {
    res.send(dreamTeam)
})
//****** sending the dreamTeam array

router.post('/roster/', (req, res) => {
    if(dreamPlayerCounter>4){
        res.end()
    }else{
        dreamTeam[dreamPlayerCounter]=req.body
        dreamPlayerCounter++
    }
})
//route to add a new player to the dream team
//+checking that we dont have more then 5 players

module.exports = router
//**6**exporting the api.js file so the server can use it as a module