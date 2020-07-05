$(document).ready(function(){

    $("#description").text("Answer the multiple choice questions below to test your coding knowledge.");

    // questionNum determines what question will be asked
    var questionNum = 0;

    // secondsLeft determines how much time the user has left

    var secondsLeft = 60;

    // rightAnswers will count the number of questions answered correctly 
    // and help us calculate the user's score

    var rightAnswers = 0;

    // Create an empty object that we will store scores in

    

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
                $("#timer").text(secondsLeft);
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
            $("#start-quiz").addClass("inactive");
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
        var finalSecondCount = secondsLeft;
        secondsLeft = "potatoe";
        var score = finalSecondCount * rightAnswers;

        var newULtwo = $("<ul>");
        
        $("#take-quiz").append(newULtwo);

        var scoreDisplay = $("<li>")
        scoreDisplay.text("You answered "+ rightAnswers + " questions correctly with " + finalSecondCount + " seconds to spare.  Your final score is " + score);
        newULtwo.append(scoreDisplay);

        initialPrompt = $("<li>");
        initialPrompt.text("Enter Your Initials Here");
        newULtwo.append(initialPrompt);

        var initialBox = $('<input type = "text" name="playername">');
        newULtwo.append(initialBox);

        var submitScore = $('<input type="submit" value="Submit"/>');
        newULtwo.append(submitScore);

        $(submitScore).on("click", function(event) {
            event.preventDefault();
            var storedInitials = document.getElementsByName('playername');

            for (i = 0; i < storedInitials.length; i++) {
                if (storedInitials) {
                    var initialOut = storedInitials[i].value;
                    
                }
   

            var storeScore = [
                {
                    Initials: initialOut,
                    Score: score,

                }
            ];





        

            

            }
        });

}

});


