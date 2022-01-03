let matriz_tictactoe = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let start_game = 0;
let player1_name = "Pedro"
let player2_name = "Computer"
let player1_win = 0;
let player2_win = 0;
let player_draw = 0;
let player_turn = 1;
let match1;
let match2;
let match3;
let match_ok;
//TEMPORARIO
document.getElementById("player1-name").innerHTML = player1_name;
document.getElementById("player2-name").innerHTML = player2_name;

function startGame(event) {
    start_game = 1;
    document.getElementById(event.id).setAttribute("hidden", "true");
    document.getElementById("game-msg").innerText = `${player1_name} TURN`;
}

// JOGANDO
function playerPlayed(_position) {
    let player_cell_select_X = _position.id.slice(0, 1)
    let player_cell_select_Y = _position.id.slice(1, 2)

    if (start_game === 1) {
        // POSICIONANDO AS PEÇAS
        if (matriz_tictactoe[player_cell_select_X][player_cell_select_Y] === 0) {
            if (player_turn == 1) {
                let cell_select = document.getElementById(`${player_cell_select_X}${player_cell_select_Y}`);
                matriz_tictactoe[player_cell_select_X][player_cell_select_Y] = player_turn;
                cell_select.innerHTML = "X";
                player_turn = 2;
                document.getElementById("game-msg").innerText = `${player2_name} TURN`;

            } else if (player_turn == 2) {
                let cell_select = document.getElementById(`${player_cell_select_X}${player_cell_select_Y}`);
                matriz_tictactoe[player_cell_select_X][player_cell_select_Y] = player_turn;
                cell_select.innerHTML = "O";
                player_turn = 1;
                document.getElementById("game-msg").innerText = `${player1_name} TURN`;

            }
            if (player_turn != 3) {
                match()
            }
        }

    } else {
        document.getElementById("game-msg").innerText = "↑ PRESS START ↑"
    }
}

// VERIFICANDO SE O JOGADOR GANHOU
function match() {
    let x = 0;

    //verificação em X
    for (x == 0; x < matriz_tictactoe.length;) {
        match1 = matriz_tictactoe[x][0];
        match2 = matriz_tictactoe[x][1];
        match3 = matriz_tictactoe[x][2];
        match_ok = `${match1}` + `${match2}` + `${match3}`;
        if (match_ok == "111") {
            console.log(matriz_tictactoe[x][0] + "0");
            document.getElementById(x + "0").style.backgroundColor = "blue";
            document.getElementById(x + "1").style.backgroundColor = "blue";
            document.getElementById(x + "2").style.backgroundColor = "blue";
            document.getElementById("game-msg").innerHTML = `${player1_name} WIN`;
            document.getElementById("player1-piece-container").innerHTML += "<div class='player-piece'>V</div>";
            player_turn = 3;
            player1_win += 1;
            return endGame();
        } else if (match_ok == "222") {
            document.getElementById(x + "0").style.backgroundColor = "blue";
            document.getElementById(x + "1").style.backgroundColor = "blue";
            document.getElementById(x + "2").style.backgroundColor = "blue";
            document.getElementById("game-msg").innerHTML = `${player2_name} WIN`;
            document.getElementById("player2-piece-container").innerHTML += "<div class='player-piece'>V</div>";
            player_turn = 3;
            player2_win += 1;
            return endGame();
        }
        x++
    }
    x = 0;

    // verificação em H
    for (x == 0; x < matriz_tictactoe.length;) {
        match1 = matriz_tictactoe[0][x];
        match2 = matriz_tictactoe[1][x];
        match3 = matriz_tictactoe[2][x];
        match_ok = `${match1}` + `${match2}` + `${match3}`;
        if (match_ok == "111") {
            document.getElementById("0" + x).style.backgroundColor = "blue";
            document.getElementById("1" + x).style.backgroundColor = "blue";
            document.getElementById("2" + x).style.backgroundColor = "blue";
            document.getElementById("game-msg").innerHTML = `${player1_name} WIN`;
            document.getElementById("player1-piece-container").innerHTML += "<div class='player-piece'>V</div>";
            player_turn = 3;
            player1_win += 1;
            return endGame();
        } else if (match_ok == "222") {
            document.getElementById("0" + x).style.backgroundColor = "blue";
            document.getElementById("1" + x).style.backgroundColor = "blue";
            document.getElementById("2" + x).style.backgroundColor = "blue";
            document.getElementById("game-msg").innerHTML = `${player2_name} WIN`;
            document.getElementById("player2-piece-container").innerHTML += "<div class='player-piece'>V</div>";
            player_turn = 3;
            player2_win += 1;
            return endGame();
        }
        x++
    }
    x = 0;

    // verificação em Y
    if (x == 0) {
        match1 = matriz_tictactoe[x][0];
        match2 = matriz_tictactoe[x + 1][1];
        match3 = matriz_tictactoe[x + 2][2];
        match_ok = `${match1}` + `${match2}` + `${match3}`;
        if (match_ok == "111") {
            document.getElementById(x + "0").style.backgroundColor = "blue";
            document.getElementById((x + 1) + "1").style.backgroundColor = "blue";
            document.getElementById((x + 2) + "2").style.backgroundColor = "blue";
            document.getElementById("game-msg").innerHTML = `${player1_name} WIN`;
            document.getElementById("player1-piece-container").innerHTML += "<div class='player-piece'>V</div>";
            player_turn = 3;
            player1_win += 1;
            return endGame();
        } else if (match_ok == "222") {
            document.getElementById(x + "0").style.backgroundColor = "blue";
            document.getElementById((x + 1) + "1").style.backgroundColor = "blue";
            document.getElementById((x + 2) + "2").style.backgroundColor = "blue";
            document.getElementById("game-msg").innerHTML = `${player2_name} WIN`;
            document.getElementById("player2-piece-container").innerHTML += "<div class='player-piece'>V</div>";
            player_turn = 3;
            player2_win += 1;
            return endGame();
        }
    }
    x = 0;

    // verificação em Y-Inverso   
    if (x == 0) {
        match1 = matriz_tictactoe[0][x + 2];
        match2 = matriz_tictactoe[1][x + 1];
        match3 = matriz_tictactoe[2][x];
        match_ok = `${match1}` + `${match2}` + `${match3}`;
        if (match_ok == "111") {
            document.getElementById("0" + (x + 2)).style.backgroundColor = "blue";
            document.getElementById("1" + (x + 1)).style.backgroundColor = "blue";
            document.getElementById("2" + x).style.backgroundColor = "blue";
            document.getElementById("game-msg").innerHTML = `${player1_name} WIN`;
            document.getElementById("player1-piece-container").innerHTML += "<div class='player-piece'>V</div>";
            player_turn = 3;
            player1_win += 1;
            return endGame();
        } else if (match_ok == "222") {
            document.getElementById("0" + (x + 2)).style.backgroundColor = "blue";
            document.getElementById("1" + (x + 1)).style.backgroundColor = "blue";
            document.getElementById("2" + x).style.backgroundColor = "blue";
            document.getElementById("game-msg").innerHTML = `${player2_name} WIN`;
            document.getElementById("player2-piece-container").innerHTML += "<div class='player-piece'>V</div>";
            player_turn = 3;
            player2_win += 1;
            return endGame();
        }
    }
    x = 0;
    // DRAW GAME - QUANDO O JOGO DEU EMPATE, APÓS TODAS AS JOGADAS POSSÍVEIS.

    x = 0;
    for (matrizX = 0; matrizX < matriz_tictactoe.length; matrizX++) {
        for (matrizY = 0; matrizY < matriz_tictactoe[0].length; matrizY++) {
            if (matriz_tictactoe[matrizX][matrizY] != 0) {
                x += 1;
                if (x == 9) {
                    document.getElementById("00").style.backgroundColor = "blue";
                    document.getElementById("01").style.backgroundColor = "blue";
                    document.getElementById("02").style.backgroundColor = "blue";
                    document.getElementById("10").style.backgroundColor = "blue";
                    document.getElementById("11").style.backgroundColor = "blue";
                    document.getElementById("12").style.backgroundColor = "blue";
                    document.getElementById("20").style.backgroundColor = "blue";
                    document.getElementById("21").style.backgroundColor = "blue";
                    document.getElementById("22").style.backgroundColor = "blue";
                    document.getElementById("game-msg").innerHTML = "DRAW GAME";
                    player_draw += 1;
                    return endGame();
                }
            }
        }
    }

}

// FIM DO JOGO
function endGame() {
    document.getElementById("reset-game").removeAttribute("hidden");
}

// RESETAR O TABULEIRO E VARIAVEIS PARA JOGAR DENOVO
function resetGame() {
    player_turn = 1;
    match1 = 0;
    match2 = 0;
    match3 = 0;
    match_ok = "";
    matriz_tictactoe = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    for (c = 0; c < document.getElementsByClassName("position").length; c++) {
        document.getElementsByClassName("position")[c].style.backgroundColor = "darkblue";
        document.getElementsByClassName("position")[c].innerText = "";
    }

    document.getElementById("reset-game").setAttribute("hidden", "true");
    document.getElementById("game-msg").innerText = `${player1_name} TURN`;
}

// INICIO ALEATORIO
function random_start() {

}

