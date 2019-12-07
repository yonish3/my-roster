
class render{
    players(input){
        $.get(`/teams/${input}`, function (data) {
            const source = $('#players-template').html()
            const template = Handlebars.compile(source)
            const newHTML = template(data)
            $('#container').empty().append(newHTML); 
        })
//function invoked with the input value and invoke and API call to our server
//+then clearing and adding the new team data to the page

    }
    stats(player){
       let PlayerName = $(player).siblings('.nameOf').text()
        $.get(`/playerStats/${PlayerName.replace(" ", '&')}`, function (data) {
            $(player).siblings('.stats').append(`
            Games played: ${data.games_played}
            Minutes per game: ${data.minutes_per_game}
            Field goals attempted per game: ${data.field_goals_attempted_per_game}
            Field goals made per game: ${data.field_goals_made_per_gam}`)
        })
    }
//adding the player stat over the picture 
//+getting a ame with " " (space) and sending it as a 'q' to our server to get back the stat as data Obj
//+appending the data key values over the img

    playerChoice(playerButton){
        $(playerButton).parent().css("backgroundColor", "chocolate")
//coloring the player's card after clicking the addPlayer button
        
        let playerImg = $(playerButton).siblings('.playerImg')[0].src
//selecting the img src using DOM Traversal 

        let playerDetails = $(playerButton).siblings().text().split(" ")
//creating an array with player card attributes using DOM Traversal  

        let playerObject = {picture: playerImg, firstName:playerDetails[0], lastName: playerDetails[1], jerseyNumber:playerDetails[2], position:playerDetails[3]}
//creating the player object to pass over the POST method 

        $.post('/roster', playerObject, function (response) {
            console.log(response)
        })
//POSTing the player's object to our server

    }
    dreamTeam(){
        $.get(`/dreamTeam/`, function (data) {
            const source = $('#dreamTeam-template').html()
            const template = Handlebars.compile(source)
            const newHTML = template(data)
            $('#dreamTeamContainer').empty().append(newHTML)
        })
    }
//clearing and appending the new dream team to the page

}
