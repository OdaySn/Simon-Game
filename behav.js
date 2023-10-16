var colors = ["red", "blue", "green", "yellow"]; 

var gamePattern = []; 
var userClickedPattern = []; 

var started = false; 
var level = 0; 


$(document).keypress(function () {
    if(!started) {
        $(".topic").text("Level " + level); 
        doIt (); 
        started = true; 
    }
});

$(".btn1").click(function () { 
    var userChosenColor = $(this).attr("id"); 
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animation(userChosenColor); 
    
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
        doIt();
        }, 1000);
    }
    } else {
        playSound("wrong");
        $("body").addClass("game_over");
        $(".topic").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
        $("body").removeClass("game_over");
        }, 200);

    startOver();
    }
}

function doIt () { 
    userClickedPattern = []; 
    level++;
    $(".topic").text("Level " + level); 
    var randomColor = Math.floor(Math.random() * 4); 
    var randomChosenColor = colors [randomColor]; 
    gamePattern.push(randomChosenColor); 
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animation (currentPosition) { 
    $("#" + currentPosition).addClass("pressed");
    setTimeout(function () {
    $("#" + currentPosition).removeClass("pressed");
    }, 100);
}

function playSound (color) { 
    var audio = new Audio ("sounds/" + color + ".mp3")
    audio.play();
}


function startOver () { 
    level = 0; 
    gamePattern = []; 
    started = false; 
}

