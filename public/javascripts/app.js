//DOM queries
const table = document.querySelector("table");

//CELL identifier
const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];

//Rendering based on color
function renderChessboard(color) {
  if (color === "black") {
    for (i = 0; i <= 7; i++) {
      const tr = document.createElement("tr");
      for (j = 0; j <= 7; j++) {
        const td = document.createElement("td");
        td.id = `${symbols[j]}${symbols.length - i}`;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  } else {
    for (i = 0; i <= 7; i++) {
      const tr = document.createElement("tr");
      for (j = 7; j >= 0; j--) {
        const td = document.createElement("td");
        td.id = `${symbols[j]}${i + 1}`;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
  }
}

renderChessboard("white");
