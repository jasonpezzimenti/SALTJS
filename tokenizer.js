var identifier = "",
    string = "",
    character = "",
    previous = "",
    next = "",
    position = -1,
    isInsideString = false,
    isInsideParentheses = false,
    isInsideBrackets = false,
    isInsideAngleBrackets = false,
    isInsideScope = false,
    isExpectingStringOrIdentifier = false,
    isExpectingString = false,
    isExpectingIdentifier = false,
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
    isExpectingActionIdentifier = false;

for (var index = 0; index < SALT.input.length; index++) {
    position = index;
    character = SALT.input[position];

    if (isInsideString) {
        if (character === SALT.symbols.backSlash) {
            string += character;
            previous = SALT.symbols.backSlash;
        }

        if (character === SALT.symbols.doubleQuote) {
            if (previous === SALT.symbols.backSlash) {
                string += character;
                previous = "";
            }
            else {
                SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
                SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });

                isInsideString = false;

                string = "";
            }
        }
        else {
            string += character;
        }
    }
    else {
        if (character !== SALT.symbols.whiteSpace) {
            string += character;
        }

        if (SALT.Helpers.isOperator(string)) {
            switch (string) {
                case SALT.operators.out:
                    SALT.tokens.push({ type: "Operator", name: "OutOperator", value: SALT.operators.out });

                    isExpectingValueToOutput = true;
                    isExpectingString = true;
                    isExpectingIdentifier = true;
                    isExpectingStringOrIdentifier = true;
                    isExpectingKeyword = true;
                    isExpectingWithKeyword = true;

                    string = "";
                    break;
                case SALT.operators.return:
                    SALT.tokens.push({ type: "Operator", name: "ReturnOperator", value: SALT.operator.return });

                    isExpectingValue = true;
                    isExpectingActionIdentifier = true;
                    isExpectingString = true;
                    isExpectingIdentifier = true;
                    isExpectingStringOrIdentifier = true;
                    isExpectingNumber = true;

                    string = "";
                    break;
                case SALT.operators.actionOperator:
                    SALT.tokens.push({ type: "Operator", name: "ActionOperator", value: SALT.operators.actionOperator });

                    isExpectingScope = true;
                    isExpectingOpeningBrace = true;
                    isExpectingActionIdentifier = true;

                    string = "";
                    break;
                default:
                    // Figure this out later.
                    if (string === SALT.symbols.whiteSpace) {
                        string = "";
                    }
                    break;
            }
        }
        else if (SALT.Helpers.isReservedKeyword(string)) {
            switch (string) {
                case SALT.keywords.with:
                    SALT.tokens.push({ type: "Keyword", name: "WithKeyword", value: SALT.keywords.with });

                    isExpectingValue = true;
                    isExpectingString = true;
                    isExpectingIdentifier = true;
                    isExpectingStringOrIdentifier = true;
                    isExpectingNumber = true;

                    string = "";
                    break;
                case SALT.keywords.if:
                    break;
                case SALT.keywords.else:
                    break;
            }
        }
        else if (SALT.Helpers.isSymbol(string)) {
            if (string !== SALT.symbols.whiteSpace) {
                SALT.tokens.push({ type: "Symbol", name: "Symbol", value: string });

                if (character === SALT.symbols.doubleQuote) {
                    isInsideString = true;
                }

                string = "";
            }
        }
        else {
            if (SALT.Helpers.isLetter(string)) {
                if (character === SALT.symbols.whiteSpace) {
                    string = "";
                }
            }
            else {

            }
        }
    }
}

console.log(SALT.tokens);