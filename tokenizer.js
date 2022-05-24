var string,
	identifier,
	previous,
	character,
	next,
	string = "",
	position = 0,
	isInsideString = false,
	isInsideParentheses = false,
	isInsideBrackets = false,
	isInsideScope = false,
	isExpectingParameter = false,
	isExpectingStrinrg = false,
	isExpectingIdentifier = false,
	isExpectingAction = false,
	isExpectingScope = false,
	identifierFound = false,
	stringFound = false;

var variables = [
	variable = {
		type: "",
		name: "",
		value: ""
	}
];

var errors = [
	error = {
		message: "",
		type: "",
		line: "",
		position: -1
	}
];

var clear = function() {
	string = "";
}

for(var index = 0; index < SALT.input.length; index++) {
	position = index;
	character = SALT.input[position];
	string += character;

	switch(string) {
		case SALT.operators.actionOperator:
			if(!isInsideString) {
				SALT.tokens.push({type: "Operator", name: "ActionOperator", value: SALT.operators.actionOperator});
				string = "";
			}
		break;
	}
	
	if(SALT.Helpers.isReservedKeywordOrOperator(string)) {
		switch(string) {
			case SALT.operators.out:
				SALT.tokens.push({type: "Operator", name: "OutOperator", value: SALT.operators.out});
			break;
		}
	}
}

console.log(SALT.tokens);
