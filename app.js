var inquirer = require("inquirer");
var mysql = require("mysql");
var BasicCard = require("./card.js").BasicCard;
var ClozeCard = require("./card.js").ClozeCard;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "flashcards"
});

connection.connect(function(err) {
  if (err) throw err;
});


inquirer.prompt([
	{
		type: 'list',
		name: 'cardType',
		message: 'Which type of flashcard would you like to create?',
		choices:["Basic", "Cloze"]
	}
	
]).then(function(input){

	if(input.cardType === "Basic"){
		basicPrompt();
	} else {
		clozePrompt();
	}
});




var basicPrompt = function(){
	inquirer.prompt([
		{
			type: 'input',
			name: 'frontQuestion',
			message: 'Please enter your question for the front of the basic card.'
		},
		{
			type: 'input',
			name: 'backanswer',
			message: 'Please enter your answer for the back of the basic card.'
		}
	]).then(function(input){
		var cardInfo = new BasicCard(input.frontQuestion,input.backanswer);
		connection.query("INSERT INTO cards SET ?",[{
			cardType: "Basic",
			front: cardInfo.front,
			back: cardInfo.back
		}, function(err) {
	      	if (err) throw err;
	  		}]
		);
	});
}

var clozePrompt = function (){
	inquirer.prompt([
		{
			type: 'input',
			name: 'fulltext',
			message: 'Please enter the full text of your statement for the cloze card.'
		},
		{
			type: 'input',
			name: 'clozeDeletion',
			message: 'Please enter the section of the cloze card statement you\'d like to delete.'
		}
	]).then(function(input){
		var cardInfo = new ClozeCard(input.fulltext,input.clozeDeletion);
		connection.query("INSERT INTO cards SET ?",[{
			cardType: "Cloze",
			front: cardInfo.partialtext(),
			back: cardInfo.fulltext
		}, function(err) {
	      	if (err) throw err;
	  		}]
		);
	});
}

