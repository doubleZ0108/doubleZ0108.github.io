/**
 * 弹出自定义输入框监听绑定
 **/
function initPopUp(){
    Array.from($all(".rubber-band")).forEach(function(btn, index){
        /* 监听确认按钮 */
        btn.addEventListener("click", function(){
            /* 绑定动画 */
            this.style.animation = "rubberBandAnimation 1s"; 
            setTimeout(function () {
                btn.style.animation = "none";
            }, 1000);

            if(index === 1){
                addTodo();
            }
            hidePopUp();
        }, false);
    });

    /* 监听键盘 */
    $('todo-input').addEventListener('keyup', function(){
        if (event.keyCode != 13){
            return;
        }
        addTodo();
        hidePopUp();
    }, false);

    hidePopUp();
}

/**
 * 显示弹出框
 **/
function showPopUp(){
    setStyle($("popup-box"), {
        opacity: "1",
        zIndex: "999",
    });
    
    // 由于事件冒泡 会一直传播
    $('todo-input').disabled = false;
    Array.from($all('.InputBtnGroup .rubber-band')).forEach(elem => {
        elem.disabled = false;
    });

    $('todo-input').focus();
}

/**
 * 隐藏弹出框
 **/
function hidePopUp(){
    setStyle($("popup-box"), {
        opacity: "0",
        zIndex: "-100",
    });

    // 由于事件冒泡 会一直传播
    $('todo-input').disabled = true;
    Array.from($all('.InputBtnGroup .rubber-band')).forEach(elem => {
        elem.disabled = true;
    });
}