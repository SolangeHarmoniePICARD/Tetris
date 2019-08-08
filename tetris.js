const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "white";//coleur de case vide

//dessin mes cubes à l'aide d'une fonction

function drawSquare(x,y,color) {

  ctx.fillStyle = color;//la couleur de ma case occupée
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

//les pièces et leurs couleurs
const PIECES = [
  [Z, "red"],
  [S, "green"],
  [L, "cyan"],
  [I, "purple"],
  [T, "pink"],
  [O, "blue"],
  [J, "orange"]
];

//initier une pièce
let p = new Piece(PIECES[0][0], PIECES[0][1]);

//l'objet pièce
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0;//point de départ;
  this.activeTetromino = this.tetromino[this.tetrominoN];

  //contrôle des pièces, position initiale
  this.x = 3;
  this.y = 0;
}

//fill fonction
Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      //on dessine les emplacements occupés
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
}

//dessin d'une pièce sur le tableau
Piece.prototype.draw = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      //on dessine les emplacements occupés
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, this.color);
      }
    }
  }
}

//faire tomber la pièce sans avoir de trace...
Piece.prototype.unDraw = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      //on dessine les emplacements occupés
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, VACANT);
      }
    }
  }
}
p.draw();

//faire tomber la pièce
Piece.prototype.moveDown = function () {
  this.y++;
  this.draw();
}

//la fréquence à laquelle les pièces vont tomber
let dropStart = Date.now();
function drop() {
  let now = Date.now();
  let delta = now - dropStart;

  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }

  requestAnimationFrame(drop);
}
drop();
