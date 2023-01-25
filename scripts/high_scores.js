var highScores = [{ "date": "2021/01/17", "duration": "3:41" }, { "date": "2021/01/21", "duration": "4:01" }, { "date": "2021/02/01", "duration": "2:52" }, { "date": "2021/02/17", "duration": "3:08" }, { "date": "2021/03/02", "duration": "2:51" }];

// Create a table element
var table = document.createElement("table");

// Create a header row
var headerRow = document.createElement("tr");
var dateHeader = document.createElement("th");
dateHeader.innerHTML = "Date";
headerRow.appendChild(dateHeader);
var durationHeader = document.createElement("th");
durationHeader.innerHTML = "Duration";


headerRow.appendChild(durationHeader);
table.appendChild(headerRow);
var line = document.createElement("hr");
line.innerHTML = "";
line.classList.add("break");
table.appendChild(line);


// Add data rows
for (var i = 0; i < highScores.length; i++) {
    var dataRow = document.createElement("tr");
    var dateCell = document.createElement("td");
    dateCell.innerHTML = highScores[i].date + "&nbsp;&nbsp;";
    dataRow.appendChild(dateCell);


    var durationCell = document.createElement("td");
    durationCell.innerHTML = highScores[i].duration;
    dataRow.appendChild(durationCell);
    table.appendChild(dataRow);

    var space = document.createElement("tr");
    space.innerHTML = "<br>";
    table.appendChild(space);
}

// Add the table to the document
console.log(table);
document.getElementById("highScore").appendChild(table);