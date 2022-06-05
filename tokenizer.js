var identifier = "",
    string = "",
    character = "",
    previous = "",
    next = "",
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
    if (isInsideString) {

    }
    else {
        string += character;

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
                    break;
            }
        }
        else if (SALT.Helpers.isReservedKeyword(string)) {
            switch (string) {
                case SALT.keywords.with:

                    break;
                case SALT.keywords.if:
                    break;
                case SALT.keywords.else:
                    break;
            }
        }
    }
}

console.log(SALT.tokens);