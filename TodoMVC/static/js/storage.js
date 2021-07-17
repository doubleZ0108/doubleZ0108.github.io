/**
 * LocalStorage进行数据持久化
 **/
(function(){
    if(!window.localStorage){
        alert("您的浏览器不支持Local Storage");
        return false;
    } else {
        let key = "todos";
        Object.assign(model, {
            /**
             * 读取LocalStorage进行初始化
             **/
            init: function(callback){
                let data = window.localStorage.getItem(key);
                if(data){ 
                    model.data = JSON.parse(data);
                }
                if(callback) { callback(); }
            },
            /**
             * 写入LocalStorage进行持久化
             **/
            flush: function(callback){
                window.localStorage.setItem(key, JSON.stringify(model.data));
                if(callback) { callback(); }
            }
        });
    }
})();