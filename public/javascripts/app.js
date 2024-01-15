// DOM queries
const table = document.querySelector("table");
// CELL identifier
const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];
// UTF-8 encoding for chess pieces
const chessSymbols = {
  r: "&#9820;", // black rook
  n: "&#9822;", // black knight
  b: "&#9821;", // black bishop
  q: "&#9819;", // black queen
  k: "&#9818;", // black king
  p: "&#9823;", // black pawn
  R: "&#9814;", // white rook
  N: "&#9816;", // white knight
  B: "&#9815;", // white bishop
  Q: "&#9813;", // white queen
  K: "&#9812;", // white king
  P: "&#9817;", // white pawn
};

// Putting the pieces in place
function placePieces(fen) {
  const pieces = fen.split(" ")[0]; // Extracting the piece placement part from the FEN string

  let row = 8;
  let col = 0;

  for (let i = 0; i < pieces.length; i++) {
    const currentChar = pieces[i];

    if (currentChar === "/") {
      // Move to the next row
      row--;
      col = 0;
    } else if (isNaN(currentChar)) {
      // If the character is a letter (represents a piece)
      const tdId = `${symbols[col]}${row}`;
      const td = document.getElementById(tdId);

      if (td) {
        td.innerHTML = chessSymbols[currentChar] || ""; // Update the content of the table cell
        col++;
      }
    } else {
      // If the character is a number (representing empty squares)
      const emptySquares = parseInt(currentChar, 10);
      col += emptySquares;
    }
  }
}

// Rendering based on color
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

// Example usage
renderChessboard("black");
placePieces("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
