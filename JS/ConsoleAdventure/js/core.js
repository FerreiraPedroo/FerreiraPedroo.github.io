const mapa = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']]
const items = ["🏠", "🛖", "🐿️", "🌴", "🌳", "🌹"]
let mapaColizaoObstaculos = JSON.parse(JSON.stringify(mapa));
let mapaColizaoPersonagens = JSON.parse(JSON.stringify(mapa));


// START GAME
function startGame() {
  // GERANDO MAPA DE COLIZAO DOS PESONAGENS

  console.log("START GAME")
  for (let x = 0; x < mapa.length; x++) {
    for (let y = 0; y < mapa[x].length; y++) {
      mapaColizaoPersonagens[x][y] = " "
    }
  }

  //RENDENIZANDO OS PERSONAGENS/INIMIGOS NO MAPA DE COLIZAO PARA RENDENIZAR NA TELA
  // inimigo
  posicaoInimigo.forEach(inimigo => {
    mapaColizaoPersonagens[inimigo.posX][inimigo.posY] = inimigo.personagem;
  })
  // personagem
  mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY] = posicaoPersonagem.personagem;


  // INICIAR A RENDENIZAÇÃO
  const MAPA_RENDENIZAR = setInterval(() => rendenizarMapa(mapa), 300)

  // ATIVAR O MOVIMENTO
  window.addEventListener("keydown", (event) => {
    let moverPersonagem = controlePersonagem[event.key]
    if (moverPersonagem) moverPersonagem()
  })

}

// PERSONAGENS
const posicaoPersonagem = {
  type: "Jogador",
  personagem: "@",
  posX: 10,
  posY: 10,
  dir: 0
};
for (props in posicaoPersonagem){
  console.log(props)
}
const controlePersonagem = {
  ArrowUp() {
    if (mapaColizaoPersonagens[posicaoPersonagem.posX - 1][posicaoPersonagem.posY] === " " && mapaColizaoObstaculos[posicaoPersonagem.posX - 1][posicaoPersonagem.posY] === " ") {
      mapaColizaoPersonagens[posicaoPersonagem.posX - 1][posicaoPersonagem.posY] = posicaoPersonagem.personagem
      mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY] = " "
      posicaoPersonagem.posX = posicaoPersonagem.posX - 1;
    }
  },
  ArrowDown() {
    if (mapaColizaoPersonagens[posicaoPersonagem.posX + 1][posicaoPersonagem.posY] === " " && mapaColizaoObstaculos[posicaoPersonagem.posX + 1][posicaoPersonagem.posY] === " ") {
      mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY] = " "
      mapaColizaoPersonagens[posicaoPersonagem.posX + 1][posicaoPersonagem.posY] = posicaoPersonagem.personagem
      posicaoPersonagem.posX = posicaoPersonagem.posX + 1;
    }
  },
  ArrowLeft() {
    if (mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY - 1] === " " && mapaColizaoObstaculos[posicaoPersonagem.posX][posicaoPersonagem.posY - 1] === " ") {
      mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY] = " "
      mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY - 1] = posicaoPersonagem.personagem
      posicaoPersonagem.posY = posicaoPersonagem.posY - 1;
    }
  },
  ArrowRight() {
    if (mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY + 1] === " " && mapaColizaoObstaculos[posicaoPersonagem.posX][posicaoPersonagem.posY + 1] === " ") {
      mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY] = " "
      mapaColizaoPersonagens[posicaoPersonagem.posX][posicaoPersonagem.posY + 1] = posicaoPersonagem.personagem
      posicaoPersonagem.posY = posicaoPersonagem.posY + 1;
    }
  },
};

// INIMIGOS
const posicaoInimigo = [{
  type: "Inimigo",
  personagem: "‰",
  posX: 1,
  posY: 1,
  dir: 0,
  mover: 5
}, {
  type: "Inimigo",
  personagem: "‰",
  posX: 11,
  posY: 11,
  dir: 0,
  mover: 5
}, {
  type: "Inimigo",
  personagem: "‰",
  posX: 8,
  posY: 8,
  dir: 0,
  mover: 5
}];
const inimigoAI = (posicaoInimigo) => {
  const inimigo = posicaoInimigo;
  for (let i = 0; i <= inimigo.length - 1; i++) {
    if (inimigo[i].mover >= 2) {
      console.log("moverInimigoDir: AGUARDANDO")
      inimigo[i].mover--
    } else if (inimigo[i].mover === 1) {
      let moverInimigoDir = Math.floor(Math.random() * 9);
      if (moverInimigoDir !== 2 && moverInimigoDir !== 4 && moverInimigoDir !== 6 && moverInimigoDir !== 8) {
        console.log("moverInimigoDir: NÂO MOVER")
      }
      if (moverInimigoDir === 2) {
        if (mapaColizaoPersonagens[posicaoInimigo[i].posX - 1][posicaoInimigo[i].posY] === " " && mapaColizaoObstaculos[posicaoInimigo[i].posX - 1][posicaoInimigo[i].posY] === " ") {
          mapaColizaoPersonagens[posicaoInimigo[i].posX - 1][posicaoInimigo[i].posY] = posicaoInimigo[i].personagem;
          mapaColizaoPersonagens[posicaoInimigo[i].posX][posicaoInimigo[i].posY] = " ";
          console.log("moverInimigoDir: mover cima")
          posicaoInimigo[i].posX = posicaoInimigo[i].posX - 1
        }
        else {
          console.log("moverInimigoDir: mover esquerda - BLOQUEADO")
        }
      }
      if (moverInimigoDir === 4) {
        if (mapaColizaoPersonagens[posicaoInimigo[i].posX + 1][posicaoInimigo[i].posY] === " " && mapaColizaoObstaculos[posicaoInimigo[i].posX + 1][posicaoInimigo[i].posY] === " ") {
          mapaColizaoPersonagens[posicaoInimigo[i].posX][posicaoInimigo[i].posY] = " ";
          mapaColizaoPersonagens[posicaoInimigo[i].posX + 1][posicaoInimigo[i].posY] = posicaoInimigo[i].personagem;
          console.log("moverInimigoDir: mover baixo")
          posicaoInimigo[i].posX = posicaoInimigo[i].posX + 1
        } else {
          console.log("moverInimigoDir: mover baixo - BLOQUEADO")
        }
      }
      if (moverInimigoDir === 6) {
        if (mapaColizaoPersonagens[posicaoInimigo[i].posX][posicaoInimigo[i].posY - 1] === " " && mapaColizaoObstaculos[posicaoInimigo[i].posX][posicaoInimigo[i].posY - 1] === " ") {
          mapaColizaoPersonagens[posicaoInimigo[i].posX][posicaoInimigo[i].posY] = " ";
          mapaColizaoPersonagens[posicaoInimigo[i].posX][posicaoInimigo[i].posY - 1] = posicaoInimigo[i].personagem;
          console.log("moverInimigoDir: mover esquerda");
          posicaoInimigo[i].posY = posicaoInimigo[i].posY - 1;
        } else {
          console.log("moverInimigoDir: mover esquerda - BLOQUEADO")
        }
      }
      if (moverInimigoDir === 8) {
        if (mapaColizaoPersonagens[posicaoInimigo[i].posX][posicaoInimigo[i].posY + 1] === " " && mapaColizaoObstaculos[posicaoInimigo[i].posX][posicaoInimigo[i].posY + 1] === " ") {
          mapaColizaoPersonagens[posicaoInimigo[i].posX][posicaoInimigo[i].posY] = " ";
          mapaColizaoPersonagens[posicaoInimigo[i].posX][posicaoInimigo[i].posY + 1] = posicaoInimigo[i].personagem;
          console.log("moverInimigoDir: mover cima")
          posicaoInimigo[i].posY = posicaoInimigo[i].posY + 1;
        } else {
          console.log("moverInimigoDir: mover cima - BLOQUEADO")
        }
      }
      inimigo[i].mover = 3
    }
  }
};

// RENDENIZANDO MAPA
const rendenizarMapa = (_mapa) => {
  console.clear()
  inimigoAI(posicaoInimigo)
  let mapaRendenizado = "";

  for (let x = 0; x < _mapa.length; x++) {
    mapaRendenizado = "";
    for (let y = 0; y < _mapa[x].length; y++) {
      if (_mapa[x][y] !== " " && mapaColizaoPersonagens[x][y] === " ") {
        mapaRendenizado += _mapa[x][y];
      } else if (_mapa[x][y] === " " && mapaColizaoPersonagens[x][y] !== " ") {
        mapaRendenizado += mapaColizaoPersonagens[x][y];
      } else {
        mapaRendenizado += " ";
      }
    }
    console.log(mapaRendenizado)
  }

  console.log(posicaoPersonagem)
  console.log(posicaoInimigo[0])
  console.log(posicaoInimigo[1])
  console.log(posicaoInimigo[2])
}

// rendenizarMapa(mapa)
// 
// startGame()




































const rendenizarMapaColizaoPersonagem = (_mapa) => {
  for (let x = 0; x < _mapa.length; x++) {
    mapaRendenizado = "";
    for (let y = 0; y < _mapa[x].length; y++) {
      mapaRendenizado += mapaColizaoPersonagens[x][y];
    }
    console.log(mapaRendenizado)
  }
}