$(document).ready(function() {
    //create initial array of animals to be populated as buttons.
    var topics = ["skunk", "hawk", "shark"];

    //function to populate buttons from the array of topics.
    function populateButtons() {
        console.log("this was called");
        for (var i = 0; i < topics.length; i++) {
            var buttonElement = $("<button>");
            buttonElement.text(topics[i]);
            buttonElement.attr("data", topics[i]);
            buttonElement.addClass("buttonSearch");
            $("#search-buttons").append(buttonElement);
        }
    }

    //function to generate gifs and display to the page.
    function generateGifs(results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifsDiv = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImage = $("<img>");
                animalImage.addClass("gifImage");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("img-still", results[i].images.fixed_height_still.url);
                animalImage.attr("img-animate", results[i].images.fixed_height.url);
                animalImage.attr("img-state", "still");
                gifsDiv.append(p);
                gifsDiv.append(animalImage);
                $("#gifs").prepend(gifsDiv);
            }
        }
    }

    //on click event to capture the value from the button and pull the API.
    $("#search-buttons").on("click", ".buttonSearch", function(event) {
        console.log("button clicked");
        event.preventDefault();
        var animal = $(this).attr("data");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=CCeNiCJ9HfGxvT8ZQpUvIkJoMaP3p7oX&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(response);
            generateGifs(results);
        })
    });

    //on click event to submit the animal to search for and create that new animal as a button.
    $("#submit").on("click", function(event) {
        event.preventDefault();

        var animal = $("#search").val().trim();
        topics.push(animal);
        console.log(topics);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=CCeNiCJ9HfGxvT8ZQpUvIkJoMaP3p7oX&limit=10";

        var buttonCreation = $("<button>");
        buttonCreation.attr("data", animal);
        buttonCreation.addClass("buttonSearch");
        buttonCreation.text(animal);

        $("#search-buttons").append(buttonCreation);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            generateGifs(results);
        })
    });

    //on click event to animate the gif.  This onclick event does not appear to work at this time.  The class was added to the img element above but does not seem to work.
    $(".gifImage").on("click", function() {
        console.log("clicked");
        var state = $(this).attr("img-state");
        console.log(state);
        console.log("clicked");
        if (state === "still") {
            $(this).attr("src", $(this).attr("img-animate"));
            $(this).attr("img-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("img-still"));
            $(this).attr("img-state", "still");
        }
    });

    //populate the initial buttons.
    populateButtons();
})