
const renderer = new render()
let playerCounter = 0
//creating the renderer class 
//+ player counter for keeping track on adding new players to the dream team

$('#getTeamButton').on('click', function () {
    let input = $("#teamInput").val()
    $("#teamInput").val("")
    renderer.players(input)
})
//team search button listener + input listener 
//+ calling team render function  

$('#container').on('click', 'img', function () {
    renderer.stats(this)
})
//img listener to show stat over player img in team search app

$('#container').on('click','#addPlayer', function () {
    playerCounter ++
    if(playerCounter>5) {
        alert("You have already chosen 5 players")
        return
    }else{
    renderer.playerChoice(this)
    }
})
//player button listener, to add a player the dream team 
//+input check that user have not added more then 5 players to the dream team
//+calling the PlayerChoice to add the player to the DB 

$('#getDreamTeam').on('click', function () {
    renderer.dreamTeam()
})
//create dream team button listener
//+ calling the dreamTeam function to render the dream team DB to the page 