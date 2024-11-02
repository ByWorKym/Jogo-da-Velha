const currentPlayerElement = document.querySelector(".currentPlayer");
const messageDiv = document.getElementById("message");
const parabensModal = document.getElementById("parabensModal");
const falhaModal = document.getElementById("falhaModal");
const empateModal = document.getElementById("empateModal");
const music = document.getElementById("musicaDeFundo");
const muteButton = document.getElementById("muteButton");

let selected;
let player = "X";
let isMuted = false;

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function init() {
    selected = [];
    player = "X";
    messageDiv.innerHTML = "";
    currentPlayerElement.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((button) => {
        button.innerHTML = "";
        button.removeEventListener("click", newMove);
        button.addEventListener("click", newMove);
    });

    closeAllModals();
}

function closeAllModals() {
    parabensModal.style.display = "none";
    falhaModal.style.display = "none";
    empateModal.style.display = "none";
}

function newMove(e) {
  const index = e.target.getAttribute("data-i");
  
  // Define a imagem correspondente ao jogador
  const image = player === "X" ? "img/14.png" : "img/13.png"; // Altere o caminho conforme necessário
  e.target.innerHTML = `<img src="${image}" alt="${player}" style="width: 100%; height: 100%;">`; // Adiciona a imagem ao botão
  
  e.target.removeEventListener("click", newMove);
  selected[index] = player;

  setTimeout(() => {
      check();
  }, 100);

  player = player === "X" ? "O" : "X";
  currentPlayerElement.innerHTML = `JOGADOR DA VEZ: ${player}`;
}


// Função para verificar o resultado do jogo
function check() {
    let lastPlayer = player === "X" ? "O" : "X";

    const items = selected
        .map((value, index) => value === lastPlayer ? index : null)
        .filter(index => index !== null);

    for (const position of positions) {
        if (position.every(pos => items.includes(pos))) {
            showModal(lastPlayer === "X" ? parabensModal : falhaModal);
            return;
        }
    }

    if (selected.filter(Boolean).length === 9) {
        showModal(empateModal);
    }
}

function showModal(modal) {
    modal.style.display = "block";
}

// Mute/Unmute audio
muteButton.addEventListener("click", () => {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? "🔇" : "🔊"; // Muda o ícone do botão
    isMuted ? music.pause() : music.play();
});

// Acessibilidade - Zoom, Alto Contraste e Escala de Cinza
document.getElementById("zoom").addEventListener("click", () => {
    document.body.style.zoom = "1.2"; // Ajuste de zoom
});

document.getElementById("alto-contraste").addEventListener("click", () => {
    document.body.classList.toggle("alto-contraste"); // Adicione estilos de alto contraste no CSS
});

document.getElementById("escala-cinza").addEventListener("click", () => {
    document.body.classList.toggle("escala-cinza"); // Adicione estilos de escala de cinza no CSS
});

init();
let isZoomed = false; // Estado do zoom

// Função para aplicar ou remover zoom
function toggleZoom() {
    if (!isZoomed) {
        document.body.style.transform = "scale(1.2)"; // Aumenta o zoom
        document.body.style.transformOrigin = "top left"; // Define a origem do zoom
        document.body.style.transition = "transform 0.3s"; // Transição suave
        isZoomed = true;
    } else {
        document.body.style.transform = "scale(1)"; // Remove o zoom
        isZoomed = false;
    }
}

// Adiciona o evento de clique ao botão de zoom
document.getElementById("zoom").addEventListener("click", toggleZoom);
