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

//creation de la fonctin random pour générer de nouvelles pièces
function randomPiece() {
  let r = randomN = Math.floor(Math.random() * PIECES.length);
  return new Piece(PIECES[r][0], PIECES[r][1]);

}

//initier une pièce
let p = randomPiece();

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
  this.fill(this.color);
  /*for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      //on dessine les emplacements occupés
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, this.color);
      }
    }
  }*/
}

//faire tomber la pièce sans avoir de trace...
Piece.prototype.unDraw = function () {
  this.fill(VACANT);
  /*for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      //on dessine les emplacements occupés
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, VACANT);
      }
    }
  }*/
}


//faire tomber la pièce
Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.unDraw();
    this.y++;
    this.draw();
  }else {
    this.lock();
    p = randomPiece();
  }

}

//déplacer la pièce à droite
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }

}

//déplacer la pièce à gauche
Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }

}

//effectuer une rotation
Piece.prototype.rotate = function () {

  let nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
  let kick = 0;

  if (this.collision(0, 0, nextPattern)) {
    if (this.x > COL/2) {
      //mur droit
      kick = -1;//pour déplacer la pièce vers la droite
    } else {
      //mur gauche
      kick = 1;//pour déplacer la pièce vers la gauche
    }
  }
  if (!this.collision(kick, 0, nextPattern)) {
    this.unDraw();
    this.x += kick;
    this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  }
}

//je déclare le score
let score = 0;

//fonction ermettant de bloquer une pièce dès qu'elle touche le sol de quadrillage
Piece.prototype.lock = function () {

  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      //on passe à la pièce suivante
      if (!this.activeTetromino[r][c]) {
        continue;
      }

      //fonction qui renvoit à un game over
      if (this.y + r < 0) {
        alert("game over");
        gameOver = true;
        break;// arret de la fonction requestAnimationFrame.
      }

      board[this.y+r][this.x+c] = this.color;
    }
  }

  //suppression des lignes pour en créer de nouvelles.
  for (r = 0; r < ROW; r++) {
    let isRowFull = true;

    for (c = 0; c < COL; c++) {
      isRowFull = isRowFull && (board[r][c] != VACANT);
    }

    if (isRowFull) {
      //faire descendre les lignes pleines
      for (y = r; y > 1; y--) {
        for (c = 0; c < ROW; c++) {
          board[y][c] = board[y-1][c];
        }
      }

      for (c = 0; c < ROW; c++) {
        board[0][c] = VACANT;
      }

      //incrémenter le score de 10
      score += 10;
    }
  }
  drawBoard();
}

//détecter une collision
Piece.prototype.collision = function (x, y, piece) {
  for (r = 0; r < piece.length; r++) {

    for (c = 0; c < piece.length; c++) {
      //on s'arrête si une cellule de la grill est occupée
      if (!piece[r][c]) {
        continue;
      }

      let newX = this.x + c + x;
      let newY = this.y + r + y;

      //la condition
      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }

      if (newY < 0) {
        continue;
      }

      if (board[newY][newX] != VACANT) {
        return true;

      }
    }
  }
  return false;
}


//contrôler la pièce
//On écoute un évènement, le fait d'appuier sur une touche.
document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}


//la fréquence à laquelle les pièces vont tomber
let dropStart = Date.now();
let gameOver = false;

function drop() {
  let now = Date.now();
  let delta = now - dropStart;

  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }

  if (!gameOver) {
    requestAnimationFrame(drop);
  }


}
drop();
