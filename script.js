// Declaram variabilele globale necesare pentru joc
let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

// Definim condițiile de câștig pentru X și 0
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Funcția care gestionează click-ul pe o celulă
function handleCellClick(clickedCellIndex) {
  const clickedCell = document.getElementById(clickedCellIndex);

  // Dacă celula este deja ocupată sau jocul s-a terminat, nu se întâmplă nimic la click
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  // Marchăm celula cu simbolul jucătorului curent (X sau 0)
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  // Verificăm dacă jocul s-a terminat și afișăm mesajul corespunzător
  checkGameResult();
}

// Funcția care verifică rezultatul jocului
function checkGameResult() {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      gameActive = false;
      alert(`Player ${currentPlayer} won!`);
      return;
    }
  }

  // Dacă nu mai sunt celule goale, jocul este o remiză
  if (!gameState.includes('')) {
    gameActive = false;
    alert('It\'s a draw!');
    return;
  }

  // Schimbăm jucătorul curent pentru următorul tur
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Funcția care resetează jocul
function startNewGame() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];

  // Resetăm toate celulele din tabel
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}

// Atașăm event listeneri pentru fiecare celulă din tabel
for (let i = 0; i < 9; i++) {
  const cell = document.getElementById(i);
  cell.addEventListener('click', () => handleCellClick(i));
}

// Atașăm event listener pentru butonul de restart
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', startNewGame);
