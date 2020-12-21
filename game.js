var gamePattern = [];
var started = false;
var level = 0;

var userClickedPattern = [];

var buttonColours = ['red', 'blue', 'green', 'yellow'];

$(document).keydown(function () {
  if (!started) {
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$('.btn').click(function (e) {
  e.preventDefault();

  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $('#level-title').text(`Level ${level}`);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    $('body').addClass('game-over');
    playSound('wrong');

    $('#level-title').text('Game Over, Press Any Key to Restart');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);

    startOver();
  }
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`.${currentColour}`).addClass('pressed');
  setTimeout(() => {
    $(`.${currentColour}`).removeClass('pressed');
  }, 100);
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
