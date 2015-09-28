/*
 * Each node in the fringe represents a node in the search tree. Each node
 * in the search tree represents a unique path through the graph.
 */
function FringeNode(_path, _totalCost, _heuristic) {
	// the path through the graph - stored as an array of node indexes
	this.path = _path;
	// the total cost of the path through the graph
	this.totalCost = _totalCost;
	// the heuristic value of the tree node is the heuristic value of the
	// last node in the path represented by the node
	this.heuristic = _heuristic;
}


/*
 * I have a heuristic function so randomly-chosen paths have consistent
 * heuristic values
 */
function hScore(_path) {
	// get last node in path
	var lastNode = _path[_path.length - 1];
	// convert it to an integer and return that integer
	return lastNode.charCodeAt() - 60;
}

/*
 * The g-score is used by the A* algorithm. It combines the total cost of
 * the path (i.e., looking backwards) and the heuristic (i.e., looking
 * forwards).
 */
FringeNode.prototype.gScore = function() {
	return this.totalCost + this.heuristic;
}


/*
 * The fringe is represented as an ordered list of nodes.
 */
function FringeModel(_simModel) {
	// save a link to the model
	this.simModel = _simModel;
	// store the fringe as an ordered list
	this.fringeNodes = [];
}


/*
 * This function creates a fringe with random stuff in it for use in questions
 */
FringeModel.prototype.randomFringe = function(_fringeLength) {
	// start with an empty fringe
	this.fringeNodes = [];
	// for each node in the fringe
	for (var i = 0; i < _fringeLength; i++) {
		// add the new node to the fringe list
		this.fringeNodes.push(this.randomNode());
	}
}


/*
 * This function creates a node with random values for use in questions
 */
FringeModel.prototype.randomNode = function() {
	//
	// create a random path
	//
	// start with an empty path
	var path = [];
	// choose a random length
	var pathLength = getRandomInt(2, 10);
	// for each item in the path
	for (var i = 0; i < pathLength; i++) {
		// add a random item to the path
		path.push(String.fromCharCode(65 + getRandomInt(0, 20)));
	}
	//
	// choose random values for total cost and heuristic, create the node
	// and return it
	//
	return new FringeNode(path, getRandomInt(1, 15), hScore(path));
}


FringeModel.prototype.addNode = function(_path, _totalCost, _heuristic) {
	// create a new fringe node object
	var newFringeNode = new FringeNode(_path, _totalCost, _heuristic);
	// push it on to the end of the fringe
	this.fringeNodes.push(newFringeNode);
}


/*
 * Return a list of all the nodes that have the lowest cost. For use in
 * uniform cost search
 */
FringeModel.prototype.lowestCost = function() {
	//
	// find the lowest cost
	//
	// start with the first node...
	var minCost = this.fringeNodes[0].totalCost;
	// loop through the rest
	for (var i = 1; i < this.fringeNodes.length; i++) {
		// compare the lowest value we found with the current node's cost
		if (this.fringeNodes[i].totalCost < minCost) {
			// keep track of the lowest value we find
			minCost = this.fringeNodes[i].totalCost;
		}
	}
	//
	// create a list of nodes with the lowest total cost
	//
	// start with an empty list
	var nodeList = [];
	// loop through the nodes
	for (i = 0; i < this.fringeNodes.length; i++) {
		// compare the lowest value we found with the current node's cost
		if (this.fringeNodes[i].totalCost == minCost) {
			// add it to the list
			nodeList.push(i);
		}
	}
	// return the list
	return nodeList;
}


/*
 * Return a list of all the nodes that have the lowest heuristic. For use in
 * greedy search
 */
FringeModel.prototype.lowestHeuristic = function() {
	//
	// find the lowest cost
	//
	// start with the first node...
	var minHeuristic = this.fringeNodes[0].heuristic;
	// loop through the rest
	for (var i = 1; i < this.fringeNodes.length; i++) {
		// compare the lowest value we found with the current node's cost
		if (this.fringeNodes[i].heuristic < minHeuristic) {
			// keep track of the lowest value we find
			minHeuristic = this.fringeNodes[i].heuristic;
		}
	}
	//
	// create a list of nodes with the lowest total cost
	//
	// start with an empty list
	var nodeList = [];
	// loop through the nodes
	for (i = 0; i < this.fringeNodes.length; i++) {
		// compare the lowest value we found with the current node's cost
		if (this.fringeNodes[i].heuristic == minHeuristic) {
			// add it to the list
			nodeList.push(i);
		}
	}
	// return the list
	return nodeList;
}


/*
 * Return a list of all the nodes that have the lowest g-score. For use in
 * A* search
 */
FringeModel.prototype.lowestGScore = function() {
	//
	// find the lowest g-score
	//
	// start with the first node...
	var minScore = this.fringeNodes[0].gScore();
	// loop through the rest
	for (var i = 1; i < this.fringeNodes.length; i++) {
		// compare the lowest value we found with the current node's score
		if (this.fringeNodes[i].gScore() < minScore) {
			// keep track of the lowest value we find
			minScore = this.fringeNodes[i].gScore();
		}
	}
	//
	// create a list of nodes with the lowest total cost
	//
	// start with an empty list
	var nodeList = [];
	// loop through the nodes
	for (i = 0; i < this.fringeNodes.length; i++) {
		// compare the lowest value we found with the current node's cost
		if (this.fringeNodes[i].gScore() == minScore) {
			// add it to the list
			nodeList.push(i);
		}
	}
	// return the list
	return nodeList;
}


/*
 * Which node is removed from the fringe depends on which algorithm we
 * are using
 */
FringeModel.prototype.removeNode = function(_searchAlgorithm) {
	// BFS - take node at front of fringe (added least recently)
	if (_searchAlgorithm == 'BFS') {
		return this.fringeNodes.shift();
	// DFS - take node at back of fringe (added most recently)
	} else if (_searchAlgorithm == 'DFS') {
		return this.fringeNodes.pop();
	}

	// UCS - take node with lowest total path cost

	// Greedy - take node with lowest heuristic

	// A* - take node with lowest g-score
}
