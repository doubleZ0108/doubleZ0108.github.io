const dbltouch_interval = 800;        //双击的判定间隔
const tolerateVerticalOffset = 20;    // 最大容忍的上下移动距离（希望用户左右滑动）

/**
 * todo监听绑定
 * @param {待绑定的todo dom elem} elem 
 * @param {改todo在model中数据的编号} index 
 */
function initTodo(elem, index) {
    let touchStartTimer, touchEndTimer;

    /* 绑定样式 */
    // 用以解决safari不响应hover
    elem.addEventListener("touchstart", function () {
        setStyle(this.firstElementChild, {
            transform: "rotateX(86deg)",
        });
        setStyle(this.firstElementChild.nextElementSibling.firstElementChild, {
            transform: "rotateX(var(--rotate-deg)) translate3d(0, 0, 0)"
        });
        setStyle(this.lastElementChild.firstElementChild, {
            transform: "rotateX(var(--rotate-deg)) translate3d(0, 0, 0)"
        });
    });
    elem.addEventListener("touchend", function () {
        setStyle(this.firstElementChild, {
            transform: "none",
        });
        setStyle(this.firstElementChild.nextElementSibling.firstElementChild, {
            transform: "none"
        });
        setStyle(this.lastElementChild.firstElementChild, {
            transform: "none"
        });
    });

    /**
     * 模拟手机端double touch 和 long touch 事件
     * double touch => 编辑单条todo
     * long touch => 完成单条todo
     **/
    var click_counter = 0;
    elem.addEventListener("touchstart", function () {
        touchStartTimer = new Date();
        click_counter++;
        setTimeout(function () {
            click_counter = 0;
        }, dbltouch_interval);
        if (click_counter > 1) {
            console.log("simulate double touch on mobile...");

            click_counter = 0;

            if (!model.data.todos[index].completed) {
                // 调用手机震动（无效果）
                if (navigator.vibrate) {
                    navigator.vibrate(1000);
                } else if (navigator.webkitVibrate) {
                    navigator.webkitVibrate(1000);
                }
                
                /* 编辑单条todo: 将文字节点换成input节点 */
                let todoContent = elem.lastElementChild.firstElementChild;
                let todoText = todoContent.firstElementChild;
                let currentText = todoText.innerHTML;
                let currentRotation = todoText.style.transform;
                todoText.style.display = "none";

                let todoEdit = $c('input');
                todoEdit.setAttribute("type", "text");
                todoEdit.value = currentText;
                todoEdit.classList.add("editing");
                todoEdit.style.transform = currentRotation;
                todoEdit.focus();

                /* 绑定失去焦点事件 */
                todoEdit.addEventListener("blur", function () {
                    if (todoEdit.value !== "") {
                        todoText.innerHTML = todoEdit.value;
                        model.data.todos[index].content = todoEdit.value;
                        model.flush();
                        update();
                    } else {
                        alert("Todo cannot be empty😇");
                    }
                    todoContent.removeChild(todoEdit);
                    todoText.style.display = "";
                }, false);

                todoEdit.addEventListener("keyup", function (event) {
                    if (event.keyCode != 13) {
                        return;
                    }
                    todoEdit.blur();    // 如果blur和keyup同时绑定一个自定义finish，则finish会被调用两遍导致错误
                }, false);

                todoContent.appendChild(todoEdit);
            }

        }
    });
    elem.addEventListener("touchend", function () {
        touchEndTimer = new Date();
        let deltaTime = touchEndTimer.getTime() - touchStartTimer.getTime();
        if (deltaTime > 500) {
            //TODO complete this todo
            model.data.todos[index].completed = !model.data.todos[index].completed;
            model.flush();
            update();
        }
    });


    /**
     * 模拟手机端滑动事件
     * swipe left/right => 删除单条todo
     */
    let oldTouch, touchObj;
    let isDelete = false;
    elem.addEventListener('touchstart', function (event) {
        oldTouch = event.touches[0];
        touchObj = event.currentTarget;
        isDelete = false;
    }, false);
    elem.addEventListener('touchmove', function (event) {
        let freshTouch = event.touches[0];
        let verticalOffset = freshTouch.clientY - oldTouch.clientY;

        if (Math.abs(verticalOffset) < tolerateVerticalOffset) {    // 上下滑动容忍之内视作成功
            var horizontalOffset = freshTouch.clientX - oldTouch.clientX;
            touchObj.style.transition = ".2s linear";

            if (Math.abs(horizontalOffset) < deviceWidth / 3) {     //移动距离过短 不判定为删除
                touchObj.style.left = horizontalOffset + 'px';
            } else {
                if (horizontalOffset < 0) {     // 左滑
                    touchObj.style.left = -deviceWidth * 2 + 'px';
                } else {                        // 右滑
                    touchObj.style.left = deviceWidth * 2 + 'px';
                }
                isDelete = true;
            }
        }
    }, false);
    elem.addEventListener('touchend', function (event) {
        /* 在DOM中和Model中删除该todo */
        if (isDelete && elem != null) {
            elem.parentNode.removeChild(elem);
            model.data.todos.splice(index, 1);

            model.flush();
            update();
        } else {
            touchObj.style.left = 0;
        }
    }, false);
}

/**
 * 添加一条新的todo
 **/
function addTodo(){
    let todoInput = $('todo-input')
    let inputText = todoInput.value;
    if(inputText != ""){
        todoInput.value = "";       // 清空输入框

        /* 在Model中添加一条todo */
        model.data.todos.push({
            content: inputText,
            time: new Date(),
            completed: false
        });

        model.flush();
        update();
    } else {
        alert("Todo cannot be empty😇");
    }
}