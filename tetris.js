const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 20;
const VACANT = "white"; // Coleur de case vide

// Dessin mes cubes à l'aide d'une fonction

function drawSquare(x,y,color) {

  ctx.fillStyle = color; // La couleur de ma case occupée
  ctx.fillRect(x*SQ, y*SQ, SQ, SQ); // Emplacement des pièces.

  ctx.strokeStyle = "black"; // Couleur des bordures
  ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);

}

// Création de la grille
let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r] [c] = VACANT;
  }
}
// Je dessine ma grille
function drawBoard() {
  for (r = 0; r < ROW; r++) {

    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r] [c]);
    }
  }
}
drawBoard(); // J'appelle ma fonction

// Les pièces et leurs couleurs
const PIECES = [
  [Z, "red"],
  [S, "green"],
  [L, "cyan"],
  [I, "purple"],
  [T, "pink"],
  [O, "blue"],
  [J, "orange"]
];

// Initier une pièce
let p = new Piece(PIECES[0][0],PIECES[0][1]);

// L'objet pièce
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0;//point de départ;
  this.activeTetromino = this.tetromino[this.tetrominoN];

  // Contrôle des pièces
  this.x = 2;
  this.y = 4;
}

// Dessin d'une pièce sur la grille
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
p.draw();
