function $(id){
    return document.getElementById(id);
}

function isOperator(ch) {
    return (['(',')','/','*','-','+','#'].indexOf(ch) != -1);
}