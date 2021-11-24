
function expressionInterpreter(expression, contextObj) {
    let result;

    try {
        with (contextObj) {
            result = eval(expression);
        }
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