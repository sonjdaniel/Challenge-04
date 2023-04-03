// querySelector method to target different headings
var startb = document.querySelector("#start");
var timer = document.querySelector(".timer");
var questionAsk = document.querySelector(".question");
var answerButtons = document.querySelector("#answer_Button");
var answerButton1 = document.querySelector("#answer1");
var answerButton2 = document.querySelector("#answer2");
var answerButton3 = document.querySelector("#answer3");
var answerButton4 = document.querySelector("#answer4");
var countdown = document.querySelector(".countdown");
var instruction = document.querySelector(".instuction");
var currentQuestion = 0;
var timeLeft = 60;
var resultPage = document.querySelector("#result_page");
var score = document.querySelector(".score");
var input = document.querySelector("input");
var output = document.querySelector("#output");
var finalPage = document.querySelector("#final_page");
var highScoresPage = document.querySelector(".score_result");
var replay_button = document.querySelector("#replay");
var finalScore;
var initials;
var highScores = JSON.parse(localStorage.getItem("userInput")) || [];



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

// listen to the answer click

startb.addEventListener("click", function () {
  questionAsk.textContent = questions[currentQuestion].question;
  answerButton1.innerHTML = questions[currentQuestion].answers[0];
  answerButton2.innerHTML = questions[currentQuestion].answers[1];
  answerButton3.innerHTML = questions[currentQuestion].answers[2];
  answerButton4.innerHTML = questions[currentQuestion].answers[3];
  instruction.style = "display: none";
  startb.style = "display: none";
  answerButtons.style = "display: flex";
  answerButtons.style = "visibility: visible";
});

// Timer
function countDown() {
  count = 60;
  let interval = setInterval(counting, 1000);
  function counting() {
    count--;
    countdown.textContent = count;
    //Goes to the first page/function after 1 second
    //Allows both the countdown to start and the first question
    if (countdown.textContent == 59) {
      startQuiz();
    }
    //if time runs out and the count gets to zero, it calls the scorePage function to end the quiz
    if (count === 0) {
      clearInterval(interval);
    }
  }
}
// user answer with if else
answerButtons.addEventListener("click", function (event) {
  var userChoice = event.target;
  console.log("Selection: " + userChoice.innerHTML);

  var userAnswer = userChoice.innerHTML;

  if (currentQuestion === 4) {
    endTimer();
    return scorePage();
  } else if (userAnswer !== questions[currentQuestion].correctAnswer) {
    timeLeft -= 10;
    comment.textContent = "Wrong!";
    answerButtons.append(comment);
  } else {
    comment.textContent = "Correct";
    answerButtons.append(comment);
  }

  currentQuestion += 1;

  question.textContent = questions[currentQuestion].question;
  answerButton1.innerHTML = questions[currentQuestion].answers[0];
  answerButton2.innerHTML = questions[currentQuestion].answers[1];
  answerButton3.innerHTML = questions[currentQuestion].answers[2];
  answerButton4.innerHTML = questions[currentQuestion].answers[3];
});

question.style.display = "none";
answerbuttons.style.display = "none";
resultPage.style.display = "block";

score.textContent = "Your final score is " + finalScore + ".";

// Score page
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
   
    // Final page
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