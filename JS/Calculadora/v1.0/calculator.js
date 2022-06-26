class Calculator {
    constructor(_operand1, _operation, _operand2) {
        this.operand1;
        this.operand2;
        this.operation;
        console.log(_operand1 + " - " + _operation + " - " + _operand2)
    }

    setOperand1(_operand1) {
        console.log("Operand1: " + _operand1)
        if (_operand1 != Number) {
            this.operand1 = parseFloat(_operand1);
            console.log("SetOperand1 = OK:" + _operand1);

        } else {
            return false;
        }
    }

    setOperand2(_operand2) {
        console.log("Operand2: " + _operand2)
        if (_operand2 != Number) {
            this.operand2 = parseFloat(_operand2);
            console.log("SetOperand1 = OK:" + _operand2);
        } else {
            return false;
        }

    }

    setOperation(_operation) {
        console.log("Oeration: OK:" + _operation)
        if (_operation == "+" || _operation == "-" || _operation == "/" || _operation == "*") {
            this.operation = _operation;

        } else {
            return "ERROR";
        }
    }

    getResult() {
        let result = 0;
        switch (this.operation) {
            case "+":
                result = (this.operand1 + this.operand2);
                break;

            case "-":
                result = this.operand1 - this.operand2;
                break;

            case "*":
                result = this.operand1 * this.operand2;
                break;

            case "/":
                result = this.operand1 / this.operand2;
                break;

            default:
                return "ERROR2";
                break;
        }
        return result;
    }
    clearCalculator() {
        this.operand1 = 0;
        this.operand2 = 0;
        //        this.setOperation = "";
        this.operation = "";
        return "CLEAR";
    }

}

//-----------------------------------------------------------------------------------------------------//
let expression = ["0", "", ""]
let select = 0;
let myCalculator = new Calculator;

function digit(_value) {

    //inserindo o primeiro numero na posição "0" do array - primeiro operador ou iniciando com numero negativo
    if ((typeof _value == "number" || _value == "-") && select == 0 && expression[0] == "0") {
        expression[0] = `${_value}`;
        //inserindo sinal de negativo no primeiro operado
    } else if (_value == "-" && select == 0 && expression[0].length == 0) {
        expression[0] += _value;

    } else if (select == 0 && typeof _value == "number") {
        expression[0] += _value;

        //inserindo o operador na posição "1" do array - operador
    } else if (select == 0 && expression[0].length > 0 && expression[0] != "-" && (_value == "*" || _value == "/" || _value == "+" || _value == "-")) {
        expression[1] = _value;
        select = 1;

        //mudando operador na posição "1" do array antes de inserir o segundo operando
    } else if (select == 1 && (_value == "*" || _value == "/" || _value == "+" || _value == "-")) {
        expression[1] = _value;

        //inserindo numeros na posição "2" do array - segundo operador
    } else if ((select == 1 || select == 2) && typeof _value == "number" && expression[1] != "") {
        expression[2] += _value;
        select = 2;


    } else if ((select == 1 && typeof _value == "number") && expression[1] == "") {
        expression[0] = `${_value}`;
        select = 0;

        //apagando
    } else if (select == 0 && _value == "⇦") {
        expression[0] = expression[0].slice(0, expression[0].length - 1);

    } else if (select == 1 && _value == "⇦" && expression[2] == "") {
        //expression[0] = expression[0].slice(0, expression[0].length - 1);
        expression[1] = "";
        select = 0;

    } else if (select == 1 && _value == "⇦" && expression[2] != "") {
        expression[1] = "";
        select = 0;
    } else if (select == 2 && _value == "⇦" && expression[2] != "") {
        expression[2] = expression[2].slice(0, expression[2].length - 1);
    } else if (select == 2 && _value == "⇦" && expression[2] == "") {
        expression[1] = "";
        select = 0;
    } else if (_value == "C") {
        expression[0] = "0";
        expression[1] = "";
        expression[2] = "";
        select = 0;
        myCalculator.clearCalculator;
        console.log(myCalculator.clearCalculator());
    } else if (_value == "=" && expression[2] != "") {
        if (expression[2] == 0){
            expression[0] = "0";
            expression[1] = "";
            expression[2] = ""; 
            select = 0;
        }else{         

        myCalculator.setOperand1(expression[0]);
        myCalculator.setOperation(expression[1]);
        myCalculator.setOperand2(expression[2]);
        expression[0] = `${myCalculator.getResult()}`;
        select = 0;
        expression[1] = "";
        expression[2] = "";            
        }
    }

    //limitando um ponto por operando.
    if (select == 0 && _value == "." && expression[0].indexOf(".") == -1) {
        expression[0] += _value;
    } else if (select == 2 && _value == "." && expression[2].indexOf(".") == -1) {
        expression[2] += _value;
    }

    console.log(expression);
    console.log("Select: " + select);
    document.getElementById("column-display-lcd").innerText = expression[0] + " " + expression[1] + " " + expression[2];
}
//-----------------------------------------------------------------------------------------------------//