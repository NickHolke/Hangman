
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");

let underscores = [];
let wordBank = ["apple", "pear", "orange", "kiwi", "samurai", "gorilla", "awkward", "banjo", "dwarf"];
let word = wordBank[Math.floor(Math.random() * (wordBank.length))]
let correctLetters = [];
let wrongLetters = [];
let a = "a".strike();

for (i = 0; i < word.length; i++) {
    underscores.push("_");
}

function getLetter() {
    let guess = '';
    let inputText = document.getElementById('input').value;
    if (inputText.length === 1 && /[a-zA-z]/.test(inputText)) {
        guess = inputText;
    } else {
        alert('Invalid Submission')
    }
     
    document.getElementById('input').value = '';
    
    let matched = false;
    
    for (let j = 0; j < word.length; j++) {
        if (word[j] === guess) {
            underscores[j] = guess;
            correctLetters.push(guess);
            matched = true;
            console.log(correctLetters)
        } 
    }
    
    if (!matched && guess.length === 1 && !wrongLetters.includes(guess)) {
        wrongLetters.push(guess);
        console.log(wrongLetters);
    }
}


function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawUnderscores();
    drawWrongLetters();
    drawGallows();
    drawHangman();
    gameOver(); 
}

function gameOver() {
    if (wrongLetters.length === 6) {
        setTimeout(function() {
        clearInterval(end);
        location.reload()
        alert(`You lose sucka! The word was: ${word}`)
        }, 200)
    } else if (!underscores.includes('_')) {
        setTimeout(function() {
        clearInterval(end);
        location.reload();
        alert(`You win! The word is: ${word}`)
        }, 200)
    }
}

function drawHangman() {
    if (wrongLetters.length === 1) {
        drawHead();
    } else if (wrongLetters.length === 2) {
        drawHead();
        drawBody();
    } else if (wrongLetters.length === 3) {
        drawHead();
        drawBody();
        leftLeg();
    } else if (wrongLetters.length === 4) {
        drawHead();
        drawBody();
        leftLeg();
        rightLeg();
    } else if (wrongLetters.length === 5) {
        drawHead();
        drawBody();
        leftLeg();
        rightLeg();
        leftArm();
    } else if (wrongLetters.length === 6) {
        drawHead();
        drawBody();
        leftLeg();
        rightLeg();
        leftArm();
        rightArm();
    }
}

function drawUnderscores() {
    ctx.beginPath();
    ctx.font = "65px Arial";
    ctx.fillText(`${underscores.join(' ')}`, 50, 480);
    ctx.closePath();
}

function drawWrongLetters() {
    ctx.beginPath();
    ctx.font = "30px Arial"
    ctx.fillText(`Wrong Letters: ${wrongLetters.join(',')}`, 50, 50)
    ctx.closePath();
}


//Draw the game pieces 
function rightArm() {
    ctx.beginPath();
    ctx.moveTo(400,250);
    ctx.lineTo(425, 285);
    ctx.stroke();
    ctx.closePath();
  }

  function rightLeg() {
    ctx.beginPath();
    ctx.moveTo(400,320);
    ctx.lineTo(425, 370);
    ctx.stroke();
    ctx.closePath();    
  }

  function leftArm () {
    ctx.beginPath();
    ctx.moveTo(400,250);
    ctx.lineTo(375, 285);
    ctx.stroke();
    ctx.closePath();
  }

  function leftLeg() {
    ctx.beginPath();
    ctx.moveTo(400,320);
    ctx.lineTo(375, 370);
    ctx.stroke();
    ctx.closePath();
  }

  function drawHead () {
    ctx.beginPath();
    ctx.arc(400, 200, 30, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }

  function drawBody () {
      ctx.beginPath();
      ctx.moveTo(400, 230);
      ctx.lineTo(400, 320);
      ctx.stroke();
  }

  function drawGallows () {
    ctx.beginPath();
    ctx.moveTo(400, 140);
    ctx.lineTo(400, 170);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(180, 420);
    ctx.lineTo(520, 420);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(230, 140, 20, 280);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(230, 120, 220, 20);
    ctx.stroke();
    ctx.closePath();
  }


let end = setInterval(draw, 20)