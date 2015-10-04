/*
 * main.js
 * Rich Simpson
 * August 4, 2015
 *
 * This code implements a mastery-based exercise on graph
 * theory for integration with Smart Sparrow.
 *
 * This is our controller - The C in MVC
 */
 
var numberOfQuestions = 5;

/*
 * Create the sim controller
 */
function SimController() {
	// create a data model that exposes parameters to smart sparrow
	this.simModel = new SimModel(this, {
		
		mastery: 'false',
		numerator: (numberOfQuestions),
		denominator: 15,
		firstQuestion: 0,
		lastQuestion: 0,
		
		quest: [],
		lengthQ1:5,
		lengthInner:5,
		quest1:"",
		quest2:"",
		maxx:"",
		answ:"",
		
	});
	// expose model data to Smart Sparrow
	pipit.CapiAdapter.expose('mastery', this.simModel);
	pipit.CapiAdapter.expose('numerator', this.simModel);
	pipit.CapiAdapter.expose('denominator', this.simModel);
	pipit.CapiAdapter.expose('firstQuestion', this.simModel);
	pipit.CapiAdapter.expose('lastQuestion', this.simModel);
	pipit.CapiAdapter.expose('quest', this.simModel);
	pipit.CapiAdapter.expose('lengthQ1', this.simModel);
	pipit.CapiAdapter.expose('lengthInner', this.simModel);
	pipit.CapiAdapter.expose('quest1', this.simModel);
	pipit.CapiAdapter.expose('quest2', this.simModel);
	pipit.CapiAdapter.expose('maxx', this.simModel);
	pipit.CapiAdapter.expose('answ', this.simModel);
	// let smart sparrow know that the sim is ready to accept values
	pipit.Controller.notifyOnReady();
	// create the view controller
	this.simView = new SimView(this);
}

SimController.prototype.initializeController = function() {
	// initialize the model
	this.simModel.initializeModel();
	// initialize the view
	this.setupDisplay();
}


SimController.prototype.setModelValue = function(_name, _newValue) {
	this.simModel.set(_name, _newValue);
}


SimController.prototype.getModelValue = function(_name) {
	return this.simModel.get(_name);
}


SimController.prototype.triggerCheck = function() {
	pipit.Controller.triggerCheck();
}


SimController.prototype.setupDisplay = function() {
	// create a brand new fringe
	this.simModel.fringe.randomFringe(getRandomInt(5, 9));
	// choose a question randomly
	var question = this.simModel.questionBank.chooseQuestion();
	// store the answer(s) to the question we chose in the last step
	this.simModel.questionBank.setAnswers();
	// draw the results for the last five questions
	this.simView.questionBankView.drawAnswerHistory(this.simModel.questionBank.answerHistory);
	// display the next question
	this.simView.questionBankView.presentQuestion(question);
}


// Create a new Controller for sim
// The controller interacts with the model and the view
var simController = new SimController();


$(document).ready(function() {
	// let smart sparrow know that the sim is ready to accept values
	//pipit.Controller.notifyOnReady();
});
