var SALT = {
    input: '-> { firstName: "Jason"; out with firstName + 35 % 5; }',
    tokens: []
};

// Operators.
SALT.operators = {
    additionOperator: "+",
    minus: "-",
    return: "return",
    actionOperator: "->",
    out: "out",
    concatenationOperator: "+",
    assignmentOperator: ":",
    multiplicationOperator: "*",
    subtractionOperator: "-",
    divisionOperator: "/",
    modulusOperator: "%"
};

// Symbols.
SALT.symbols = {
    openingParenthesis: "(",
    closingParenthesis: ")",
    openingBracket: "[",
    closingBracket: "]",
    openingBrace: "{",
    closingBrace: "}",
    openingAngleBracket: "<",
    closingAngleBracket: ">",
    hyphen: "-",
    EOS: ";",
    whiteSpace: " ",
    doubleQuote: "\"",
    backSlash: "\\",
    returnCarriage: "\r",
    newLineCharacter: "\n",
    comma: ","
};

// Reserved Keywords.
SALT.keywords = {
    with: "with",
    as: "as",
    was: "was",
    is: "is",
    has: "has"
};

SALT.variables = [
    name = "",
    value = ""
];

SALT.Helpers = {
    
};

// Functions.
SALT.Helpers.isLetter = function(input) {
    return input.match(/[a-z]/i);
}

SALT.Helpers.isWord = function(input) {
    return input.match(/[a-z]/i) && input.length >= 1;
}

SALT.Helpers.isSymbol = function(input) {
    return input.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\s+\r\n]/);
}

SALT.Helpers.isDigit = function(input) {
    return input.match(/[0-9]/);
}

SALT.Helpers.isNumber = function(input) {
    return Number.isInteger(input);
}

SALT.Helpers.isReservedKeywordOrOperator = function(input) {
    return Object.values(SALT.keywords).includes(input) || Object.values(SALT.operators).includes(input);
}
