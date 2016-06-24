/**
 * Created by zk on 6/1/16.
 */


var calenderShowDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
var lastChosedDate = null;
changeCalender(0);

function changeCalender(delta) {
    storeNote();
    calenderShowDate = new Date(calenderShowDate.getFullYear(), calenderShowDate.getMonth() + delta, 1);
    renderCalender(calenderShowDate.getFullYear(), calenderShowDate.getMonth());
}

function storeNote(newDate) {
    var calenderData = JSON.parse(localStorage.getItem("calender")) || new Object({note: new Object({})});
    if (lastChosedDate) {
        var oldNote = window.document.getElementById("calenderNote").value;
        calenderData.note[lastChosedDate] = oldNote;
    }
    if (newDate) {
        lastChosedDate = newDate;
    }
    localStorage.setItem('calender', JSON.stringify(calenderData));

    return calenderData.note[lastChosedDate];
}

function changeNode(td) {
    var calenderData = JSON.parse(localStorage.getItem("calender")) || new Object({note: new Object({})});
    if (lastChosedDate) {
        document.getElementById(lastChosedDate).removeAttribute("style");
    }

    td.setAttribute("style", "background-color:red");
    document.getElementById("calenderNote").value = (storeNote(td.getAttribute("id")) || "");

}

function renderCalender(year, month) {
    document.getElementById("title").innerHTML = year + " " + (month + 1);

    var firstDayOfWeek = new Date(year, month, 1).getDay();
    var daysOfMonth = new Date(year, month + 1, 0).getDate();
    var daysOfLastMonth = new Date(year, month, 0).getDate();

    var calenderHtml = "";
    var index = 0;
    var i;

    function addDayForCalender(date, currentMonth) {
        if (index % 7 === 0) {
            calenderHtml += "<tr class='calender tr'>";
        }
        var currentDate = new Date();
        if (date.getTime() === new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).getTime()) {
            calenderHtml += "<td onclick='changeNode(this)' id='" + date.getTime() + "' class='calender td today'>" + date.getDate() + "</td>";
        } else if (currentMonth) {
            calenderHtml += "<td onclick='changeNode(this)' id='" + date.getTime() + "' class='calender td'>" + date.getDate() + "</td>";
        } else {
            calenderHtml += "<td onclick='changeNode(this)' id='" + date.getTime() + "' class='calender td disable'>" + date.getDate() + "</td>";
        }

        if (index % 7 === 6) {
            calenderHtml += "</tr>";
        }
        index++;
    }

    for (i = firstDayOfWeek - 1; i >= 0; i--) {
        addDayForCalender(new Date(year, month - 1, daysOfLastMonth - i), false);
    }
    for (i = 1; i <= daysOfMonth; i++) {
        addDayForCalender(new Date(year, month, i), true);
    }
    document.getElementById("calenderTable").innerHTML = calenderHtml;


    window.document.getElementById("calenderNote").value = "";
    lastChosedDate = null;
}


