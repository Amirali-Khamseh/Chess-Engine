/* Chess symbols in Unicode */
const symbols = [
  "&#x2656;",
  "&#x2658;",
  "&#x2657;",
  "&#x2655;",
  "&#x2654;",
  "&#x2657;",
  "&#x2658;",
  "&#x2656;",
];
const pawn = "&#x2659;";
/*DOM QUERIES*/
const chessCells = document.querySelectorAll("td");
const renderChessboard = (pov) => {
  if (pov === "white") {
    /*White section */
    for (let i = 0; i < 8; i++) {
      chessCells[i].innerHTML = symbols[i];
      chessCells[i].style.fontSize = "2rem";
      chessCells[i].style.color = "white";
    }
    for (let i = 8; i < 16; i++) {
      chessCells[i].innerHTML = pawn;
      chessCells[i].style.fontSize = "2rem";
      chessCells[i].style.color = "white";
    }
  } else if (pov === "black") {
    /* Black section*/
    let symbolIndex = 0;
    for (let i = 56; i < 64; i++) {
      chessCells[i].innerHTML = symbols[symbolIndex];
      symbolIndex++;
      chessCells[i].style.fontSize = "2rem";
    }

    for (let i = 48; i < 56; i++) {
      chessCells[i].innerHTML = pawn;
      chessCells[i].style.fontSize = "2rem";
    }
  } else {
    alert("There is a problem whit Board generation");
  }
};
renderChessboard("white");
renderChessboard("black");
