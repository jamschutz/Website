const TABLE_ID = "videogames-table";
const TABLE_HEADER_ID = "videogames-table-header";
const TABLE_BODY_ID = "videogames-table-body";
const databaseFilePath = "../videogames-database/VideogamesDatabase.csv";

const IGNORE_ID_COLUMN = true;


function populateTable(csv) {
    let games = csv.split("\n");
    let header = games[0];

    console.log('num games: ' + games.length);

    createTableRow(header, true);
    for(let i = 1; i < games.length; i++) {
        createTableRow(games[i]);
    }
}


function createTableRow(data, isHeader) {
    data = data.split(",");

    // default to getting the body
    let table = document.getElementById(TABLE_BODY_ID);
    // but if header, get that instead
    if(isHeader) table = document.getElementById(TABLE_HEADER_ID);

    var row = document.createElement("tr");
    // skip the first column, because it's the ID column
    for(let i = 1; i < data.length; i++) {
        var col = document.createElement("td");
        let text = getMultipleEntriesFormatted(data[i]);
        var textNode = document.createTextNode(text);

        col.appendChild(textNode);
        row.appendChild(col);
    }
    table.appendChild(row);
}



function getMultipleEntriesFormatted(data) {
    let entries = data.split("|");
    if(entries.length === 1) return data;

    for(let i = 0; i < entries.length; i++) {
        entries[i] = entries[i].trim();
    }

    return entries.join(", ");
}



function getCsvData() {
    fetch(databaseFilePath)
        .then(response => response.text())
        .then((data) => {
            return populateTable(data);
        }
    );
}


getCsvData();