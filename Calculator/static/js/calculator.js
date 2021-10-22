let result = null;
let _current = 0;

window.onload = function(){
    result = $('result');
    $('ac').onclick = function(){
        clear();
    };

    $('equal').onclick = function(){
        calculate();
    };

    document.querySelectorAll("button:not(#ac):not(#equal)").forEach(function(elem, index){
        elem.onclick = function(){
            appendChar(elem.innerHTML);
        };
    });
};

function clear(){
    result.innerHTML = '0';
    result.style.fontSize = 48 + 'px';
}

/**
 * Button callback
 * @param {clicked char} ch: text from the button clicked
 */
function appendChar(ch){
    let str = result.innerHTML.trim();
    
    if(str.length > 9 && str.length <= 15){
        result.style.fontSize = 30 + 'px';
    }
    else if(str.length > 15 && str.length <= 24){
        result.style.fontSize = 20 + 'px';
    }
    else if (str.length > 24){
        alert("计算器最大输入位数为24");
        return;
    }

    if(parseInt(str) === 0){
        result.innerHTML = "";
    }
    result.innerHTML += ch;
}

/**
 * Main Calculation function
 */
function calculate(){
    let exp = result.innerHTML.trim();
    console.log(exp);

    let postfix_exp = toPostfix(exp);
    console.log(postfix_exp);

    let cal_result = calulatePostfixExpression(postfix_exp);
    console.log(cal_result);
    if(cal_result === undefined) {
        result.innerHTML = "ERROR"
    } else {
        result.innerHTML = cal_result;
    }
}

/**
 * Get next element(number or operator) from the expression
 * @param {input expression} exp 
 */
function getNextContent(exp){
    if(isOperator(exp[_current])) {
        _current++;
        return ({
            type: "operator",
            value: exp[_current-1]
        });
    } else {
        let num_str = "";
        for(let i=_current; i<exp.length; i++) {
            if(!isOperator(exp[i])) {
                num_str += exp[i];
                _current++;
            } else {
                break;
            }
        }
        return ({
            type: "number",
            value: parseInt(num_str)
        });
    }
}

function isp(ch) {
    switch (ch) {
        case '#':
            return 0;
        case '(':
            return 1;
        case '*': case '/':
            return 5;
        case "+": case "-":
            return 3;
        case ')': 
            return 6;
        default:
            return "ERROR"
    }
}

function icp(ch) {
    switch (ch) {
        case "#":
            return 0;
        case "(":
            return 6;
        case "*": case "/":
            return 4;
        case "+": case "-":
            return 2;
        case ")":
            return 1;
    }
}

/**
 * Change the expression to postfix format
 * @param {input expression} exp 
 */
function toPostfix(exp){
    let op_stack = [];
    _current = 0;

    exp += "#";
    op_stack.push("#");

    let postfix_exp = [];

    let elem = getNextContent(exp);
    while(op_stack.length !== 0) {
        let ch = elem.value
        if(elem.type === "number") {
            postfix_exp.push(elem);
            elem = getNextContent(exp);
        } else if(elem.type === "operator"){
            let topch = op_stack[op_stack.length-1];
            if(isp(topch) < icp(ch)) {
                op_stack.push(ch);
                elem = getNextContent(exp);
            } else if (isp(topch) > icp(ch)) {
                postfix_exp.push({
                    type: "operator",
                    value: op_stack.pop()
                });
            } else {
                if(op_stack[op_stack.length-1] === '(') {
                    elem = getNextContent(exp);
                }
                op_stack.pop();
            }
        }
    }

    return postfix_exp;
}

/**
 * Calculate the postfix expression
 * @param {postfix expression} postfix_exp 
 */
function calulatePostfixExpression(postfix_exp){
    let num_stack = [];
    postfix_exp.forEach(function(elem){
        if(elem.type === "number"){
            num_stack.push(elem.value);
        } else {
            let right = num_stack.pop();
            let left = num_stack.pop();
            if(isNaN(parseInt(right)) || isNaN(parseInt(left))){
                return "ERROR";
            }

            let buf = null;
            try {
                buf = parseInt(eval(left + elem.value + right));
            } catch (e) {
                return "ERROR";
            } finally {
                num_stack.push(buf);
            }
        }
    });
    return num_stack.pop();
}