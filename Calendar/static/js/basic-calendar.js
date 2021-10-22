window.onload = function(){
    
    initBasicStructure();

    initLogic();
}


function initBasicStructure() {
    let weeks = document.getElementById("weeks");
    let weekList = ["Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat.", "Sun."];
    weekList.forEach(function(weekName){
        let weekDiv = document.createElement("div");
        weekDiv.classList.add("week");
        weekDiv.style.gridArea = weekName;
        weekDiv.innerHTML = weekName;
        weeks.appendChild(weekDiv);
    });

    let days = document.getElementById("days");
    for(let i = 1; i <= 42; ++i){
        let dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.id = "day" + i;
        dayDiv.style.gridArea = "day-" + i;

        dayDiv.innerHTML = i.toString();

        days.appendChild(dayDiv);
    }
}
