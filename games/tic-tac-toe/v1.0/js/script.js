//Aqui é com você, aspirante!
var matriz_tictactoe = [[0,0,0],[0,0,0],[0,0,0]];
var player1;
var player2;
var player_turn = 1;


function player_played(player_cell_select_X,player_cell_select_Y) {
    console.log("X = " + player_cell_select_X);
    console.log("Y = " + player_cell_select_Y);

    if (player_turn == 1 ) {
        let cell_select = document.getElementById(`${player_cell_select_X}${player_cell_select_Y}`);
        matriz_tictactoe[player_cell_select_X][player_cell_select_Y] = player_turn;
        cell_select.innerHTML = "X";
        player_turn = 2;
        document.getElementById("player_turn").innerHTML = "VEZ DO JOGADOR 02";

    }else if(player_turn == 2 ) {
        let cell_select = document.getElementById(`${player_cell_select_X}${player_cell_select_Y}`);
        matriz_tictactoe[player_cell_select_X][player_cell_select_Y] = player_turn;
        cell_select.innerHTML = "O";
        player_turn = 1;
        document.getElementById("player_turn").innerHTML = "VEZ DO JOGADOR 01";

    }
match()
}

function match() {
    let x;

    //verificação em X
    for (x = 0; x < matriz_tictactoe.length; ) {

        var match1 = matriz_tictactoe[x][0];
        var match2 = matriz_tictactoe[x][1];
        var match3 = matriz_tictactoe[x][2];
        var match_ok = `${match1}` + `${match2}` + `${match3}`;
        console.log("Verif X = "+match_ok);

        if (match_ok == "111") {
            document.getElementById("player_turn").innerHTML = "JOGADOR 01 - GANHOU";
            player_turn = 3;
            console.log("MATCH PLAYER 01 - X")
        }else if (match_ok == "222"){
            document.getElementById("player_turn").innerHTML = "JOGADOR 02 - GANHOU";
            player_turn = 3;
            console.log("MATCH PLAYER 02 - X")
        }
        x++        
    }
    x = 0;

    // varificação em H
    for (x = 0; x < matriz_tictactoe.length; ) {
        var match1 = matriz_tictactoe[0][x];
        var match2 = matriz_tictactoe[1][x];
        var match3 = matriz_tictactoe[2][x];
        var match_ok = `${match1}` + `${match2}` + `${match3}`;
        console.log("Verif H = "+match_ok);

        if (match_ok == "111") {
            document.getElementById("player_turn").innerHTML = "JOGADOR 01 - GANHOU";
            player_turn = 3;
            console.log("MATCH PLAYER 01 - H")
        }else if (match_ok == "222"){
            document.getElementById("player_turn").innerHTML = "JOGADOR 02 - GANHOU";
            player_turn = 3;
            console.log("MATCH PLAYER 02 - H")
        }
        x++        
    }
    x = 0;

    // verificação diagonal
    //for (x = 0; ; );
    //var match1 = matrix_tictactoe[x][0];
    //var match2 = matrix_tictactoe[x][1];
    //var match3 = matrix_tictactoe[x][2];

}

function resetar() {


}