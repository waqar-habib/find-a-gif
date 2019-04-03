// Make an array where the initial TV Show list lives and where the users can add their own custom TV Shows

var queries = ["F.R.I.E.N.D.S.", "Grey's Anatomy", "Game of Thrones", "Silicon Valley", "The Office", "Psych"];

var APIkey = "Lv2Iv9O3CbxQx8uMpMRgoO0lAbAJTkUu";

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
    event.preventDefault();
   $('#images').empty();
    // Grab the property data-name and its value and store it in the var tvShowName. "this" refers to the data attribute of the button. 
    var tvShowName = $(this).attr("data-name");
    console.log(tvShowName); //It works! :)

    // Create a var queryURL using the tvShowName 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShowName + "&api_key=" + APIkey + "&limit=8";
    console.log(queryURL); //pulls 8 GIFs for each TV show in the array. 
    
    // Make an AJAX call using queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // Using the data from the AJAX request in a .then function
        .then(function(response){
            console.log(response); 
            
            // Store the response in var results
            var results = response.data;
            
            // For each result write the data in #images div
            for (let index = 0; index < results.length; index++) {
                var tvShowDiv = $('<div>');
                tvShowDiv.addClass('d-flex pt-3 pb-3 mb-3 mt-3 pl-2')
                var rating = $('<h2>');
                rating.addClass('pr-2 pl-4').text("Rating: " + results[index].rating);
                var tvShowImage = $('<img>').attr('src', results[index].images.fixed_height.url);
                tvShowDiv.append(rating);
                tvShowDiv.append(tvShowImage);

                $('#images').prepend(tvShowDiv);
                
            }

        });



});
















});
