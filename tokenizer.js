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
    isExpectingExpression = false;

for (var index = 0; index < SALT.input.length; index++) {

}

console.log(SALT.tokens);