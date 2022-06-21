let row = 8;
let col = 8;
let bombsFound = 0;
const table = document.getElementById("table");
const reset = document.getElementById("reset");
const listItems = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
const checkList = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
for (let i = 0; i < row; ++i) {
  let x = table.insertRow(i);
  for (let j = 0; j < col; ++j) {
    let y = x.insertCell(j);
    y.innerHTML = "";
    y.id = i + "" + j;
    y.onclick = function() {
      addElementTable(i, j);
    };
    y.addEventListener('contextmenu', function(ev) {
      ev.preventDefault();
      addFlag(i,j);
      return false;
    }, false);
  }
}

function addRandomBombeList() {
  for (let i = 0; i < row; ++ i) {
    let rows = Math.floor(Math.random() * row);
    let cols = Math.floor(Math.random() * col);
    let line_position;
    if (rows === 0) {
      line_position = cols;
    } else {
      line_position = (rows+""+cols);
    }
    if (listItems[line_position] === "💣" || line_position <= 0 || line_position > 78) {
      --i;
    } else if(listItems[line_position] !== "💣") {
      listItems[line_position] = "💣";
    } 
  }
}
addRandomBombeList();

function addNeighborsList() {
  for (let l = 0; l < row; ++l) {
    let line_position;
    for (let c = 0; c < row; ++c) {
      if (l === 0) {
        line_position = c;
      } else {
        line_position = (l + "" + c);
      }
      if (listItems[line_position] ===  "💣") {
        for (let line = l - 1; line <= l + 1; ++line) {
          for (let column = c - 1; column <= c + 1; ++column) {
            let position;
            if (line === 0) {
              position = column;
            } else {
              position = (line + "" + column);
            }
            if (listItems[position] !== "💣" && position >= 0 && position < 78) {
              listItems[position] += 1;
            }
          }
        }
      }
    }
  }
}
addNeighborsList();

function emptyCells(pos) {
  let listNeighboringCells = [];
  listNeighboringCells.push(pos);
  while (listNeighboringCells.length > 0) {
    checkList[parseInt(listNeighboringCells[0])] = 1;
    document.getElementById(listNeighboringCells[0]).innerHTML = 0;
    let j = (listNeighboringCells[0] % 10);
    let i = (parseInt(listNeighboringCells[0] / 10));
    for (let l = i - 1; l <= i + 1; ++l) {
      for (let c = j - 1; c <= j + 1; ++c) {
        if (l >= 0 && c >= 0 && l < row && c < col) {
          let position_list;
          position_list = l + "" + c;
          if (listItems[parseInt(position_list)] === 0) {
            document.getElementById(position_list).innerHTML = listItems[parseInt(position_list)];
            document.getElementById(position_list).style.background = "#D3D3D3";
            if (checkList[parseInt(position_list)] === 0) {
              listNeighboringCells.push(position_list);
            }
          } else if (listItems[parseInt(position_list)] !== "💣") {
            document.getElementById(position_list).innerHTML = listItems[parseInt(position_list)];
            document.getElementById(position_list).style.background = "#B0E0E6";
          }
        }
      }
    }
    listNeighboringCells.shift();
  }
}

function addFlag(i, j) {
  let flagPosition = i + "" + j;
  if (listItems[parseInt(flagPosition)] === "💣") {
    document.getElementById(flagPosition).innerHTML = "🚩";
    document.getElementById(flagPosition).style.background = '#98FB98';
    ++bombsFound;
  } else {
    document.getElementById(flagPosition).innerHTML = "🚩";
    document.getElementById(flagPosition).style.background = '#98FB98'; 
  } 
     if (bombsFound === row) {
       document.getElementById('table').innerHTML = "Game Won";
       document.getElementById('table').style.background = "#ADFF2F";
     }
}

function addElementTable(i,j) { 
  let cellCall;
  cellCall = i + "" + j;
  if (listItems[parseInt(cellCall)] === "💣") {
    for (let x = 0; x < 78; ++x) {
      if (listItems[x] === "💣") {
        if (x < 10) {
          let position = (0 + "" + x);
          document.getElementById(position).innerHTML = listItems[x];
          document.getElementById(position).style.background = "red";
          document.getElementById('table').innerHTML = "Game Over";
          document.getElementById('table').style.background = "red";
        } else {
          document.getElementById(x).innerHTML = listItems[x];
          document.getElementById(x).style.background = 'red';
          document.getElementById('table').innerHTML = "Game Over";
          document.getElementById('table').style.background = "red";
        }
      }
    }
  } else {
    if (listItems[parseInt(cellCall)] === 0) {
      emptyCells(i + "" + j);
    } else {
      document.getElementById(i + "" + j).innerHTML = listItems[parseInt(cellCall)];
      document.getElementById(i + "" + j).style.background = "#B0E0E6";
    }
  }
}
function resetGame() {
  window.location.reload();
}
