let weekList = ["Mon.", "Tues.", "Wed.", "Thur.", "Fri.", "Sat.", "Sun."];

window.onload = function() {
    initAwesomeStructure();
    initLogic(true);
};

function initAwesomeStructure() {

    let weeks = document.getElementById("weeks");
    weekList.forEach(function(weekName){
        let weekDiv = document.createElement("div");
        weekDiv.classList.add("week");
        weekDiv.id = weekName;
        weekDiv.style.gridArea = weekName;
        weekDiv.innerHTML = weekName;
        weeks.appendChild(weekDiv);
    });
    let bgDiv = document.createElement("div");
    bgDiv.classList.add("bg");
    bgDiv.id = "week-bg";
    weeks.appendChild(bgDiv);


    let days = document.getElementById('days');
    days.innerHTML = "";

    var min = -5;
    var max = 5;

    for(let i = 1; i <= 42; ++i) {
        var randRotation = parseFloat(Math.random()*(min - max + 1) + max);
        days.innerHTML += [
            '<div class="day-group" id="day' + i + '">\n' +
            '    <div class="day-outside">\n' +
            '        <div class="day-shadow"></div>\n' +
            '        <div class="day-paper"" style="grid-area: day-' + i + '; transform: rotate(' + randRotation + 'deg);">\n' +
            '            <div class="day-paper-bg" id="day-bgcolor-' + i + '">\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <div class="cover-content-container">\n' +
            '            <div class="cover-content">\n' +
            '                <h1 id="day-text-' + i + '" style="transform: rotate(' + randRotation + 'deg);">' + i + '</h1>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="day-inside">\n' +
            '        <div>Text1</div>\n' +
            '        <div>Text2</div>\n' +
            '    </div>\n' +
            '</div>'
        ].join("");
    }
}

