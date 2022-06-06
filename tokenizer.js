var identifier = "",
    string = "",
    character = "",
    previous = "",
    next = "",
    position = -1,
    identifierFound = false,
    isInsideString = false,
    isInsideParentheses = false,
    isInsideBrackets = false,
    isInsideAngleBrackets = false,
    isInsideScope = false,
    isExpectingStringOrIdentifier = false,
    isExpectingString = false,
    isExpectingIdentifier = false,
    isExpectingNumber = false,
    isExpectingOpeningParenthesis = false,
    isExpectingClosingParenthesis = false,
    isExpectingOpeningBracket = false,
    isExpectingClosingBracket = false,
    isExpectingOpeningBrace = false,
    isExpectingClosingBrace = false,
    isExpectingOpeningAngleBracket = false,
    isExpectingClosingAngleBracket = false,
    isExpectingScope = false,
    isExpectingParameters = false,
    isExpectingType = false,
    isExpectingAttributes = false,
    isExpectingKeyword = false,
    isExpectingOperator = false,
    isExpectingActionOperator = false,
    isExpectingStatement = false,
    isExpectingExpression = false,
    isExpectingValueToOutput = false,
    isExpectingValue = false,
    isExpectingActionIdentifier = false,
    isExpectingActionIdentifierOrScope = false,
    isExpectingStatementOrActionIdentifier = false;

for (var index = 0; index < SALT.input.length; index++) {
    position = index;
    character = SALT.input[position];

    if (isInsideString) {
        if (character === SALT.symbols.backSlash) {
            previous = SALT.symbols.backSlash;
        }
        else if (character === SALT.symbols.doubleQuote) {
            if (previous === SALT.symbols.backSlash) {
                string += character;
            }
            else {
                SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
                SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });

                isInsideString = false;
                isExpectingStringOrIdentifier = false;
                isExpectingConcatenationOperatorOrEndOfStatement = true;

                string = "";
            }
        }
        else {
            string += character;
        }
    }
    else {
        if (SALT.Helpers.isReservedKeyword(string) || SALT.Helpers.isOperator(string)) {
            switch (string) {
                case SALT.operators.actionOperator:
                    SALT.tokens.push({ type: "Operator", name: "ActionOperator", value: SALT.operators.actionOperator });

                    isExpectingActionIdentifierOrScope = true;

                    string = "";
                    break;
                case SALT.operators.out:
                    SALT.tokens.push({ type: "Operator", name: "OutOperator", value: SALT.operators.out });

                    isExpectingStringOrIdentifier = true;
                    isExpectingNumber = true;

                    string = "";
                    break;
                case SALT.operators.return:
                    SALT.tokens.push({ type: "Operator", name: "ReturnOperator", value: SALT.operators.return });

                    isExpectingStringOrIdentifier = true;

                    string = "";
                    break;
                case SALT.keywords.with:
                    SALT.tokens.push({ type: "Keyword", name: "WithKeyword", value: SALT.keywords.with });
                    string = "";
                    break;
                case SALT.operators.concatenationOperator:
                    SALT.tokens.push({ type: "Operator", name: "ConcatenationOperator", value: SALT.operators.concatenationOperator });

                    isExpectingStringOrIdentifier = true;

                    string = "";
                    break;
                case SALT.operators.assignmentOperator:
                    if (isExpectingStatementOrActionIdentifier) {
                        SALT.tokens.push({ type: "Identifier", name: "Identifier", value: string });
                        SALT.tokens.push({ type: "Operator", name: "AssignmentOperator", value: SALT.operators.assignmentOperator });
                    }

                    string = "";
                    break;
                default:
                    // Remove if this breaks anything. :P
                    string += character;
                    break;
            }
        }
        else if (SALT.Helpers.isSymbol(character)) {
            switch (character) {
                case SALT.symbols.doubleQuote:
                    SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });

                    isInsideString = true;

                    string = "";
                    break;
                case SALT.symbols.EOS:
                    if (isExpectingStringOrIdentifier) {
                        SALT.tokens.push({ type: "Identifier", name: "Identifier", value: string });
                    }

                    SALT.tokens.push({ type: "Symbol", name: "EndOfStatementSymbol", value: SALT.symbols.EOS });

                    isInsideString = false;
                    isExpectingString = false;
                    isExpectingIdentifier = false;
                    isExpectingStringOrIdentifier = false;
                    isExpectingNumber = false;

                    string = "";
                    break;
                case SALT.operators.concatenationOperator:
                    if (isExpectingStringOrIdentifier) {
                        SALT.tokens.push({ type: "Identifier", name: "Identifier", value: string });
                    }

                    SALT.tokens.push({ type: "Operator", name: "ConcatenationOperator", value: SALT.operators.concatenationOperator });

                    isExpectingStringOrIdentifier = true;

                    string = "";
                    break;
                case SALT.symbols.openingBrace:
                    SALT.tokens.push({ type: "Symbol", name: "OpeningBraceSymbol", value: SALT.symbols.openingBrace });

                    isExpectingStatementOrActionIdentifier = true;

                    string = "";
                    break;
                case SALT.operators.assignmentOperator:
                    if (isExpectingStatementOrActionIdentifier) {
                        SALT.tokens.push({ type: "Identifier", name: "Identifier", value: string });
                        SALT.tokens.push({ type: "Operator", name: "AssignmentOperator", value: SALT.operators.assignmentOperator });
                    }

                    string = "";
                    break;
                default:
                    // Remove if this breaks anything. :P
                    string += character;
                    break;
            }
        }
        else {
            if (character === SALT.symbols.whiteSpace) {
                continue;
            }
            else {
                string += character;
            }
        }
    }
}

console.log(SALT.tokens);