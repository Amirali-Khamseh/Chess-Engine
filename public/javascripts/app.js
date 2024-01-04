const columnAnnotation = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
};
function renderChessboard(pov) {
  let chessboard = "";
  if (pov === "white") {
    for (let x = 7; x >= 0; x -= 1) {
      let row = "<div class='row'>";
      for (let y = 0; y < 8; y += 1) {
        let column = columnAnnotation[(y + 1).toString()] + (x + 1).toString();
        let square = `<div id='${column}'>${column}</div>`;
        row += square;
      }
      chessboard += "\n" + row + "</div>";
    }
  } else {
    for (let x = 0; x < 8; x += 1) {
      let row = "<div class='row'>";
      for (let y = 7; y >= 0; y -= 1) {
        let column = columnAnnotation[(y + 1).toString()] + (x + 1).toString();
        let square = `<div id='${column}'>${column}</div>`;
        row += square;
      }
      chessboard += "\n" + row + "</div>";
    }
  }
  return chessboard;
}

console.log(renderChessboard("white"));
