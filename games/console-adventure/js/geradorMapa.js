/**
 * Gerador de Mapas - v0
 * Inicio : 20/01/2022
 * Update : 
 * 
 */

const gerarMapa = () => {
  let mapaGerado = []
  const col = document.getElementById("matrizColuna").value || 1
  const lin = document.getElementById("matrizLinha").value || 1
  console.log(lin, col)
  for (let l = 0; l < lin; l++) {
    mapaGerado.push([])
    for (let c = 0; c < col; c++) {
      mapaGerado[l].push(" ");
    }
  }
  console.log(mapaGerado)
  return mapaGerado
}
let mapaArray = "";

const desenharMapa = (divId) => {
  mapaArray = gerarMapa();
  const coluna = document.getElementById("matrizColuna").value || 1
  const linha = document.getElementById("matrizLinha").value || 1
  let colunaRendenizada = "";
  let linhaRendenizada = "";

  let gerarColunas = (l) => {
    colunaRendenizada = "";
    for (let c = 0; c < coluna; c++) {
      colunaRendenizada += `<div id="${l}-${c}" class="matriz-coluna" onclick="divSelecionada(this)"></div>`
    }
    return colunaRendenizada
  }

  for (let l = 0; l < linha; l++) {
    linhaRendenizada += `<div id="${l}" class="matriz-linha"> ${gerarColunas(l)} </div>`
  }

  document.getElementById(divId).innerHTML = linhaRendenizada;
}

// SELECIONAR A DIV E ALTERA A CLASSE DELA
const divSelecionada = (_this) => {
  const divId = _this.id;
  const divClass = _this.className;
  let select = divClass.split(" ");
  console.log(divId)
  console.log(divClass)
  if (select.length >= 1) {
    if (select.find(e => e === "div-selected")) {
      document.getElementById(divId).className = "matriz-coluna"
      mapaArray[divId.split("-")[0]][divId.split("-")[1]] = " "

    } else {
      document.getElementById(divId).className = "matriz-coluna div-selected"
      mapaArray[divId.split("-")[0]][divId.split("-")[1]] = "#"
    }
    console.log(mapaArray)
  }
}




