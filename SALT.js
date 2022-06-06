var SALT = {
    input: 'out with firstName + lastName;',
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
    equalityOperator: "="
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
    comma: ",",
    plus: "+"
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

SALT.errors = [
    error = {
        type: "",
        message: "",
        line: "",
        position: ""
    }
]

SALT.variables = [
    variable = {
        name: "",
        type: "",
        value: ""
    }
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

SALT.Helpers.isReservedKeywordOrOperator = function(input) {
    return Object.values(SALT.keywords).includes(input) || Object.values(SALT.operators).includes(input);
}
