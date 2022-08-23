//*  JavaScript code written in JQuery syntax to
//*  Carousel's play and pause button 

// For the two buttons
$(document).ready(function () 
{
    // For the two buttons
    $("#myCarousel").carousel({ interval: 2000, pause: false });
    $("#carousel-pause").click(function () 
    {
        console.log("pause");
        $("#myCarousel").carousel("pause");
    });

    $("#carousel-play").click(function () 
    {
        console.log("cycle");
        $("#myCarousel").carousel("cycle");
    });


    // For the one button
    $("#myCarousel").carousel({ interval: 2000, pause: false });
    $("#carousel-play-pause-button").click(function () 
    {
        // if the i tag has the fa-pause class
        if ($("#carousel-play-pause-button").children("i").hasClass("fa-pause")) 
        {
            console.log("pause");
            $("#myCarousel").carousel("pause");
            // now flip the icon to the play icon
            $("#carousel-play-pause-button").children("i").removeClass("fa-pause");
            $("#carousel-play-pause-button").children("i").addClass("fa-play");
        } 
        else if ($("#carousel-play-pause-button").children("i").hasClass("fa-play")) 
        {
            // if the i tag has the fa-play class means it in pause mode so it will cycle again
            console.log("play");
            $("#myCarousel").carousel("cycle");
            $("#carousel-play-pause-button").children("i").removeClass("fa-play");
            $("#carousel-play-pause-button").children("i").addClass("fa-pause");
        }
    });

    // For the Reserve Table
    $("#reserveTableModalButton").click(function()
    {
        $("#reserveTableModal").modal('toggle');
    });

    // For the Login part
    $("#loginModalLink").click(function() 
    {
        $("#loginModal").modal('toggle');
    });
});


