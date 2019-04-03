// Make an array where the initial TV Show list lives and where the users can add their own custom TV Shows

var queries = ["F.R.I.E.N.D.S.", "Grey's Anatomy", "Game of Thrones", "Silicon Valley", "The Office", "Psych"];

var APIkey = "Lv2Iv9O3CbxQx8uMpMRgoO0lAbAJTkUu"

$(document).ready(function () {
// showButtons is responsible to create the buttons using the TV shows in the queries array

function showButtons() {
    $('#buttons').empty();
    for (let index = 0; index < queries.length; index++) {
        var button = $('<button>');
        button.addClass("btn btn-primary mr-2 ml-2");
        button.attr("data-name", queries[index]);
        button.text(queries[index]);
        $("#buttons").append(button);
    }
}
showButtons();

// Make a on-click event listener
$('button').on('click', function(){
    // Grab the property data-name and its value and store it in the var tvShowName. "this" refers to the data attribute of the button. 
    var tvShowName = $(this).attr("data-name");
    console.log(tvShowName); //It works! :)

    // Create a var queryURL using the tvShowName 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShowName + "&api_key=" + APIkey + "&limit=8";
    //console.log(queryURL); pulls 8 GIFs for each TV show in the array. 
    
    


})
















});
