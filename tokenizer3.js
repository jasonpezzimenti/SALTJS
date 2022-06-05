var identifier = "",
    string = "",
    position = -1,
    character = "",
    previous = "",
    next = "",
    isInsideString = false,
    isInsideScope = false,
    isInsideParentheses = false,
    isInsideBrackets = false,
    isInsideAngleBrackets = false,
    isExpectingString = false,
    isExpectingParenthesis = false,
    isExcpectingBracket = false,
    isExpectingAngleBracket = false,
    isExpectingIdentifier = false,
    isExpectingStringOrIdentifier = false,
    isExpectingActionOperator = true,
    isExpectingOutOperatorOrScope = false,
    isExpectingWithKeyword = false;

for (var index = 0; index < SALT.input.length; index++) {
    position = index;
    character = SALT.input[position];

    if (isInsideString) {

    }
    else {
        if (isExpectingActionOperator) {
            string += character;

            if (string === SALT.operators.actionOperator) {
                SALT.tokens.push({ type: "Operator", name: "ActionOperator", value: SALT.operators.actionOperator });
                string = "";
                isExpectingActionOperator = false;
                isExpectingOutOperatorOrScope = true;
            }
        }

        if (isExpectingOutOperatorOrScope) {
            if (character === SALT.symbols.openingBrace) {
                SALT.tokens.push({ type: "Symbol", name: "OpeningBraceSymbol", value: SALT.symbols.openingBrace });
                string = "";
                isExpectingOutOperatorOrScope = false;
                isInsideScope = true;
                isExpectingStringOrIdentifier = true;
            }
            else {
                if (string === SALT.operators.out) {
                    SALT.tokens.push({ type: "Operator", name: "OutOperator", value: SALT.operators.out });
                    string = "";
                    isExpectingOutOperatorOrScope = false;
                    isExpectingWithKeyword
                }
            }
        }

        if (isInsideScope) {
            if (isExpectingWithKeyword) {
                if (string === SALT.keywords.with) {
                    SALT.tokens.push({ type: "Keyword", name: "WithKeyword", value: SALT.keywords.with });
                    string = "";
                    isExpectingWithKeyword = false;
                    isExpectingStringOrIdentifier = true;
                }
            }

            if (isExpectingStringOrIdentifier) {
                if (character === SALT.symbols.doubleQuote) {
                    SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
                    string = "";
                    isInsideString = true;
                }
                else {
                    if (SALT.Helpers.isLetter(character)) {
                        string += character;
                    }
                    else {
                        if (character === SALT.operators.assignmentOperator) {
                            SALT.tokens.push({ type: "Identifier", name: "StringIdentifier", value: string });
                            SALT.tokens.push({ type: "Operator", name: "AssignmentOperator", value: SALT.operators.assignmentOperator });
                            string = "";
                            isExpectingStringOrIdentifier = false;
                            isExpectingString = false;
                            isExpectingIdentifier = false;
                        }
                        else if (character === SALT.operators.concatenationOperator) {
                            
                        }
                    }
                }
            }
        }
    }
}

console.log(SALT.tokens);