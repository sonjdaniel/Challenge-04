// querySelector method to target different headings
var startButton = document.querySelector("#start_button");
var timer = document.querySelector(".timer");
var countdown = document.querySelector(".timer_count");
var question = document.querySelector(".question");
var answerbuttons = document.querySelector("#answer_buttons");
var quiz = document.querySelector(".instruction");
var answerButton1 = document.querySelector(".answer_button_1");
var answerButton2 = document.querySelector(".answer_button_2");
var answerButton3 = document.querySelector(".answer_button_3");
var answerButton4 = document.querySelector(".answer_button_4");
var comment = document.createElement("h2");
var resultPage = document.querySelector("#result");
var score = document.querySelector(".score");
var submitButton = document.querySelector("#submit_button");
var input = document.querySelector("input");
var output = document.querySelector("#output");
var finalPage = document.querySelector("#final_page");
var highScoresPage = document.querySelector(".result");
var replay_button = document.querySelector("#replay");
var h2 = document.createElement("h2");
var finalScore;
var initials;
var currentQuestion = 0;
var highScores = JSON.parse(localStorage.getItem("userInput")) || [];
var clearScores = document.querySelector("#clearBtn");


// Questions to ask?
var timeLeft = 60;
var questions = [
  {
    question: "Commonly used data types DO Not Include:",
    answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    correctAnswer: "3. Alerts",
  },
  {
    question: "The condition is an if/else statement is enclosed with _________.",
    answers: ["1. Quotes", "2. Curly brackets", "3. Parenthesis", "4. Square brackets"],
    correctAnswer: "3. Parenthesis"
},
{
    question: "Arrays in JavaScript can be used to store _________.",
    answers: ["1. Numbers and strings", "2. Other arrays", "3. Booleans", "4. All of the above"],
    correctAnswer: "4. All of the above"
},
{
    question: "String values must be enclosed within _______ when being assigned to variables.",
    answers: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
    correctAnswer: "3. Quotes"
},
{

    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["1. JavaScript", "2. Terminal/Bash", "3. For Loops", "4. Console.log"],
    correctAnswer: "4. Console.log"
}

];

// clear timer
var clearTimer

function endTimer() {
    clearInterval(clearTimer)

}
//  timer
function setTime() {
    timeLeft--;
    countdown.textContent = timeLeft;

    if (timeLeft <= 0) {
        timeLeft = 0;
        countdown.textContent = timeLeft;
        endTimer();
        scorePage();
    }
}

// listen to the answer click

startButton.addEventListener("click", function () {
    question.textContent = questions[currentQuestion].question;
    answerButton1.innerHTML = questions[currentQuestion].answers[0]
    answerButton2.innerHTML = questions[currentQuestion].answers[1]
    answerButton3.innerHTML = questions[currentQuestion].answers[2]
    answerButton4.innerHTML = questions[currentQuestion].answers[3]
    quiz.style = "display: none";
    startButton.style = "display: none";
    answerbuttons.style.display = "flex";

    clearTimer = setInterval(setTime, 1000)
});

// user answer with if else
answerbuttons.addEventListener("click", function (event) {

    var userChoice = event.target;
    console.log("Selection: " + userChoice.innerHTML);

    var userAnswer = userChoice.innerHTML;

    if (currentQuestion === 4) {
        endTimer();
        return scorePage();

    } else if (userAnswer !== questions[currentQuestion].correctAnswer) {
        timeLeft -= 10;
        comment.textContent = "Wrong!";
        answerbuttons.append(comment);
    } else {
        comment.textContent = "Correct";
        answerbuttons.append(comment);
    }

    currentQuestion += 1;

    question.textContent = questions[currentQuestion].question;
    answerButton1.innerHTML = questions[currentQuestion].answers[0]
    answerButton2.innerHTML = questions[currentQuestion].answers[1]
    answerButton3.innerHTML = questions[currentQuestion].answers[2]
    answerButton4.innerHTML = questions[currentQuestion].answers[3]

})


// Score page with css
function scorePage() {
        finalScore = timeLeft;
    
        question.style.display = "none";
        answerbuttons.style.display = "none";
        resultPage.style.display = "block";
    
        score.textContent = "Your final score is " + finalScore + ".";
    
    }
    //  All save data
    function saveUserInput() {
        highScores.push({
            initials: input.value,
            score: finalScore
        })
    
        localStorage.setItem("userInput", JSON.stringify(highScores));
    
    }
   
    // Final page for score
function showFinalPage() {


    resultPage.style.display = "none";
    timer.style.display = "none";
    finalPage.style.display = "block";

    output.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
        var highScore = highScores[i];
        var li = document.createElement("li");
        li.textContent = highScore.initials + " - " + highScore.score;
        console.log(highScore);
        li.setAttribute("data-index", i);
        output.appendChild(li);
    }

    console.log(highScores);
}
    
// listen to sumbit button 
    submitButton.addEventListener("click", function (event) {
    
        event.preventDefault();
    
        if (input.value === "") {
    
            alert("Please enter your initials");
    
            return;
    
        } else {
            saveUserInput();
            showFinalPage();
        }
    })

// change the settings when click on score
    highScoresPage.addEventListener("click", function (event) {
    
        question.style.display = "none";
        quiz.style.display = "none";
        startButton.style.display = "none";
        resultPage.style.display = "none";
        timer.style.display = "none";
        finalPage.style.display = "none";
    
    
        return showFinalPage();
    
    })


// Allow to play the game again
replay_button.addEventListener("click", rePlay)

function rePlay() {
    question.style.display = "block";
    question.innerHTML = "Coding Quiz Challenge";
    quiz.style.display = "flex";
    quiz.classList.add("center_text");
    startButton.style.display = "block";
    timer.style.display = "flex";
    countdown.innerHTML = "60";
    finalPage.style.display = "none";
    timeLeft = 60;
    currentQuestion = 0;
    input.value = "";

}

//clear scores

clearScores.addEventListener("click", function(){
    if (confirm("Are you sure you want to clear the high scores?")) {
      localStorage.clear();
      location.reload();
    }
});