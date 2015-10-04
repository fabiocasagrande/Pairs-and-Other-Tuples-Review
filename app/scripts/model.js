/*
 * models.js
 * Rich Simpson
 * August 4, 2015
 *
 * This code implements a mastery-based exercise on graph
 * theory for integration with Smart Sparrow.
 *
 * This is our data model - The M in MVC
 */


/*
 * I use this function to empty out all of the arrays that
 * I use in this program.
 */
function emptyOutArray(myArray) {
	myArray.length = 0;
}


// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


/*
 * The GraphModel consists of an array of nodes and an array
 * of edges.
 */
function SimModel(_controller, _attrs) {
	// save a link to the controller
	this.controller = _controller;
	// we want SimModel to inherit from CapiModel so SmartSparrow
	// can access values within the model - here I call the CapiModel
	// constructor
	pipit.CapiAdapter.CapiModel.call(this, _attrs)

	// the things below are in the data model so I don't declare them here
	// this flag is set to true when the mastery condition is reached
	//this.mastery = false;
	// this is the numerator for the mastery condition - how many right
	//this.masteryNumerator = 4;
	// this is the denominator for the mastery condition - out of how many total?
	//this.masteryDenominator = 5;
	// the index of the first legal question template in the template array
	// this.firstQuestion = 0
	// the index of the last legal question template in the template array
	// this.lastQuestion = 4
} // GraphModel


/*
 * This defines CapiModel as the prototype for GraphModel, so we inherit
 * from CapiModel
 */
SimModel.prototype = new pipit.CapiAdapter.CapiModel;


SimModel.prototype.initializeModel = function() {
	// the fringe is used to answer questions
	this.fringe = new FringeModel(this);
	// the question bank stores the questions, the answers and the student's
	// answer history
	this.questionBank = new QuestionBankModel(this, this.get('numerator'),this.get('denominator'),this.get('quest'),this.get('lengthQ1'),this.get('lengthInner'),this.get('quest1'),this.get('quest2'),this.get('maxx'),this.get('numerator'),this.get('answ'));
}
