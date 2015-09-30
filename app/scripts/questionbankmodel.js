	

	
	var lengthQ1=5;
	var lengthInner=5;
	var quest=[];
	var quest1;
	var quest2;
	var maxx;
	var answ;
	
	
/*
 * Creates the first part of the question Ex  e=(a,b,c,d) 
 */
	createQuestionA = function(){
		
		quest1="( ";
		var temporary;
		var inn=0;
		while(inn<lengthQ1){
			
			temporary=getRandomInt(0,2);
			
			if(temporary==0){
			
				quest[inn]=getRandomValue();
				
			}else{
				maxx=getRandomInt(2,lengthInner);
				quest[inn]=getRandomValues(maxx);
			}
			
			quest1=quest1+quest[inn];
			
			if(inn+1!=lengthQ1)
				quest1=quest1+" , ";
			
			inn=inn+1;
		}
		
		quest1=quest1+" )";
		
	}
	
	
	getRandomValue = function(){
		
		var temp_= getListValues();
		return temp_[getRandomInt(0,temp_.length)];
		
	}
	

	getRandomValues = function(maxLength){
		
		var i=0;
		var temp_="(";
		
		while(i<maxLength){
			
			temp_=temp_+ getRandomValue();
				if(i+1!=maxx){
					temp_=temp_+",";
				}
			i=i+1;
		}
		
		return temp_+")";
	}
	
	
	
	getListValues = function(){
		
		return [["0"],["1"],["2"],["3"],["4"],["5"],["6"],["7"],["8"],["9"],["true"],["false"]];
		
	}
	
/*
 * Creates the second part of the question Ex  #1 (2# e)  or  #2 e
 */
	createQuestionB = function(){
		answ="";
		quest2="# ";
		var temp=getRandomInt(0,lengthQ1);
			
		if(quest[temp].length==1){
			answ=quest[temp];
			temp=temp+1;
			quest2=quest2+temp+" e";
			
		}else{
			temp=temp+1;
			quest2=quest2+temp+" e ";
			temp=temp-1;
			
			var temp1=getRandomInt(0,maxx);
			if(temp1>0){
				quest2="# "+temp1+" ( "+quest2+" )";
				answ=getSubList(quest[temp],temp1);
				answ=answ.replace(' ','');
			}else{
				answ=quest[temp];
			}	
		}
	}
	
	
	
	function getSubList(str,numero) {

    var res=[];
    var j=1;
    var field=" ";
    for(var i=1;i<str.length;i++){
     
       if(str.charAt(i)==',' || str.charAt(i)==')'){
             res[j]=field;
             field="";         
             j=j+1; 
       }else{
            field= field+str.charAt(i);
     }
   }
   return res[numero];
}	
	
/*
 * Stores the questions, answers and the answer history
 */

function QuestionBankModel(_simModel, _numerator, _denominator) {
	// save a link to the model
	this.simModel = _simModel;
	// the number of questions the student needs to answer right...
	this.numerator = _numerator;
	// out of this many of the most recent questions asked
	this.denominator = _denominator;
	// we need to keep track of the last <x> answers we've gotten
	// so we can test for mastery. we use an array as a queue that
	// stores as many answers as we're willing to consider
	this.resetAnswerHistory();
	
}


QuestionBankModel.prototype.resetAnswerHistory = function() {
	// start with an empty array
	this.answerHistory = [];
	// push a bunch of null objects into the history to represent questions
	// that haven't been asked yet
	for (var i = 0; i < this.denominator; i++) {
		this.answerHistory.push(null);
	}
}


/*
 * Add a new item to the back of the answer history, pull an item off
 * the front. Since the queue starts out filled with nulls, it is always
 * the same size.
 */
QuestionBankModel.prototype.updateAnswerHistory = function(newAnswer) {
	// add a new item to the back of the answer history
	this.answerHistory.push(newAnswer);
	// pull the oldest item off the front
	this.answerHistory.shift();
}


/*
 * Look at the answer history to see if we have met the criterion for
 * demonstrating mastery
 */
QuestionBankModel.prototype.masteryAchieved = function() {
	// count up the number of right answers
	var count = 0;
	// loop through the answer history
	for (var i = 0; i < this.answerHistory.length; i++) {
		// if we got the question right
		if (this.answerHistory[i]) {
			// increase our count
			count += 1;
		}
	}
	// compare the correct count to our goal
	return count >= this.numerator;
}


/*
 * Compare the student's answer to the correct answer(s).
 */
QuestionBankModel.prototype.checkAnswer = function (studentAnswer) {
	
	studentAnswer=studentAnswer.replace(/\s/g, '');
	for (var i = 0; i < this.answers.length; i++) {
		if (this.answers[i].toString().toLowerCase() == studentAnswer.toString().toLowerCase()) {
		
			return true;
		}
	}
	return false;
}


/*
 * choose a random template and useit to construct a new question string
 */
 
QuestionBankModel.prototype.chooseQuestion = function() {
	
	createQuestionA();
	createQuestionB();
	this.question ="Given: ~ ^^^^^^^^^^^^^^^^^^ val e = "+quest1+"  ~~ What is the value of " +quest2+" ? ";
	return this.question;

	}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}



/*
 * Set the answer(s) to the question indicated by questionIndex.
 * Right now I'm using a really clunky approach. I'm sure there's
 * a better way.
 */
QuestionBankModel.prototype.setAnswers = function() {
	// Reset answers array
	this.answers = [];
	//push the answer in
	this.answers.push(answ);
	
}
