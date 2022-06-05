var identifier = "",
	string = "",
	character,
	previous,
	next,
	position = 0,
	quoteFound = false,
	identifierFound = false,
	isInsideString = false,
	isInsideIfStatement = false;
	isConcatenating = false,
	endOfStringReached = false,
	concatenationOperatorFound = false,
	expectingStringOrIdentifier = false,
	expectingNumberOrIdentifier = false,
	expectingParameters = false,
	expectingAnotherANDSymbol = false,
	actionOperatorFound = false;

for(var index = 0; index < SALT.input.length; index++) {
	position = index;
	character = SALT.input[position];
	
	if(SALT.Helpers.isLetter(character)) {
		string += character;
		
		if(!isInsideString) {			
			if(isInsideIfStatement) {
				// SALT.tokens.push(character);
			}
			
			identifierFound = true;
			// identifier += character;
			// identifier = "";
			// string = "";
		}

		if(character === SALT.symbols.whiteSpace) {
			if(!isInsideString) {
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
				}

				SALT.tokens.push(SALT.symbols.whiteSpace);
			}
		}
		
		if(SALT.Helpers.isReservedKeywordOrOperator(string)) {
			switch(string) {
				case SALT.operators.out:
					SALT.tokens.push({ type: "Operator", name: "OutOperator", value: SALT.operators.out });

					string = "";
				break;
				case SALT.operators.return:
					SALT.tokens.push({ type: "Operator", name: "ReturnOperator", value: SALT.operators.return });
					string = "";
				break;
				case SALT.keywords.with:
					SALT.tokens.push({ type: "Keyword", name: "WithKeyword", value: SALT.keywords.with });
					string = "";
					expectingStringOrIdentifier = true;
				break; 
				case SALT.keywords.else:
					SALT.tokens.push({ type: "Keyword", name: "ElseKeyword", value: SALT.keywords.else });
					string = "";
					// Expecting open parenthesis.
				break;
				case SALT.keywords.if:
					SALT.tokens.push({ type: "Keyword", name: "IfKeyword", value: SALT.keywords.if });

					isInsideIfStatement = true;
					string = "";
			}
		}
		else {
			
		}
	}
	else if(SALT.Helpers.isDigit(character)) {
		if(isInsideString) {
			string += character;
		}
		else{
			if(identifierFound) {
				// string += character;
			}

			if(expectingParameters) {
				// string += character;
				SALT.tokens.push(character);
				string = "";
			}

			expectingNumberOrIdentifier = true;
		}
	}
	else if(SALT.Helpers.isSymbol(character)) {
		switch(character) {
			case SALT.symbols.hyphen:
				if(expectingNumberOrIdentifier) {
					expectingNumberOrIdentifier = true;
					if(string !== "") {
						SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
						string = character;
						SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
						string = "";
					}
				}
				else {
					string += character;
					previous = character;

					next = SALT.input[++position];
					if(identifierFound && next === SALT.symbols.closingAngleBracket) {
						identifierFound = false;

						if (identifier !== "") {
							SALT.tokens.push({ type: "Identifier", name: "Identifier", value: identifier });
						}

						SALT.tokens.push({ type: "Operator", name: "ActionOperator", value: SALT.operators.actionOperator });
						identifier = "";
						string = "";
					}
				}
			break;
			case SALT.symbols.closingAngleBracket:
				if(isInsideString) {
					string += character;
				}
				else {
					if(previous === SALT.symbols.hyphen) {
						string += character;
						if(string === SALT.operators.actionOperator) {
							SALT.tokens.push({ type: "Operator", name: "ActionOperator", value: SALT.operators.actionOperator });
							string = "";
							actionOperatorFound = true;
						}
					}
					else {
					}
					
					if(!previous === SALT.symbols.hyphen) {
						SALT.tokens.push({ type: "Operator", name: "GreaterThanOperator", value: SALT.operators.greaterThanOperator });
					}
				}
			break;
			case SALT.operators.assignmentOperator:
				if (identifier !== null) {
					if (identifier !== "") {
						SALT.tokens.push(identifier);
					}

					SALT.tokens.push({ type: "Operator", name: "AssignmentOperator", value: SALT.operators.assignmentOperator });
					identifierFound = true;
					string = "";
				}
			break;
			case SALT.symbols.openingAngleBracket:
				// string += character;
				// SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
				SALT.tokens.push({ type: "Symbol", name: "OpeningAngleBracketSymbol", value: SALT.symbols.openingAngleBracket});

				string = "";

			break;
			case SALT.symbols.openingParenthesis:
				if(identifierFound) {
					string += character;
					if (identifier !== "") {
						SALT.tokens.push(identifier);
					}
					SALT.tokens.push({ type: "Symbol", name: "OpeningParenthesisSymbol", value: SALT.symbols.openingParenthesis });
					string = "";
					expectingParameters = true;
				}
				else {
					SALT.tokens.push({ type: "Symbol", name: "OpeningParenthesisSymbol", value: SALT.symbols.openingParenthesis });
					expectingParameters = true;
				}
			break;
			case SALT.symbols.closingParenthesis:
				if(identifierFound) {
					
					if(string !== "") {
						SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					}

					SALT.tokens.push({ type: "Symbol", name: "ClosingParenthesisSymbol", value: SALT.symbols.closingParenthesis });

					string = "";
					expectingParameters = false;
					identifier = "";
					identifierFound = false;
					expectingNumberOrIdentifier = false;
				}
				else {
					SALT.tokens.push({ type: "Symbol", name: "ClosingParenthesisSymbol", value: SALT.symbols.closingParenthesis });

					expectingParameters = false;
					expectingNumberOrIdentifier = false;
				}
			break;
			case SALT.symbols.openingBrace:
				if(isInsideString) {
					string += character;
				}
				else {
					isInsideScope = true;
					// string += character;
					SALT.tokens.push({ type: "Symbol", name: "OpeningBraceSymbol", value: SALT.symbols.openingBrace });

					string = "";
				}
			break;
			case SALT.symbols.closingBrace:
				if(!isInsideString) {
					isInsideScope = false;
					SALT.tokens.push({ type: "Symbol", name: "ClosingBraceSymbol", value: SALT.symbols.closingBrace });
				}
				else {
					string += character;
				}
			break;
			case SALT.symbols.comma:
				if(expectingParameters) {
					// string += character;
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					SALT.tokens.push({ type: "Symbol", name: "CommaSymbol", value: SALT.symbols.comma });
					// console.log(string);
					string = "";
					identifier = "";
				}

				if(!isInsideString) {
					SALT.tokens.push({ type: "Symbol", name: "CommaSymbol", value: SALT.symbols.comma });
				}
			break;
			case SALT.symbols.doubleQuote:
				if(!isInsideString) {
					isInsideString = true;
					
					if (identifierFound) {
						SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
						identifierFound = false;
						identifier = "";
					}
					else {
						SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
					}
				}
				else {
					if(previous === SALT.symbols.backSlash) {
						string += character;
						previous = "";
					}
					else {
						if(string !== "") {
							SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
						}
						SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
						string = "";
						isInsideString = false;
					}
					
					if(identifierFound) {
						string += character;
					}
				}
			break;
			case SALT.symbols.backSlash:
				if(isInsideString) {
					if(previous === SALT.symbols.backSlash) {
						string += character;
					}
					
					previous = SALT.symbols.backSlash;
				}
			case SALT.symbols.EOS:
				if(identifierFound) {
					if(string !== "") {
						SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
						identifierFound = false;
						identifier = "";
					}
					
					identifierFound = false;
					expectingStringOrIdentifier = false;
					isInsideString = false;
					string = "";
					identifier = "";
				}
				else {
					if (identifier !== "") {
						SALT.tokens.push(identifier);
					}
				}

				SALT.tokens.push({ type: "Symbol", name: "EndOfStatementSymbol", value: SALT.symbols.EOS });
			break;
			case SALT.operators.concatenationOperator:
				expectingStringOrIdentifier = true;
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
				}

				string = "";
				SALT.tokens.push({ type: "Operator", name: "ConcatenationOperator", value: SALT.symbols.concatenationOperator });
			break;
			case SALT.operators.additionOperator:
				expectingNumberOrIdentifier = true;
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
				}

				string = "";
				SALT.tokens.push({ type: "Operator", name: "ConcatenationOperator", value: SALT.symbols.concatenationOperator });
			break;
			case SALT.operators.multiplicationOperator:
				expectingNumberOrIdentifier = true;
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = character;
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = "";
				}
			break;
			case SALT.operators.subtractionOperator:
				expectingNumberOrIdentifier = true;
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = character;
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = "";
				}
			break;
			case SALT.operators.equationOperator:
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = character;
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = "";
				}
			break;
			case "&":
				if(!expectingAnotherANDSymbol) {
					expectingAnotherANDSymbol = true;
					string += character;
				}
				else {
					if(string !== "") {
						SALT.tokens.push({ type: "Operator", name: "LogicalANDOperator", value: SALT.operators.logicalANDOperator });
						string = character;
						string = "";
					}
				}
			break;
			case SALT.operators.divisionOperator:
				expectingNumberOrIdentifier = true;
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = character;
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = "";
				}
			break;
			case SALT.operators.modulusOperator:
				expectingNumberOrIdentifier = true;
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = character;
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = "";
				}
			break;
			case SALT.operators.lessThanOperator:
				expectingNumberOrIdentifier = true;
				string += character;
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = "";
				}
			break;
			case SALT.operators.greaterThanOperator:
				// expectingNumberOrIdentifier = true;

				string += character;
				if(string !== "") {
					SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
					string = "";
				}
			break;
			case SALT.symbols.whiteSpace:
				if(isInsideString) {
					string += character;
				}
			break;
			default:
				if(isInsideString) {
					string += character;
				}
			break;
		}
	}
}

console.log(SALT.tokens);
