var deviceHeight = window.innerHeight;      // 屏幕高度
var deviceWidth = window.innerWidth;        // 屏幕宽度

/**
 * 通过id快速访问节点
 * @param {element id} id 
 */
function $(id){
    return document.getElementById(id);
}

/**
 * 通过类型快速创建节点
 * @param {节点类型} type 
 */
function $c(type){
    return document.createElement(type);
}

/**
 * 通过css选择器快速访问一组对象
 *    注意返回值为NodeList
 * @param {css选择器} css_selector 
 */
function $all(css_selector){
    return document.querySelectorAll(css_selector);
}

/**
 * 快速设置节点样式
 * @param {节点对象} obj 
 * @param {一组css对象} css 
 */
function setStyle(obj, css){
    for(let atr in css){
        obj.style[atr] = css[atr];
    }
}