const longtouch_interval = 500;     //长按的判定间隔

/**
 * 浮动球样式及监听绑定
 **/
function initBtnGroup(){
    let btnGroup = $('btn-group');

    let oldTouch;
    let touchStartTimer, touchEndTimer;
    btnGroupTouchHandler = {
        start: function(event){
            touchStartTimer = new Date();
            event.preventDefault();
            $('ButtonGroup-click').checked = !$('ButtonGroup-click').checked;
            oldTouch = event.touches[0];
        },
        move: function(event){
            event.preventDefault();
            touchStartTimer = new Date();
            $('ButtonGroup-click').checked = false;

            let freshTouch = event.touches[0];

            let deltaRight = oldTouch.clientX - freshTouch.clientX;
            let deltaBottom = oldTouch.clientY - freshTouch.clientY;
            let right = parseFloat(btnGroup.style.right || 0) + deltaRight;
            let bottom = parseFloat(btnGroup.style.bottom || 0) + deltaBottom;

            /* 跟随手指移动浮动球 */
            if(right < deviceWidth - 60 && right > 0        // 边界检测
                && bottom < deviceHeight - 300 && bottom > 0){
                setStyle(btnGroup, {
                    right: right + "px",
                    bottom: bottom + "px"
                });
            }

            /* 浮动球移动到左边进行反转 */
            if(right > (deviceWidth - 60) / 2){
                setStyle(btnGroup, {
                    transform: "translateY(-30px) rotateY(180deg)"      // 先将整体翻转180
                });
                Array.from($all('.ButtonGroup a i')).forEach(function(elem){
                    elem.style.transform = "rotateY(180deg)";           // 再将每个元素翻转180
                });
            } else {
                btnGroup.style.transform = "translateY(-30px)";
                Array.from($all('.ButtonGroup a i')).forEach(function(elem){
                    elem.style.transform = "none";
                });
            }
            
            oldTouch = freshTouch;
        },
        end: function(event){
            event.preventDefault();
            touchEndTimer = new Date();
            let deltaTime = touchEndTimer.getTime() - touchStartTimer.getTime();

            /* 长按判定 */
            if(deltaTime > longtouch_interval){
                // 调用手机震动（无效果）
                if (navigator.vibrate) {
                    navigator.vibrate(1000);
                } else if (navigator.webkitVibrate) {
                    navigator.webkitVibrate(1000);
                }

                showPopUp();
            }
        },
        cancel: function(event){
            event.preventDefault();
            $('ButtonGroup-click').checked = false;
        }
    };

    btnGroup.addEventListener("touchstart", btnGroupTouchHandler.start);
    btnGroup.addEventListener("touchmove", btnGroupTouchHandler.move);
    btnGroup.addEventListener("touchend", btnGroupTouchHandler.end);
    btnGroup.addEventListener("touchcancel", btnGroupTouchHandler.cancel);
}

/**
 * 过滤器监听绑定
 **/
function initFilter(){
    Array.from($all(".filters a")).forEach(function(filter, index){
        filter.addEventListener("touchstart", function(){
            switch(index){
                case 0:
                    model.data.filter = "All";
                    break;
                case 1:
                    model.data.filter = "Active";
                    break;
                case 2:
                    model.data.filter = "Completed";
                    break;
                default:
                    model.data.filter = "All"
            }
            update();
        });
    });
}

/**
 * 功能按钮监听绑定
 **/
function initTool(){
    let tools = $('tools');
    let finishAll = tools.firstElementChild.firstElementChild;
    let deleteCompleted = tools.lastElementChild.firstElementChild;

    /* 全部(未)完成事件绑定 */
    finishAll.addEventListener("click", function(){
       if(this.innerHTML === "全部完成"){
           this.innerHTML = "全部未完成";
           model.data.todos.forEach(todo => {
                todo.completed = true;
           });
       } else {
            this.innerHTML = "全部完成";
            model.data.todos.forEach(todo => {
                todo.completed = false;
           });
       }
       model.flush();
       update();
    });

    /* 删除全部事件绑定 */
    deleteCompleted.addEventListener("click", function(){
        model.data.todos.forEach((todo, index) => {
            if(todo.completed){
                model.data.todos.splice(index, 1);
            }
        });
        if(model.data.todos.length!=0 && model.data.todos[0].completed){
            model.data.todos.splice(0,1);   // 额外处理删除所有时bug
        }
        model.flush();
        update();
    });
}