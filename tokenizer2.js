var identifier = "",
    string = "",
    character = "",
    previous = "",
    next = "",
    position = 0,
    isInsideString = false,
    isInsideBrackets = false,
    isInsideAngleBrackets = false,
    isInsideParentheses = false,
    isInsideScope = false,
    isExpectingIdentifier = false,
    isExpectingString = false,
    isExpectingParameters = false,
    isExpectingAttributes = false,
    isExpectingType = false,
    isExpectingActionOperator = true,
    isExpectingStatementOrScope = false,
    isExpectingStringOrIdentifier = false,
    isExpectingOutStatementOrIdentifierOrAction = false,
    isExpectingExpressionOrAction = false,
    isExpectingConcatenationOperatorOrEndOfStatement = false,
    isCalculating = false,
    isConcatenating = false;

for (var index = 0; index < SALT.input.length; index++) {
    position = index;
    character = SALT.input[position];

    if (character === SALT.symbols.whiteSpace) {
        if (!isInsideString) {
            continue;
        }
    }

    if (isInsideString) {
        if (character === SALT.symbols.backSlash) {
            previous = SALT.symbols.backSlash;
        }

        if (previous === SALT.symbols.backSlash) {
            if (character === SALT.symbols.doubleQuote) {
                string += character;
                previous = "";
            }
            else {
                string += character;
            }
        }
        else {
            if (character === SALT.symbols.doubleQuote) {
                if (previous === SALT.symbols.backSlash) {
                    string += character;
                }
                else {
                    SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
                    isInsideString = false;
                    isExpectingConcatenationOperatorOrEndOfStatement = true;
                }
            }
            else {
                string += character;
            }
        }
    }
    else {
        if (isExpectingStringOrIdentifier) {
            if (character === SALT.symbols.doubleQuote) {
                SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
                isInsideString = true;
                string = "";
            }

            if (character === SALT.operators.concatenationOperator) {
                SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
                SALT.tokens.push({ type: "Operator", name: "ConcatenationOperator", value: SALT.operators.concatenationOperator });
                string = "";
                isExpectingStringOrIdentifier = true;
            }

            if (!SALT.Helpers.isReservedKeywordOrOperator(identifier) && !SALT.Helpers.isSymbol(identifier)) {


                if (character === SALT.operators.concatenationOperator) {
                    SALT.tokens.push({ type: "Operator", name: "ConcatenationOperator", value: SALT.operators.concatenationOperator });
                    identifier = "";
                    string = "";
                }
                else if (character === SALT.symbols.EOS) {
                    SALT.tokens.push({ type: "Symbol", name: "EndOfStatementSymbol", value: SALT.symbols.EOS });
                    identifier = "";
                    string = "";
                    isInsideString = false;
                    isExpectingConcatenationOperatorOrEndOfStatement = false;
                    isExpectingStringOrIdentifier = false;
                }
            }
        }

        if (isExpectingIdentifier) {
            if (character === SALT.operators.assignmentOperator) {
                SALT.tokens.push({ type: "Identifier", name: "Identifier", value: string });
                SALT.tokens.push({ type: "Operator", name: "AssignmentOperator", value: SALT.operators.assignmentOperator });
                string = "";

                isExpectingStringOrIdentifier = true;
            }
        }

        if (isExpectingActionOperator) {
            string += character;

            if (string === SALT.operators.actionOperator) {
                SALT.tokens.push({ type: "Operator", name: "ActionOperator", value: SALT.operators.actionOperator });
                string = "";
                isExpectingActionOperator = false;
                isExpectingStringOrIdentifier = true;
                isExpectingStatementOrScope = true;
            }
        }
        else {
            if (isExpectingStatementOrScope) {
                if (character === SALT.symbols.EOS) {
                    //SALT.tokens.push({ type: "Value", name: "StringValue", value: string });
                    SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
                    SALT.tokens.push({ type: "Symbol", name: "EndOfStatementSymbol", value: SALT.symbols.EOS });

                    string = "";
                    isInsideString = false;
                    isExpectingOutStatementOrIdentifierOrAction = true;
                }
                else {
                    string += character;
                }

                if (character === SALT.symbols.openingBrace) {
                    SALT.tokens.push({ type: "Symbol", name: "OpeningBraceSymbol", value: SALT.symbols.openingBrace });
                    string = "";
                    isInsideScope = true;
                    isExpectingIdentifier = true;
                }
                else if (character === SALT.symbols.closingBrace) {
                    SALT.tokens.push({ type: "Symbol", name: "ClosingBraceSymbol", value: SALT.symbols.closingBrace });
                    string = "";
                    isInsideScope = false;
                }

                if (isInsideScope) {
                    switch (string) {
                        case SALT.operators.out:
                            SALT.tokens.push({ type: "Operator", name: "OutOperator", value: SALT.operators.out });
                            string = "";
                            break;
                        case SALT.keywords.with:
                            SALT.tokens.push({ type: "Keyword", name: "WithKeyword", value: SALT.keywords.with });
                            isExpectingOutStatementOrIdentifierOrAction = true;
                            string = "";
                            break;
                        case SALT.operators.return:
                            SALT.tokens.push({ type: "Operator", name: "ReturnOperator", value: SALT.operators.return });
                            string = "";
                            isExpectingExpressionOrAction = true;
                            break;
                        default:
                            break;
                    }

                    if (isExpectingConcatenationOperatorOrEndOfStatement) {
                        if (character === SALT.symbols.doubleQuote) {
                            SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
                            string = "";
                            isInsideString = true;

                        }
                        else if (character === SALT.operators.concatenationOperator) {
                            SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
                            SALT.tokens.push({ type: "Operator", name: "ConcatenationOperator", value: SALT.operators.concatenationOperator });
                            string = "";
                            isInsideString = false;
                            isExpectingStringOrIdentifier = true;
                            isExpectingConcatenationOperatorOrEndOfStatement = false;
                        }
                        else {
                            /*string += character;*/
                        }
                    }

                    if (isExpectingOutStatementOrIdentifierOrAction) {
                        if (SALT.Helpers.isSymbol(character)) {
                            if (character === SALT.symbols.doubleQuote) {
                                if (!isExpectingConcatenationOperatorOrEndOfStatement) {
                                    SALT.tokens.push({ type: "Symbol", name: "DoubleQuoteSymbol", value: SALT.symbols.doubleQuote });
                                    isInsideString = true;
                                    string = "";
                                }
                                else {
                                    string += character;
                                }
                            }
                            else {
                                // Not sure what to do here, right now.
                                /*string += character;*/
                            }
                        }
                        else {
                            /*string += character;*/
                            console.log(string);
                        }
                    }
                }
                else {
                    switch (string) {
                        case SALT.operators.out:
                            SALT.tokens.push({ type: "Operator", name: "OutOperator", value: SALT.operators.out });
                            string = "";
                            break;
                        case SALT.keywords.with:
                            SALT.tokens.push({ type: "Keyword", name: "WithKeyword", value: SALT.keywords.with });
                            isExpectingOutStatementOrIdentifierOrAction = true;
                            string = "";
                            break;
                        case SALT.operators.return:
                            SALT.tokens.push({ type: "Operator", name: "ReturnOperator", value: SALT.operators.return });
                            string = "";
                            isExpectingExpressionOrAction = true;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
}

console.log(SALT.tokens);