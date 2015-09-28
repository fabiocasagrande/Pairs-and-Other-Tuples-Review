<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<link rel="stylesheet" type="text/css" href="app/styles/style.css"/>
		<link rel="stylesheet" type="text/css" href="app/styles/bootstrap.min.css">
		<title>Which Node Gets Expanded Next?</title>

	</head>
	<body>
		<div class="starter-template">
			<div class="container">
				<div class="row">
					<h3>Contents of Fringe</h3>
					<div id='fringeTableDiv'>
					</div>
				</div>

				<div class="row">
					<div class="form-group">
						<label id="lblQuestion"></label>
						<input type="text" class="form-control" placeholder="Answer here" id="txtAnswer">
						<button id="btnStart" type="button" class="btn btn-primary">Start App</button>
						<button id="btnSubmit" type="button" class="btn btn-primary" disabled="true">Submit</button>
						<button id="btnNextQuestion" type="button" class="btn btn-primary" disabled="true">Next Question</button>
					</div>
				</div>

				<div class="row">
					<div id="txtFeedback">
					</div>
				</div>

				<div class="row">
					<h4>Answer History</h4>
					<div class='answerHistory'></div>
				</div>

			</div>
		</div>

		<script src="https://d1rpkia8qpfj4t.cloudfront.net/js/pipit-0.62.min.js"></script>
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="libs/jquery-1.11.3.min.js"></script>
		<!-- Include all compiled plugins (below), or include individual files as needed -->
		<script src="libs/bootstrap.min.js"></script>
		<script src="app/scripts/fringemodel.js"></script>
		<script src="app/scripts/questionbankmodel.js"></script>
		<script src="app/scripts/model.js"></script>
		<script src="app/scripts/fringeview.js"></script>
		<script src="app/scripts/questionbankview.js"></script>
		<script src="app/scripts/view.js"></script>
		<script src="app/scripts/controller.js"></script>

	</body>
</html>
