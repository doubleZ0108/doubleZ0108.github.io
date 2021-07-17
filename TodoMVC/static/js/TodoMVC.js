window.onload = function(){
    /* 固定屏幕尺寸（手机safari infobar尺寸不固定） */
    $('bg').style.height = deviceHeight + "px";

    /* 禁用右键菜单 */
    document.oncontextmenu = function(){
        event.returnValue = false;
    }

    model.init(function(){
        initModel();
    });

    initBtnGroup();

    initPopUp();

    initFilter();

    initTool();
};
