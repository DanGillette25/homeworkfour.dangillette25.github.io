$(document).ready(function(){

    // questionNum determines what question will be asked
    var questionNum = -1;

    // secondsLeft determins how much time the user has left
    var secondsLeft = 75;

    // When the "start quiz" button is clicked
    $("#start-quiz").on("click", function startQuiz() {

            // The first step with the startQuiz function is to move to the next question and make sure we clear out the previous question
            questionNum = questionNum + 1;
            $("#take-quiz").empty();


        

            //Hide the "take quiz" button and make the quiz and timer elements visible
            $("#take-quiz").removeClass("inactive");
            $("#start-quiz").addClass("inactive");
            $("#timer").removeClass("inactive");

            function setTime() {
                var timerInt = setInterval(function() {
                    secondsLeft--;
                    $("#timer").text(secondsLeft);
                }, 1000);
    
            }
    
            setTime();

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
                // in any case, we clear the previous question out and then load the next one
                if(radioOut == correctAnswer){
                    alert("Yes!")
                    startQuiz();
                } else {
                    alert("No!")
                    startQuiz();
                }

            

        });

    });

});


