// struct == object
var mapObj = {
    rows: 12,
    columns: 12,
    array: [],
}

function initMap() {
    for (let i = 0; i < mapObj.rows; i++) {
        mapObj.array[i] = new Array(mapObj.columns);
    }
    for (let i = 0; i < mapObj.rows; i++) {
        for (let j = 0; j < mapObj.columns; j++) {
            mapObj.array[i][j] = 0;
        }
    }
    init_model(0,0);
}

function printMap() {
    for (let i = 0; i < mapObj.rows; i++) {
        for (let j = 0; j < mapObj.columns; j++) {
            console.log(mapObj.array[i][j]);
        }
        console.log("\n");
    }
}

// x and y ofc are the coordinates where 
// the model have to be initialized
function init_model(x, y) {
    mapObj.array[1][4] = 1;
    mapObj.array[2][5] = 1;
    mapObj.array[3][3] = 1;
    mapObj.array[3][4] = 1;
    mapObj.array[3][5] = 1;
}

function init_renderMap(__rows, __columns) {
    const mapContainer = document.createElement("div");
    const map = document.createElement("table");
    const mapBody = document.createElement("tbody");

    // add the class to the elements 
    mapContainer.classList.add("map-container");
    map.classList.add("map");

    // creating all cells
    for (let i = 0; i < __rows; i++) {
        // creates a table row
        const row = document.createElement("tr");

        for (let j = 0; j < __columns; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            const cell = document.createElement("td");
            cell.classList.add("off");
            // giving the cell an id 
            cell.setAttribute("id", "ij" + i + j);
            // cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        mapBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    map.appendChild(mapBody);
    // put the <table> in the div 
    mapContainer.appendChild(map);
    // appends <table> into <body>
    document.body.appendChild(mapContainer);
}

function update_renderMap() {
    for (let i = 0; i < mapObj.rows; i++) {
        for (let j = 0; j < mapObj.columns; j++) {
            const cell = document.getElementById("ij" + i + j);
            cell.setAttribute('class', 'on');
            if (mapObj.array[i][j] == 1) {
                cell.setAttribute('class', 'on');
            } else {
                cell.setAttribute('class', 'off');
            }
        }
    }
}

/*  Qualsiasi cella viva con meno di due celle vive adiacenti muore, come per effetto d'isolamento;
    Qualsiasi cella viva con due o tre celle vive adiacenti sopravvive alla generazione successiva;
    Qualsiasi cella viva con più di tre celle vive adiacenti muore, come per effetto di sovrappopolazione;
    Qualsiasi cella morta con esattamente tre celle vive adiacenti diventa una cella viva, come per effetto di riproduzione. */


function nearCellInspector(x, y, mapClone) {
    let min_x, min_y;
    let max_x, max_y;

    if ((x - 1) < 0)
        min_x = 0;
    else
        min_x = x - 1;
    if ((x + 1) > mapObj.rows - 1)
        max_x = mapObj.rows - 1;
    else
        max_x = x + 1;
    if ((y - 1) < 0)
        min_y = 0;
    else
        min_y = y - 1;
    if ((y + 1) > mapObj.columns - 1)
        max_y = mapObj.columns - 1;
    else
        max_y = y + 1;

    //console.log("x: " + x + " y: " + y + " min_x: " + min_x + " max_x: " + max_x + " min_y: " + min_y + " max_y: " + max_y);

    let nearCellCounter = 0;
    console.log("x: ", x, "y: ", y);
    for (let i = min_x; i <= max_x; i++) {
        for (let j = min_y; j <= max_y; j++) {
            if (i == x && j == y) {
                continue;
            }
            // console.log("i: ", i, "j: ", j, "mapClone[i][j]: ", mapClone[i][j]);
            if (mapClone[i][j] == 1) {
                nearCellCounter++;
            }
        }
    }

    // console.log("return " + nearCellCounter)
    return nearCellCounter;
}

function totalAliveInspector() {
    let cnt = 0;
    for (let i = 0; i < mapObj.rows; i++) {
        for (let j = 0; j < mapObj.columns; j++) {
            if (mapObj.array[i][j] == 1)
                cnt++;
        }
    }
    return cnt;
}

/* https://stackoverflow.com/questions/29173956/start-and-stop-loop-in-javascript-with-start-and-stop-button */

function game() {
    // we need to create a copy of the mapObj.array 
    const mapClone = JSON.parse(JSON.stringify(mapObj.array));;
    for (let i = 0; i < mapObj.rows; i++) {
        for (let j = 0; j < mapObj.columns; j++) {
            let nearCellCount = nearCellInspector(i, j, mapClone);
            // console.log("x: ", i, "y: ", j, "nearCellCount: ", nearCellCount);
            if (mapClone[i][j] == 1) {
                if (nearCellCount == 2 || nearCellCount == 3) {
                    continue;
                } else {
                    mapObj.array[i][j] = 0;
                }
            } else {
                if (nearCellCount == 3) {
                    mapObj.array[i][j] = 1;
                }
            }
        }
    }
    // console.log("update_rendermap() is being called!");
    update_renderMap();
}
