var buttonColors=["red", "blue", "green", "yellow" ];
var gamePattern=[];
var userClickedPattern=[];


var started=false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSquence();
        started=true;
    }
});


$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    // console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    // playSound(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        // console.log("sucsess");

        if(userClickedPattern.length === gamePattern.length){
            //console.log("next level");
        
            setTimeout(function(){
                nextSquence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        }
    }


function nextSquence(){

    userClickedPattern=[];    
    level++;

    $("h1").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    //1. Use jQuery to select the button with the same id as the randomChosenColour
    //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(name){
    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


function startOver(){
    level=0;
    started=false;
    gamePattern=[];
    userClickedPattern=[];
}

