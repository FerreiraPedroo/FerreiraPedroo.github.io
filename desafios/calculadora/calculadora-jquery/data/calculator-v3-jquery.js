/*
function _(_param) {
    class Query {
        constructor(_obj, _type) {
            this.objeto = _obj;
            this.typeObj = _type;
        }
        on(_receiverAction, _receiverCallBack) {
            if (this.typeObj == "#") {
                this.byId(_receiverAction, _receiverCallBack);
            } else if (this.typeObj == ".") {
                this.byClass(_receiverAction, _receiverCallBack);
            } else {
                this.byTagName(_receiverAction, _receiverCallBack);
            }
        }
        byId(_action, _callback) {
            if (_action == 'click') {
                let obj = document.getElementById(this.objeto);
                obj.addEventListener("click", _callback);
            }
        }
        byClass(_action, _callback) {
            if (_action == 'click') {
                let obj = document.getElementsByClassName(this.objeto);
                for (let i = 0; i < obj.length; i++) {
                    console.log(obj[i])
                    obj[i].addEventListener("click", _callback);
                }
            }
        }
        byTagName(_action, _callback) {
            if (_action == 'click') {
                let obj = document.getElementsByTagName(this.objeto);
                for (let i = 0; i < obj.length; i++) {
                    console.log(obj[i])
                    obj[i].addEventListener("click", _callback);
                }
            }
        }
    }
    if (_param[0] == "#" || _param[0] == ".") {
        return new Query(_param.slice(1, _param.length), _param[0]);
    } else {
        return new Query(_param);
    }
}
// pode ser um classe com função para mudar o tema da calculadora
//_("button").on('click', () => { console.log("OK") })
//$("#clear").on('click', () => { console.log("OK") })

//new Promise((res,rej)=>{res("OK")})
function myPromises(_callback) {
    class Res {
        constructor(_thresponse){
            this.thresponse = _thresponse
        }
        th(_call) {
            let thenCallBack = _call;
            thenCallBack(this.thresponse)
            return new Res(_call);
        }
        ca(_call) {
            let catchCallBack = _call;
            console.log("CATCH")
            catchCallBack(this.thresponse);
            return this;
        }
    }

    const promiseCallBack = _callback;
    let resrej;
    promiseCallBack(
        (_response) => {
            console.log("Calback prom: "+_response)
            resrej = new Res(_response)
        }, (_reject) => {
            resrej = new Res()
        })

        return resrej;
}

console.log(myPromises(
    (res, rej) => {  
        res("OK");
    }).th((_data)=>{
        console.log("th return:" +_data)
    }))//.ca(()=>{})


*/

//document.getElementById('clear').addEventListener("click",()=>{document.getElementById('column-display-lcd').innerText="NADA"},false)
//$('#clear').on('click',()=>{$('#column-display-lcd').text("NADA");})
//$(this).on('click',()=>{console.table(expression)})




$(document).ready(() => {

    class Calculator {
        #operand1;
        #operation
        #operand2;

        setOperand1(_operand1) {
            this.#operand1 = _operand1;
        }
        setOperand2(_operand2) {
            this.#operand2 = _operand2;
        }
        setOperation(_operation) {
            this.#operation = _operation;
        }
        getResult() {
            let result = 0;
            switch (this.#operation) {
                case "+":
                    result = this.#operand1 + this.#operand2;
                    break;
                case "-":
                    result = this.#operand1 - this.#operand2;
                    break;
                case "*":
                    result = this.#operand1 * this.#operand2;
                    break;
                case "/":
                    result = this.#operand1 / this.#operand2;
                    break;
                default:
                    result = "ERROR";
            }
            return result;
        }
    }
    let memory = [];
    let expression = ["", "", ""]
    const myCalculator = new Calculator;

    function lcdUpdate() {
        $('#column-display-lcd').html(expression[0] + " " + expression[1] + " " + expression[2]);
    }
    $('button[name=number]').on('click', function () {
        if (expression[1] == "") {
            expression[0][0] == "0" ? expression[0] = this.value : expression[0] += this.value;
        } else if (expression[1] != "") {
            expression[2][0] == "0" ? expression[2] = this.value : expression[2] += this.value;
        }
        lcdUpdate()
    })
    $('#point').on('click', () => {
        if (expression[0] != "" && expression[2] == "" && expression[0].indexOf(".") == -1) {
            expression[0] += ".";
        } else if (expression[2] != "" && expression[2].indexOf(".") == -1) {
            expression[2] += ".";
        }
        lcdUpdate()
    })
    $('button[name=operator]').on('click', function () {
        if (expression[0] != "" && expression[0] != "." && expression[0] != "-") {
            expression[1] = this.value;
        }
        lcdUpdate()
    })
    $('#clear').on('click', () => {
        expression = ["", "", ""];
        $("#column-display-lcd").text("");
    })
    $('#remover').on('click', () => {
        if (expression[2] != "") {
            expression[2] = expression[2].slice(0, expression[2].length - 1);
            console.log("Seletor: 1");
        } else if (expression[1] != "") {
            expression[1] = "";
            console.log("Seletor: 2");
        } else if (expression[0] != "") {
            expression[0] = expression[0].slice(0, expression[0].length - 1);
            console.log("Seletor: 3");
        }
        lcdUpdate()
    })
    $('#equal').on('click', () => {
        console.log(expression);
        if (expression[2] != "" && expression[2] != "0") {

            myCalculator.setOperand1(parseFloat(expression[0]));
            myCalculator.setOperation(expression[1]);
            myCalculator.setOperand2(parseFloat(expression[2]));

            expression = [`${myCalculator.getResult()}`, "", ""];
            $("#column-display-lcd").text(myCalculator.getResult());

        } else if (expression[1] != "" && expression[2] == "") {
            console.log("2x2")
            myCalculator.setOperand1(parseFloat(expression[0]));
            myCalculator.setOperation(expression[1]);
            myCalculator.setOperand2(parseFloat(expression[0]));

            expression = [`${myCalculator.getResult()}`, expression[1], ""];
            $("#column-display-lcd").text(myCalculator.getResult());

        }
    })
    $('#positive-negative').on('click', () => {
        console.log("THIS")
        if (expression[0][0] != "-" && expression[0] != "" && expression[1] == "" && expression[2] == "") {
            expression[0] = "-" + expression[0];
        } else if (expression[0][0] == "-" && expression[0] != "" && expression[1] == "" && expression[2] == "") {
            expression[0] = expression[0].slice(1, expression[0].length);
        } else if (expression[2][0] != "-" && expression[2][0] != undefined && expression[1] != "" && expression[0] != "") {
            console.log(expression[2][0])
            expression[2] = "-" + expression[2];
        } else if (expression[2][0] == "-" && expression[2][0] != "" && expression[1] != "" && expression[0] != "") {
            expression[2] = expression[2].slice(1, expression[2].length);
        }
        lcdUpdate()
    })

})






    // removendo o sinal de menos, primeiro é digitado o numero e depois é escolhido se é negativo ou positivo
    // por padrão é positivo o numero.
    // alterado no html para o name="operator" no sinal de menos.
/*$('#minus').on('click', () => {
    if (expression[0] == "") {
        expression[0] += "-";
        console.log(expression)
    } else if (expression[0] != "-" && expression[0] != ".") {
        expression[1] = "-";
    }
    lcdUpdate()
})*/