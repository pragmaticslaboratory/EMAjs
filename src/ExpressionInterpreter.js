
function expressionInterpreter(expression, contextObj) {
    let result;

    try {
        // Dynamically create a new function using the keys of contextObj as parameters
        // and the provided expression as the function body. This function, when called,
        // will evaluate the expression in the context of the values provided in contextObj.
        // For example, if contextObj = { x: 1, y: 2 } and expression = "x + y",
        // this creates a function equivalent to: function(x, y) { return x + y; }
        const func = new Function(...Object.keys(contextObj), `return ${expression};`);

        // Execute the dynamically created function, passing in the values from contextObj.
        // This effectively evaluates the expression using the values from contextObj.
        // Continuing the previous example, this is akin to calling func(1, 2), which returns 3.
        result = func(...Object.values(contextObj));
    } catch (error) {
        if (error instanceof ReferenceError) {
            return false; //return false when it is not possible to evaluate
        } else {
            throw error; //other error
        }
    }
    return result;
}


module.exports = expressionInterpreter;