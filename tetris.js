const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "white";//coleur de case vide

//dessin mes cubes à l'aide d'une fonction

function drawSquare(x,y,color) {

  ctx.fillStyle = "white";//la couleur de ma case occupée
  ctx.fillRect(x*SQ, y*SQ, SQ, SQ);//emplacement des pièces.

  ctx.strokeStyle = "black";//couleur des bordures
  ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);

}

//création de la grille
let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r] [c] = VACANT;
  }
}
//je dessin ma grille
function drawBoard() {
  for (r = 0; r < ROW; r++) {

    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r] [c]);
    }
  }
}
drawBoard();//j'appelle ma fonction

//l'objet pièce
function Piece(){}
