// querySelector method to target different headings
var startb = document.querySelector("#start");
var timer = document.querySelector(".timer");
var questionAsk = document.querySelector(".question");
var answerButton1 = document.querySelector(".answer1");
var answerButton2 = document.querySelector(".answer2");
var answerButton3 = document.querySelector(".answer3");
var answerButton4 = document.querySelector(".answer4");
var countdown = document.querySelector("countdown");
var instruction = document.querySelector(".instuction")
var answerButtons = document.querySelector("#answerButton");
var currentQuestion = 0
var timeLeft = 60;




// Questions
var questions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
        correctAnswer: "3. Alerts"
    },
]


// listen to the answer click 

startb.addEventListener("click", function () {
    questionAsk.textContent = questions[currentQuestion].question;
    answerButton1.innerHTML = questions[currentQuestion].answers[0]
    answerButton2.innerHTML = questions[currentQuestion].answers[1]
    answerButton3.innerHTML = questions[currentQuestion].answers[2]
    answerButton4.innerHTML = questions[currentQuestion].answers[3]
    instruction.style = "display: none";
    startb.style = "display: none";
    answerButtons.style.display = "display:flex";

 
});


// Timer
function countDown() {
    count = 60; 
    let interval = setInterval(counting,1000); 
    function counting(){
        count--; 
        countdown.textContent = count;
        //Goes to the first page/function after 1 second 
        //Allows both the countdown to start and the first question 
        if (countdown.textContent == 59){
            startQuiz();
        } 
        //if time runs out and the count gets to zero, it calls the scorePage function to end the quiz 
        if(count === 0) {
            clearInterval(interval);
        }
    }
}