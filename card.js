function BasicCard(front, back){
	this.front = front,
	this.back = back
}

function ClozeCard(fulltext, clozeDeletion){
	this.fulltext = fulltext,
	this.clozeDeletion = clozeDeletion
}

ClozeCard.prototype.partialtext = function(){

		if (this.fulltext.search(this.clozeDeletion) != -1){
			return this.fulltext.replace(this.clozeDeletion, " ... ");
			console.log(this.fulltext.replace(this.clozeDeletion, " ... "));
		} else {
			console.log("This text does not appear in the full text of your statement for the cloze card");
		}
	}

module.exports.BasicCard = BasicCard;
module.exports.ClozeCard = ClozeCard;