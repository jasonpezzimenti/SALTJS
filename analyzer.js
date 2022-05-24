var identifier,
    position,
    previous,
    next,
    current,
    character,
    identifierFound = false;

var errors = [
    error = {
        message: ""
    },
    type = "",
    line = "",
    position = "",
];

var variables = [
    variable = {
        type: "",
        name: "",
        value: ""
    }
];

for(var index = 0; index < SALT.tokens.length; index++) {
    position = index;
    current = SALT.tokens[position];
}