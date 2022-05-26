var identifier = "",
	string = "",
	character,
	previous,
	next,
	position = 0,
	isInsideString = false,
	expectingNumberOrIdentifier = false;

SALT.tokens = [];

function tokenizeLetter() {
	string += character;
		
	identifier += character;
	
	if(SALT.Helpers.isReservedKeyword(string)) {
		SALT.tokens.push(string);
		string = "";
		identifier = "";
	}
}

function tokenizeDigit() {
	string += character;
	identifier += character;
}

function pushIdentifierIfExists() {
	if(identifier != "") {
		SALT.tokens.push(identifier);
		string = "";
		identifier = "";
		expectingNumberOrIdentifier = false;
	}
}

function tokenizeWhiteSpace() {
	pushIdentifierIfExists();
}

function tokenizeOperator() {
	pushIdentifierIfExists();

	if (expectingNumberOrIdentifier && 
		(character === SALT.operators.subtractionOperator || character === SALT.operators.additionOperator)) {
		string += character;
		identifier += character;
	}
	else {
		SALT.tokens.push(character);
		string = "";
		identifier = "";
		expectingNumberOrIdentifier = true;
	}
}

function tokenizeHyphen() {

	if(position < SALT.input.length - 1) {
		var checkActionOperator = character + SALT.input[position + 1];

		if(checkActionOperator === SALT.operators.actionOperator) {
			pushIdentifierIfExists();
			SALT.tokens.push(SALT.operators.actionOperator);
			position++;
			index++;
			return;
		}
	}

	tokenizeOperator();
}

function tokenizeDoubleQuote() {
	if(isInsideString) {
		string += SALT.symbols.doubleQuote;
		identifier += SALT.symbols.doubleQuote;

		pushIdentifierIfExists();
		isInsideString = false;
	}
	else {
		pushIdentifierIfExists();

		isInsideString = true;
		
		string += SALT.symbols.doubleQuote;
		identifier += SALT.symbols.doubleQuote;
	}
}

function tokenizeBackSlash() {
	if(isInsideString) {

		if(position < SALT.input.length - 1) {
			position++;
			index++;

			var next = SALT.input[position];

			string += character + next;
			identifier += character + next;
		}
		else {
			console.error("Unexpected end of file. We expect a backslash thingy.")
		}
	}
	else {
		console.error("Backslash outside of string");
	}
}

function tokenizeSymbol() {
	switch(character) {
		case SALT.symbols.openingParenthesis:
		case SALT.symbols.closingParenthesis:
		case SALT.symbols.openingBrace:
		case SALT.symbols.closingBrace:
			pushIdentifierIfExists();

			SALT.tokens.push(character);
		break;
		case SALT.symbols.doubleQuote:
			tokenizeDoubleQuote();
		break;
		case SALT.symbols.backSlash:
			tokenizeBackSlash();
		break;
		case SALT.symbols.EOS:
			pushIdentifierIfExists();

			SALT.tokens.push(SALT.symbols.EOS);
		break;
		case SALT.operators.subtractionOperator:
		case SALT.symbols.hyphen:
			tokenizeHyphen();
		break;
		case SALT.symbols.openingAngleBracket:
		case SALT.symbols.closingAngleBracket:
		case SALT.operators.assignmentOperator:
		case SALT.symbols.comma:
		case SALT.operators.concatenationOperator:
		case SALT.operators.additionOperator:
		case SALT.operators.divisionOperator:
		case SALT.operators.modulusOperator:
		case SALT.operators.multiplicationOperator:
		case SALT.operators.equationOperator:
			tokenizeOperator();
		break;
		case SALT.symbols.whiteSpace:
			tokenizeWhiteSpace();
		break;
		default:
			console.error("ERROR: for " + character);
		break;
	}
}

for(var index = 0; index < SALT.input.length; index++) {
	position = index;
	character = SALT.input[position];

	if(isInsideString && character !== SALT.symbols.doubleQuote && character !== SALT.symbols.backSlash) {
		string += character;
		identifier += character;
		continue;
	}

	if(SALT.Helpers.isLetter(character)) {
		tokenizeLetter();
		continue;
	}
	else if(SALT.Helpers.isDigit(character)) {
		tokenizeDigit();
		continue;
	}
	else if(SALT.Helpers.isSymbol(character)
		|| SALT.Helpers.isOperator(character)) {
		tokenizeSymbol();
		continue;
	}
}

console.log(SALT.input);
console.log(SALT.tokens);