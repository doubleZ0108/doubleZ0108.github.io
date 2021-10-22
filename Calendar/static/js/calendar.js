var nowDay = new Date();
var thisYear = nowDay.getFullYear(); 
var thisMonth = nowDay.getMonth() + 1; 
var today = nowDay.getDate();

var dayNum = today.toString(); //用于变更操作
var changeYear = thisYear;
var changeMonth = thisMonth;
var changeDay = dayNum;

function initLogic(isAwesome=false){
    var now = document.getElementById('current-year-month');
    var month_left = document.getElementById('month-left');
    var month_right = document.getElementById('month-right');
    var year_left = document.getElementById('year-left');
    var year_right = document.getElementById('year-right');
    var days = document.getElementById("days");

    var monthLetter = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    

    /**
     * 刷新页面
     */
    function refresh() {
        if(isAwesome == true){
            for(var i = 1; i <= 42; ++i) {
                document.getElementById("day" + i).style.disabled = "none";
                document.getElementById("day" + i).style.opacity = "1";
                document.getElementById("day-text-" + i).innerHTML = " ";
                document.getElementById("day-bgcolor-" + i).style.background = "linear-gradient(135deg,#5EFCE8,#736EFE)";
            }
            return;
        }

        document.querySelectorAll(".day").forEach(function(elem){
            elem.style.disabled = "none";
            elem.style.opacity = "1";
            elem.innerHTML = " ";
            elem.style = "backgroud: #eeeeee";
        });

        // document.getElementById("week-bg");
    }

    /**
     * 显示某年某月的信息
     */
    function printDays(year, month) {
        refresh();
        var nowMonthStartDay = new Date(year, month - 1, 1).getDay();   //当前月第一天是周几
        if(nowMonthStartDay == 0) {
            nowMonthStartDay = 7;
        }
        var numberOfDaysInMonth = new Date(year, month, 0).getDate();   //当前月有多少天
        now.innerHTML = " ";
        now.innerHTML = monthLetter[month - 1] + '<br />' + year;        //改变title的内容
        for(var i = 1, j = nowMonthStartDay; i <= numberOfDaysInMonth; i++, j++) {  //判断变色的日期
            // for basic calendar
            var DayText = document.getElementById("day" + j);
            var DayBgColor = DayText;

            // for awesome calendar
            if(isAwesome){
                DayText = document.getElementById("day-text-" + j);
                DayBgColor = document.getElementById("day-bgcolor-" + j);
            }

            DayText.innerHTML = "" + i;
            if(year == thisYear && month == thisMonth && i.toString() == dayNum) {   //当前日期一直是绿色
                DayBgColor.style = "background:#E96D71";
            }
            if(i.toString() == changeDay) {     //选中的符合要求的日期显示绿色
                DayBgColor.style = "background:#1abc9c";
                let freshDay = new Date(changeYear, changeMonth-1, changeDay);
                let weekNum = (freshDay.getDay() + 7 - 1) % 7;

                if(isAwesome){
                    if(weekNum === 6) {
                        document.getElementById("week-bg").style.left = "calc(calc(calc(var(--button-width) + var(--week-padding))*" + weekNum + ") - calc(var(--week-padding)*0.5))";
                    } else {
                        document.getElementById("week-bg").style.left = "calc(calc(var(--button-width) + var(--week-padding))*" + weekNum + ")";
                    }
                }
            }
        }

        // 仅用不属于这个月的信息
        for(let i = 1; i <= 42; ++i) {
            let text = null;
            if(isAwesome){
                text = document.getElementById("day-text-" + i).innerHTML;
            } else {
                text = document.getElementById("day" + i).innerHTML;
            }

            if(isNaN(parseInt(text))) {
                var Day = document.getElementById("day" + i);
                Day.disabled = "disabled";
                Day.style.opacity = "0";
            }
        }
    }

    printDays(thisYear, thisMonth);

    month_left.onclick = function() {
        if(changeMonth == 1) {
            changeYear--;
            changeMonth = 12;
        } else {
            changeMonth--;
        }
        changeDay = 0; //翻页的时候将选中的日期清空
        printDays(changeYear, changeMonth); //打印下一个月的日期
    }
    month_right.onclick = function() {
        if(changeMonth == 12) {
            changeYear++;
            changeMonth = 1;
        } else {
            changeMonth++;
        }
        changeDay = 0;
        printDays(changeYear, changeMonth);
    }

    year_left.onclick = function(){
        changeYear--;
        changeDay = 0;
        printDays(changeYear, changeMonth);
    }
    year_right.onclick = function(){
        changeYear++;
        changeDay = 0;
        printDays(changeYear, changeMonth);
    }

    days.onclick = function(e) {
        var clickDay = null;

        if(isAwesome) {
            clickDay = e.target.firstElementChild.firstElementChild.innerHTML;
        } else {
            clickDay = e.target.innerHTML;
        }
        
        changeDay = clickDay;
        printDays(changeYear, changeMonth);
    }
}