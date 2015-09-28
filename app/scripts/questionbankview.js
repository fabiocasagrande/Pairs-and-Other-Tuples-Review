function QuestionBankView(_simView) {
	// keep a link to the view
	this.simView = _simView;
}


QuestionBankView.prototype.presentQuestion = function(_question) {
	// display the new question
	for(var i=0;i<_question.length;i++){
		if(_question[i]=='~')
			$( "#lblQuestion" ).append("<br>");
		else if(_question[i]=='^')
			$( "#lblQuestion" ).append("&nbsp;");
		else{
			$( "#lblQuestion" ).append(_question[i]);
		}
	}
	//$( "#lblQuestion" ).text(_question);
}


/*
 * draw squares for each answer we'll consider - for example,
 * if we want 3 out of 5 correct to establish mastery then
 * we want to draw 5 squares. Then fill in each square based
 * on whether the answer was correct or incorrect.
 */
QuestionBankView.prototype.drawAnswerHistory = function(_answerHistory) {
	// clear the answer history display
	$( ".answerHistory" ).empty();
	// loop through all the items in the queue
	for (i = 0; i < _answerHistory.length; i++) {
		id = 'id = answerBlock' + i;
		// if we haven't provided an answer yet
		if (_answerHistory[i] == null) {
			$( ".answerHistory" ).append( "<div " + id + " class='answerBlock noAnswer'></div>" );
		// if the answer was right
		} else if (_answerHistory[i] == true) {
			$( ".answerHistory" ).append( "<div class='answerBlock rightAnswer'></div>" );
		// if the answer was wrong
		} else {
			$( ".answerHistory" ).append( "<div class='answerBlock wrongAnswer'></div>" );
		}
	}
}
