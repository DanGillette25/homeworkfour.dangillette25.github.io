$(document).ready(function(){

    $("#scores").text("hello?");

    $("#description").text("Answer the multiple choice questions below to test your coding knowledge.  You will have 60 seconds to complete the quiz.  Wrong answers will result in a 10 second time penalty.  Your final score will be calculated by multiplying the number of seconds you have left by the number of questions you answered correctly.");

    // questionNum determines what question will be asked
    var questionNum = 0;

    // secondsLeft determines how much time the user has left

    var secondsLeft = 60;

    // rightAnswers will count the number of questions answered correctly 
    // and help us calculate the user's score

    var rightAnswers = 0;

    // Display Score Button and event listener
   
        $("#display-scores").on("click", function highScores(){

        $("#take-quiz").removeClass("inactive");
        $("#quiz-and-scoreboard-buttons").addClass("inactive");
        $("#description").text("These are the top five scores");

        // Grab our score array from localStorage, parse it back into an array/object
            // and sort that array based on which score is highest
            var scoreDisplay = JSON.parse(localStorage.getItem('scoreBoard'));
            scoreDisplay.sort((a,b) => (a.Score > b.Score) ? -1 : 1)
            
            var newULthree = $("<ul>")
            $("#take-quiz").append(newULthree);

            // This for loop is for displaying the top five scores
            for (var i = 0; i < 5; i++) {
                var scoreToInteger = scoreDisplay[i].Score;
                var newLI = $("<li>")
                newLI.text(i + 1 + ". " + scoreDisplay[i].Initials + " " + scoreToInteger + " points");
                newULthree.append(newLI);
            }


            var refreshBtn = $("<button>");
            refreshBtn.text("Back to Start");
            newULthree.append(refreshBtn);

            $(refreshBtn).on("click", function() {
                location.reload();
            })
        
        });

    // When the "start quiz" button is clicked, we start the timer and 
    // define & execute the startQuiz function
    $("#start-quiz").on("click", function setTime() {

// Set up the timer to count down the variable secondsLeft 
// by 1 every 1000 milliseconds. Once the timer reaches zero
// The user receives an alert that they are out of time
// secondsLeft is set to a string to prevent the alert from
// popping up again
        
            var timerInterval = setInterval(function() {
                secondsLeft--;
                $("#timer").text("You have " + secondsLeft + " seconds left.");
                if (secondsLeft < 1) {
                    alert("You're out of time!");
                    secondsLeft = 1;
                    recordScore();
                }
        
        },1000);

        

        function startQuiz() {

            // The first step with the startQuiz function is to move to the next question and make sure we clear out the previous question
            $("#take-quiz").empty();

            //Hide the "take quiz" button and make the quiz and timer elements visible
            $("#take-quiz").removeClass("inactive");
            $("#quiz-and-scoreboard-buttons").addClass("inactive");
            $("#timer").removeClass("inactive");
            
            

            // create a UL element and add the title from the "questions array" based on what questionNum we are on
            var newUL = $("<ul>");

            newUL.text(questions[questionNum].title);

            $("#take-quiz").append(newUL);

            // Add an <li> element for each multiple choice, populate it with the choices determined by what questionNum we are on, and add a checkbox

            // We do this for answer option 1
            var questionOne = $("<li>");
            questionOne.text(questions[questionNum].choices[0])
            $(newUL).append(questionOne);
            $(questionOne).prepend('<input type="radio" name="answer" value = "0"/>')

            // Answer option 2
            var questionTwo = $("<li>");
            questionTwo.text(questions[questionNum].choices[1])
            $(newUL).append(questionTwo);
            $(questionTwo).prepend('<input type="radio" name="answer" value = "1"/>')

            // and answer option 3
            var questionThree = $("<li>");
            questionThree.text(questions[questionNum].choices[2])
            $(newUL).append(questionThree);
            $(questionThree).prepend('<input type="radio" name="answer" value = "2"/>')

            // Append the answer button
            var submitBtn = $('<input type="submit" value="Submit"/>');
            $(newUL).append(submitBtn);

            // When the submit button is clicked...
            $(submitBtn).on("click", function() {


            // The variable radioValue and the for loop after it store the checked answer value as a variable
                var radioValue = document.getElementsByName('answer');

                for (i = 0; i < radioValue.length; i++) {
                    if (radioValue[i].checked) {
                        var radioOut = radioValue[i].value;
                        
                    }

                }

                //We convert the radioOut value to an integer

                parseInt(radioOut);

                // Target the numeric value of the correct answer in the questions variable and make sure that it is an integer
                var correctAnswer = questions[questionNum].answer;
                parseInt(correctAnswer);

                // if the output from the form is equal to the number of the correct answer, you got the right answer, if not you got the wrong one
                // in any case, we increase questionNum variable by 1
                

                if(radioOut == correctAnswer){
                    alert("Yes!")
                    rightAnswers ++;
                    questionNum++;
                } else {
                    alert("No!")
                    secondsLeft = secondsLeft - 10;
                    questionNum++;
                }

                // If we're out of questions to ask, we record the user's score and initials
                // If not, we proceed to the next question

                if (questionNum < questions.length) {

                    startQuiz();

                } else {

                    recordScore();
                    
                }


           

        });


    }

    // Execute the startQuiz function
    startQuiz();
    

    });


    

// Define the function to record the score once the quiz is over.
// We start by doing away with the quiz content the the timer
//

    function recordScore() {

        $("#description").text("Quiz Complete")
        $("#take-quiz").empty();
        $("#timer").addClass("inactive");
    // Grab the number of seconds left and set secondsLeft to a string
    // to prevent the timeout alert from popping up
    // The score is calculated by multiplying the time left by the number of 
    //questions answered correctly
        var finalSecondCount = secondsLeft;
        secondsLeft = "potatoe";
        var score = finalSecondCount * rightAnswers;

    // We then display a message with the user's score

        var newULtwo = $("<ul>");
        
        $("#take-quiz").append(newULtwo);

        var scoreDisplay = $("<li>")
        scoreDisplay.text("You answered "+ rightAnswers + " questions correctly with " + finalSecondCount + " seconds to spare.  Your final score is " + score);
        newULtwo.append(scoreDisplay);
    //Textbox and submit button for user's initials
        initialPrompt = $("<li>");
        initialPrompt.text("Enter Your Initials Here");
        newULtwo.append(initialPrompt);
        var initialBox = $('<input type = "text" name="playername">');
        newULtwo.append(initialBox);
    //Submit button
        var submitScore = $('<input type="submit" value="Submit"/>');
        newULtwo.append(submitScore);


    //When the submit button is clicked...


    //////////////////////////////////////////////////////////////////
        $(submitScore).on("click", function displayScores(event) {
            event.preventDefault();
            var storedInitials = document.getElementsByName('playername');
        // We record the initials the user has typed..
            for (i = 0; i < storedInitials.length; i++) {
                if (storedInitials) {
                    var initialOut = storedInitials[i].value;
                    
                }

        // And store that plus their score in an object within an array
            var storeScore = [
            
                {
                    Initials: initialOut,
                    Score: score,

                }
            ];

            // Clear the html in "take-quiz" id
    $("#take-quiz").empty();

    //Turn our score object into a string so that it can be
    //put into localStorage
    var scoreString = JSON.stringify(storeScore);    

    // If the scoreboard already exists in LocalStorage
        if (localStorage.getItem('scoreBoard')){
        // We grab it from localStorage, parse it back into an object/array,
        //add the most recent entry, turn it back into a string, and
        // put it back into localStorage
           var existingScores = JSON.parse(localStorage.getItem('scoreBoard'));
           var joinEm = existingScores.concat(storeScore);
           var scoreBoard = JSON.stringify(joinEm);
           localStorage.setItem("scoreBoard", scoreBoard);
        // If it doesn't already exist, we create it in localStorage
        }else{

            var scoreBoard = scoreString;

            localStorage.setItem("scoreBoard", scoreBoard);
            
        }
    
    // Grab our score array from localStorage, parse it back into an array/object
    // and sort that array based on which score is highest
    var scoreDisplay = JSON.parse(localStorage.getItem('scoreBoard'));
    scoreDisplay.sort((a,b) => (a.Score > b.Score) ? -1 : 1)

    $("#description").text("These are the top five scores");

    var newULfour = $("<ul>")
    $("#take-quiz").append(newULfour);
    
    // This for loop is for displaying the top five scores
    for (var i = 0; i < 5; i++) {
        var scoreToInteger = scoreDisplay[i].Score;
        var newLI = $("<li>")
        newLI.text(i + 1 + ". " + scoreDisplay[i].Initials + " " + scoreToInteger + " points");
        newULfour.append(newLI);
    }

        var refreshBtn = $("<button>");
        refreshBtn.text("Back to Start");
        newULfour.append(refreshBtn);

        $(refreshBtn).on("click", function() {
            location.reload();
        });


            }
        });

}




});


