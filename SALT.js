var SALT = {
    input: 'test = "\\n \\\\ \\"blub"; if(1 < 2) { -> out if with as a a1 1 * -2 a} "Hello."; }',
    tokens: [
    	token = {
    		type: "",
    		name: "",
    		value: ""
    	}
    ]
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
    modulusOperator: "%",
    lessThanOperator: "<",
    greaterThanOperator: ">",
    logicalANDOperator: "&&",
    equationOperator: "="
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
    has: "has",
    else: "else",
    if: "if"
};

SALT.variables = [
    name = "",
    value = ""
];

SALT.Helpers = {
    
};

// Functions.
SALT.Helpers.isLetter = function(input) {
    //return ((input >= 'a' && input <= 'z')
    // || (input >= 'A' && input <= 'Z'));
    return input.match(/[a-z]/i);
}

SALT.Helpers.isWord = function(input) {
    return input.match(/^[a-zA-Z]+$/);
}

SALT.Helpers.isSymbol = function(input) {
    // Use the SALT.symbols list
    return Object.values(SALT.symbols).includes(input);
}

SALT.Helpers.isDigit = function(input) {
    //return input >= '0' && input <= '9'
    return input.match(/[0-9]/);
}

SALT.Helpers.isNumber = function(input) {
    return Number.isInteger(input);
}

SALT.Helpers.isOperator = function(input) {
    return Object.values(SALT.operators).includes(input);
}

SALT.Helpers.isReservedKeyword = function(input) {
    return Object.values(SALT.keywords).includes(input);
}
