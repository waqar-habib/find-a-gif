// Make an array where the initial GIFs live and where the users can add their own custom GIFs

var queries = ["F.R.I.E.N.D.S.", "Grey's Anatomy", "Game of Thrones", "Silicon Valley", "The Office", "Psych", "Brooklyn 99", "SRK"];

var APIkey = "Lv2Iv9O3CbxQx8uMpMRgoO0lAbAJTkUu";

$(document).ready(function () {
// showButtons is responsible to create the buttons using the TV shows in the queries array

function showButtons() {
    $('#buttons').empty();
    for (let index = 0; index < queries.length; index++) {
        var button = $('<button>');
        button.addClass("btn btn-primary mr-2 ml-2 mt-3");
        button.attr("data-name", queries[index]);
        button.text(queries[index]);
        $("#buttons").append(button);
    }
}
showButtons();

// Make an on click function for search button
// Added .unbind because it was firing twice for some reason

$('#addGIF').unbind('click').on('click', function(){
    event.preventDefault();
    //alert('click'); //search-button works!
    
    $('#images').empty();
    
    // Take the user input from search box and add it to the query array
    var input = $('#search-input').val().trim();
    queries.push(input);
    console.log(queries); //works!
    // Make a new button using the user input
    showButtons();
});

// Make a on-click event listener
$('#buttons').unbind('click').on('click', 'button', function(){
    event.preventDefault();
   $('#images').empty();
    // Grab the property data-name and its value and store it in the var tvShowName. "this" refers to the data attribute of the button. 

    var gifName = $(this).attr("data-name");
    console.log(gifName); //It works! :)

    // Create a var queryURL using the tvShowName 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&api_key=" + APIkey + "&limit=8";
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
                var gifDiv = $('<div>');
                gifDiv.addClass('d-flex pt-3 pb-3 mb-3 mt-3 pl-2')
                // Write rating in an h3 tag
                var gifRating = $('<h3>');
                // Add padding
                gifRating.addClass('pr-2 pl-4').text("Rating: " + results[index].rating);
                // Write title in an h2 tag
                var gifTitle = $('<h2>');
                // Add padding
                gifTitle.addClass('pr-2 pl-4').text("Title: " + results[index].title);
                // Add still image URL
                var gifImage = $('<img>').attr('src', results[index].images.fixed_height_still.url);
                gifImage.attr('data-still', results[index].images.fixed_height_still.url);
                // Add animated image URL
                gifImage.attr('data-animate', results[index].images.fixed_height.url);
                // Set original data-state to still
                gifImage.attr('data-state', 'still');
                // Write the above info to DOM   
                gifDiv.prepend(gifTitle);
                gifDiv.prepend(gifRating);
                gifDiv.prepend(gifImage);

                $('#images').prepend(gifDiv);
           
                // Make an on-click event to play/pause the GIFs
            
                gifImage.on('click', function(){
                    // Create var to store the current data-state
                    var state = $(this).attr("data-state");
                    // If/else statement checks if state is still
                    if (state === "still"){
                        // If still change image src to data-animate
                        $(this).attr('src', $(this).attr("data-animate"));
                        // And set the data-state to animate
                        $(this).attr('data-state', 'animate');
                    } else {
                        // else, change image src to data-still
                        $(this).attr('src', $(this).attr('data-still'));
                        // and set the data-state to still
                        $(this).attr('data-state', 'still');
                    }
              });
     
            }
        });
});
});
