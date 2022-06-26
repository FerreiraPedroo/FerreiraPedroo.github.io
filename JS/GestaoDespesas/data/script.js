function userLogin() {
    let userLogin = document.getElementById('form-input-user')
    let passwordLogin = document.getElementById('form-input-password')
    let errorMessageLogin = document.getElementById('message-error')
    let buttonLogin = document.getElementById('form-button-send')
    let jsonLogin = `{"user":"${userLogin.value}","password":"${passwordLogin.value}"}`;

    userLogin.setAttribute("disabled", "disabled");
    passwordLogin.setAttribute("disabled", "disbled");
    buttonLogin.setAttribute("disabled", "disbled");
    errorMessageLogin.innerHTML = `&nbsp`;

    xhttpLogin = new XMLHttpRequest();
    xhttpLogin.onreadystatechange = () => {
        console.log("STATE: " + xhttpLogin.readyState)

        if (xhttpLogin.readyState == 4 && xhttpLogin.status == 200) {
            let xhttpLoginMessageText = JSON.parse(xhttpLogin.responseText);
            console.log(xhttpLoginMessageText);
            sessionStorage.setItem("id", xhttpLoginMessageText.id);
            sessionStorage.setItem("user", xhttpLoginMessageText.user);
            sessionStorage.setItem("key", xhttpLoginMessageText.key);
            sessionStorage.setItem("time", xhttpLoginMessageText.time);
            console.log(sessionStorage)
            console.log(sessionStorage.getItem("key"))
            location.replace('http://127.0.0.1:3000/painel.html')

        } else if (xhttpLogin.readyState == 4 && xhttpLogin.status >= 300) {
            userLogin.removeAttribute("disabled", "disabled");
            passwordLogin.removeAttribute("disabled", "disbled");
            buttonLogin.removeAttribute("disabled", "disbled");
            errorMessageLogin.innerHTML = JSON.parse(xhttpLogin.responseText).LOGIN;
        }
    }

    xhttpLogin.open('POST', '/login')
    xhttpLogin.setRequestHeader("Content-Type", "application/json");
    xhttpLogin.send(jsonLogin);
}
function newUser() {
    let nameInput = document.getElementById('form-input-name');
    let emailInput = document.getElementById('form-input-email');
    let phoneInput = document.getElementById('form-input-phone');
    let passw1Input = document.getElementById('form-register-input-password');
    let passw2Input = document.getElementById('form-register-input-password-repeat');
    let buttonSend = document.getElementById('form-register-button-send');
    let divMessage = document.getElementById("register-message-error");

    function registerFromEnableDisable(_code) {
        if (_code == 0) {
            nameInput.removeAttribute("disabled", "disabled");
            emailInput.removeAttribute("disabled", "disabled");
            phoneInput.removeAttribute("disabled", "disabled");
            passw1Input.removeAttribute("disabled", "disabled");
            passw2Input.removeAttribute("disabled", "disabled");
            buttonSend.removeAttribute("disabled", "disabled");
        } else if (_code == 1) {
            nameInput.setAttribute("disabled", "disabled");
            emailInput.setAttribute("disabled", "disabled");
            phoneInput.setAttribute("disabled", "disabled");
            passw1Input.setAttribute("disabled", "disabled");
            passw2Input.setAttribute("disabled", "disabled");
            buttonSend.setAttribute("disabled", "disabled");
        }
    }

    let xhttpNewUserMessageText;

    const xhttpNewUser = new XMLHttpRequest();
    xhttpNewUser.onreadystatechange = () => {
        console.log("STATE: " + xhttpNewUser.readyState);
        xhttpNewUser.responseText != "" ? xhttpNewUserMessageText = JSON.parse(xhttpNewUser.responseText) : "";
        console.log(xhttpNewUserMessageText);

        if (xhttpNewUser.readyState == 4 && xhttpNewUser.status == 200) {
            divMessage.innerHTML = xhttpNewUserMessageText.register;
            //registerFromEnableDisable(0);
        } else if (xhttpNewUser.readyState == 4 && xhttpNewUser.status >= 300) {
            divMessage.innerHTML = xhttpNewUserMessageText.register;
            registerFromEnableDisable(0);
        }
    }

    if (passw1Input.value == passw2Input.value && passw1Input.value.length != 0 && nameInput.value != "" && emailInput.value != "") {
        registerFromEnableDisable(1);
        divMessage.innerHTML = "INFORMAÇÕES ENVIADAS... AGUARDE...";
        xhttpNewUser.open('POST', '/register')
        xhttpNewUser.setRequestHeader("Content-Type", "application/json");
        xhttpNewUser.send(`[{"type":"users"},{"id":"","user":"${nameInput.value}","email":"${emailInput.value}","phone":"${phoneInput.value}","password":"${passw1Input.value}"}]`);
    } else if (nameInput.value == "") {
        divMessage.innerHTML = "O NOME NÃO PODE FICAR EM BRANCO";
        registerFromEnableDisable(0);
    } else if (emailInput.value == "") {
        divMessage.innerHTML = "O EMAIL NÃO PODE FICAR EM BRANCO";
        registerFromEnableDisable(0);
    } else if (passw1Input.value != passw2Input.value) {
        divMessage.innerHTML = "AS SENHAS NÃO IGUAIS";
        registerFromEnableDisable(0);
    } else if (passw1Input.value.length == 0) {
        divMessage.innerHTML = "A SENHA NÃO PODE FICAR EM BRANCO";
        registerFromEnableDisable(0);
    }

}



function newUserPage() {
    document.getElementById("center").innerHTML = `
    <span id="register-head">CADASTRAR NOVO USUARIO</span>
    <div id="register-card-list">
        <article id="register-card">
        <div id="register-card-head"></div>
        <div id="register-card-keydados">
            <div id=register-card-key-list>
            <div class="register-card-key">ID</div>
            <div class="register-card-key">NOME</div>
            <div class="register-card-key">EMAIL</div>
            <div class="register-card-key">TELEFONE</div>
            <div class="register-card-key">SENHA</div>
            <div class="register-card-key">REPETIR SENHA</div>
            </div>
            <div id=register-card-dados-list>
            <input type="text" id="form-input-id" class="register-card-dados" disabled>
            <input type="text" id="form-input-name" class="register-card-dados">
            <input type="email" id="form-input-email" class="register-card-dados">
            <input type="tel" id="form-input-phone" class="register-card-dados">
            <input type="password" id="form-register-input-password" class="register-card-dados">
            <input type="password" id="form-register-input-password-repeat" class="register-card-dados">
            </div>
        </div>
        <div class="register-card-message" id="register-message-error"></div>
        <div class="register-card-foot-client">
        <button id="form-register-button-send" class="register-card-foot-client-save" onclick="newUser()">SALVAR</button>
        <button id="form-register-button-back" class="register-card-foot-client-save" onclick="location.href = document.referrer">VOLTAR</button>
        </div>
        </article>
    </div>`;
}
function allUserPage() {
    const xhttpAllUser = new XMLHttpRequest();
    xhttpAllUser.open("GET", "/query/users", true);
    xhttpAllUser.send();

    xhttpAllUser.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let recListServidor = JSON.parse(this.responseText);
            let element;
            let elementAll = "";
            console.log(recListServidor);
            elementAll = `<span id="register-head">TODOS USUÁRIOS</span>`;
            for (i = 0; i < recListServidor.length; i++) {
                element = recListServidor[i];
                elementAll += `
                <div id="register-card-list">
                    <article id="register-card">
                    <div id="register-card-head"></div>
                    <div id="register-card-keydados">
                        <div id=register-card-key-list>
                        <div class="register-card-key">ID</div>
                        <div class="register-card-key">NOME</div>
                        <div class="register-card-key">EMAIL</div>
                        <div class="register-card-key">TELEFONE</div>
                        </div>
                        <div id=register-card-dados-list>
                        <span id="form-input-id-${element["id"]}" class="register-card-dados">${element["id"]}</span>
                        <span id="form-input-name-${element["id"]}" class="register-card-dados">${element["user"]}</span>
                        <span id="form-input-email-${element["id"]}" class="register-card-dados">${element["email"]}</span>
                        <span id="form-input-phone-${element["id"]}" class="register-card-dados">${element["phone"]}</span>
                        </div>
                    </div>
                    <div class="register-card-message" id="message-error-${element["id"]}"></div>
                    <div class="register-card-foot-client">
                    <button class="register-card-foot-client-save" id="excluir-${element["id"]}" onclick="deleteUser(this)">Excluir</button>&nbsp;
                    <button class="register-card-foot-client-save" id="alterar-${element["id"]}" onclick="updateUserPage(this)">Alterar</button>&nbsp;
                    </div>
                    </article>
                </div><br>`
            }
            //document.getElementById("register-head").innerText = `CLIENTES CADASTRADOS`;
            document.getElementById("section").innerHTML = elementAll;
        }
    }
}
function allCategoryPage() {
    const xhttpAllCategory = new XMLHttpRequest();
    xhttpAllCategory.open("GET", "/query/categories", true);
    xhttpAllCategory.send();

    xhttpAllCategory.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let recListServidor = JSON.parse(this.responseText);
            let element;
            let elementAll = "";
            console.log(recListServidor);
            document.getElementById("section").innerHTML = `
            <div>
            <div id="register-categoryall-head">CONSULTAR CATEGORIAS</div>
                <div id="expense-menu-filter">
                    <input type="text" id="search-category" class="input-head" placeholder="categoria">
                    <input type="image" class="input-head" src="./data/img/pesquisar.svg" alt="Pesquisar" onclick="">
                </div>
                <div id="expense-head">
                    <div id="expense-head-id">ID</div>
                    <div id="expense-head-category">CATEGORIA</div>
                </div>
                <div id="expense-list">
                </div>
            </div>`;

            for (i = 0; i < recListServidor.length; i++) {
                element = recListServidor[i];
                elementAll += `
                <div class="expense-list-dados">
                    <div class="expense-id">${recListServidor[i].id}</div>
                    <div class="expense-category">${recListServidor[i].category}</div>

                </div>`
            }

            document.getElementById("section").innerHTML += elementAll;


        }
    }

}
function allExpensePage() {
    const xhttpAllExpense = new XMLHttpRequest();
    xhttpAllExpense.open("GET", "/query/expenses", true);
    xhttpAllExpense.send();

    xhttpAllExpense.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let recListServidor = JSON.parse(this.responseText);
            let element;
            let elementAll = "";
            console.log(recListServidor);

            document.getElementById("section").innerHTML = `
            <div>
            <div id="register-categoryall-head">CONSULTAR DESPESAS</div>
                <div id="expense-menu-filter">
                    <input type="text" id="search-user" class="input-head" placeholder="usuario">
                    <input type="text" id="search-category" class="input-head" placeholder="categoria">
                    <input type="image" class="input-head" src="./data/img/pesquisar.svg" alt="Pesquisar" onclick="">
                </div>
                <div id="expense-head">
                    <div id="expense-head-id">ID</div>
                    <div id="expense-head-date">DATA LANÇAMENTO</div>
                    <div id="expense-head-dateexpire">DATA VENCIMENTO</div>
                    <div id="expense-head-user">USUARIO</div>
                    <div id="expense-head-category">CATEGORIA</div>
                    <div id="expense-head-valor">VALOR R$</div>
                </div>
                <div id="expense-list">
                </div>
            </div>`;

            for (i = 0; i < recListServidor.length; i++) {
                element = recListServidor[i];
                elementAll += `
                <div class="expense-list-dados">
                    <div class="expense-id">${recListServidor[i].id}</div>
                    <div class="expense-date">${recListServidor[i].date}</div>
                    <div class="expense-dateexpire">${recListServidor[i].dateexpire}</div>
                    <div class="expense-user">${recListServidor[i].user}</div>
                    <div class="expense-category">${recListServidor[i].category}</div>
                    <div class="expense-value">R$ ${recListServidor[i].value}</div>
                </div>`
            }

            document.getElementById("section").innerHTML += elementAll;
        }
    }
}



function updateUserPage(_updateUserHTMLID) {
    // let thisID = _updateUserHTMLID.getAttribute("id").slice(8);
    let thisData = {
        "id": "ID",
        "user": "USER",
        "email": "EMAIL",
        "phone": "PHONE"
    }

    console.log(thisData)
    document.getElementById("section").innerHTML = `
    <span id="register-head">ALTERAR DADOS</span>
    <div id="register-card-list">
        <article id="register-card">
        <div id="register-card-head"></div>
        <div id="register-card-keydados">
            <div id=register-card-key-list>
            <div class="register-card-key">ID</div>
            <div class="register-card-key">NOME</div>
            <div class="register-card-key">EMAIL</div>
            <div class="register-card-key">TELEFONE</div>
            <div class="register-card-key">SENHA</div>
            <div class="register-card-key">REPETIR SENHA</div>
            </div>
            <div id=register-card-dados-list>
            <input type="text" id="form-input-id" class="register-card-dados" disabled>
            <input type="text" id="form-input-name" class="register-card-dados">
            <input type="email" id="form-input-email" class="register-card-dados">
            <input type="tel" id="form-input-phone" class="register-card-dados">
            <input type="password" id="form-register-input-password" class="register-card-dados">
            <input type="password" id="form-register-input-password-repeat" class="register-card-dados">
            </div>
        </div>
        <div class="register-card-message" id="register-message-error"></div>
        <div class="register-card-foot-client">
        <button id="form-register-button-send" class="register-card-foot-client-save" onclick="newUser()">SALVAR</button>
        <button id="form-register-button-back" class="register-card-foot-client-save" onclick="location.href = document.referrer">VOLTAR</button>
        </div>
        </article>
    </div>`;
}
function updateUser(_updateUserID) {

    let thisID = _updateUserID.getAttribute("id");
    let idInput = document.getElementById(`form-input-id-${thisID}`);
    let nameInput = document.getElementById(`form-input-name-${thisID}`);
    let emailInput = document.getElementById(`form-input-email-${thisID}`);
    let phoneInput = document.getElementById(`form-input-phone-${thisID}`);
    let savebuttonSend = document.getElementById(`${thisID}`);
    let divMessage = document.getElementById(`message-error`);

    function registerFromEnableDisable(_code) {
        if (_code == 0) {
            nameInput.removeAttribute("disabled", "disabled");
            emailInput.removeAttribute("disabled", "disabled");
            phoneInput.removeAttribute("disabled", "disabled");
            savebuttonSend.removeAttribute("disabled", "disabled");
        } else if (_code == 1) {
            nameInput.setAttribute("disabled", "disabled");
            emailInput.setAttribute("disabled", "disabled");
            phoneInput.setAttribute("disabled", "disabled");
            savebuttonSend.setAttribute("disabled", "disabled");
        }
    }
    registerFromEnableDisable(1)


    new Promise((resolve, reject) => {
        console.log("PROMISE UPDATE USER")
        const xhttpUpdateUser = new XMLHttpRequest();

        xhttpUpdateUser.open('PUT', '/update')
        xhttpUpdateUser.setRequestHeader("Content-Type", "application/json");
        xhttpUpdateUser.send(`{"id":${idInput.value},"user":"${nameInput.value}","email":"${emailInput.value}","phone":"${phoneInput.value}"}`);

        xhttpUpdateUser.onreadystatechange = () => {
            console.log("STATE: " + xhttpUpdateUser.readyState)

            if (xhttpUpdateUser.readyState == 4 && xhttpUpdateUser.status == 200) {
                console.log(JSON.parse(xhttpUpdateUser.responseText));
                console.log("DADOS ALTERADOS COM SUCCESSO")
                resolve();

            } else if (xhttpUpdateUser.readyState == 4 && xhttpUpdateUser.status >= 300) {
                reject(xhttpUpdateUser.responseText)

            }
        }

    }).then(() => {
        divMessage.innerHTML = "DADOS ALTERADOS COM SUCCESSO";
    }).catch((_errorMessage) => {
        divMessage.innerHTML = JSON.parse(_errorMessage)["UPDATE"];
        registerFromEnableDisable(0);
    })
}



function deleteCategory(_categoryHtmlID) {
    console.log("Delete category: " + _categoryHtmlID.getAttribute("id").slice(8));

    new Promise((resolve, reject) => {
        console.log("DELETE PROMISE");

        const sendCategoryDelete = _categoryHtmlID.getAttribute("id").slice(8);
        console.log(sendCategoryDelete);
        const xhttpDel = new XMLHttpRequest();
        xhttpDel.open("DELETE", "/delete/category/" + sendCategoryDelete, true);
        xhttpDel.send();

        xhttpDel.onreadystatechange = function () {
            console.log(this.readyState)
            console.log(this.status)

            if (this.readyState == 4 && this.status == 200) {
                resolve()
            } else if (this.readyState == 4 && this.status >= 300) {
                reject(sendCategoryDelete)
            }

        }

    }).then(() => {
        allCategory();

    }).catch((_userId) => {
        console.log("ERRO: NÃO FOI POSSIVEL EXCLUIR A CATEGORIA")
        document.getElementById(`message-error-${_userId}`).innerHTML = "NÃO FOI POSSIVEL EXCLUIR A CATEGORIA";
    });

}
function deleteUser(_deleteClientHtmlID) {
    console.log("Delete user: " + _deleteClientHtmlID.getAttribute("id").slice(8));

    new Promise((resolve, reject) => {
        console.log("DELETE PROMISE")

        const sendUserDelete = _deleteClientHtmlID.getAttribute("id").slice(8);
        const xhttpDel = new XMLHttpRequest();
        xhttpDel.open("DELETE", "/delete/user/" + sendUserDelete, true);
        xhttpDel.send();

        xhttpDel.onreadystatechange = function () {
            console.log(this.readyState)
            console.log(this.status)

            if (this.readyState == 4 && this.status == 200) {
                console.log("SEND DELETE USER: " + sendUserDelete)
                resolve()
            } else if (this.readyState == 4 && this.status >= 300) {
                console.log(sendUserDelete)
                reject(sendUserDelete)
            }

        }

    }).then(() => {
        allUserPage();

    }).catch((_userId) => {
        console.log(_userId)
        console.log("ERRO: NÃO FOI POSSIVEL EXCLUIR O USUÁRIO")
        document.getElementById(`message-error-${_userId}`).innerHTML = "NÃO FOI POSSIVEL EXCLUIR O USUÁRIO";
    });

}



// OK - create: ? | update: 14/01/2022
function newExpensePage() {
    let userId = sessionStorage.getItem("id");

    new Promise((resolve, reject) => {
        // console.log("PROMISE NEW EXPENSE")
        const xhttpUpdateUser = new XMLHttpRequest();

        xhttpUpdateUser.open('GET', `/query/new-expenses/user/${userId}`)
        xhttpUpdateUser.setRequestHeader("Content-Type", "application/json");
        xhttpUpdateUser.send();

        xhttpUpdateUser.onreadystatechange = () => {
            // console.log("STATE: " + xhttpUpdateUser.readyState)

            if (xhttpUpdateUser.readyState === 4 && xhttpUpdateUser.status === 200) {
                console.log("DADOS RECEBIDOS", JSON.parse(xhttpUpdateUser.responseText));
                resolve(JSON.parse(xhttpUpdateUser.responseText));

            } else if (xhttpUpdateUser.readyState === 4 && xhttpUpdateUser.status >= 300) {
                reject(xhttpUpdateUser.responseText);
            }
        }

    }).then((_listCategory) => {
        let newCategoryHtml = `
        <p id="register-head">CADASTRAR NOVA DESPESA</p>
        <div id="register-card-list">
            <div id="register-card">
            <div id="register-card-head"></div>
            <div id="register-card-keydados">
                <div id=register-card-key-list>
                <div class="register-card-key">ID</div>
                <div class="register-card-key">DATA LANÇAMENTO</div>
                <div class="register-card-key">DATA VENCIMENTO</div>
                <div class="register-card-key">CATEGORIA</div>
                <div class="register-card-key">VALOR R$</div>
                </div>
                <div id=register-card-dados-list>
                <input type="text" id="form-input-id" class="register-card-dados" disabled>
                <input type="date" id="form-input-date" class="register-card-dados" value="${new Date().toLocaleDateString().split("/").reverse().join("-")}" >
                <input type="date" id="form-input-date-expire" class="register-card-dados" >
                <select id="form-input-category" name="select">
        `
        _listCategory.forEach((value) => {
            newCategoryHtml += `<option value="${value.id}">${value.category}</option>`
        })
        newCategoryHtml += `</select>
                <input type="text" id="form-register-input-value" class="register-card-dados" onKeyUp="maskValue(this)" value="R$ 0,00">
                    </div>
            </div>
            <div class="register-card-message" id="register-message-error"></div>
            <div class="register-card-foot-client-expense">
            <button id="form-register-button-send" class="register-card-foot-client-save" onclick="newExpense()">SALVAR</button>
            <!--<button id="form-register-button-back" class="register-card-foot-client-save" onclick="location.href = document.referrer">VOLTAR</button> -->
            </div>
            </div>
        </div>
        `;
        document.getElementById("section").innerHTML = newCategoryHtml

    }).catch((_errorMessage) => {
        document.getElementById("section").innerHTML = JSON.parse(_errorMessage);
        registerFromEnableDisable(0);
    })
}
// OK - create: ? | update: 14/01/2022
function newExpense() {
    const userId = sessionStorage.getItem("id");
    const dateInput = document.getElementById('form-input-date');
    const dateExpireInput = document.getElementById('form-input-date-expire');
    const categoryInput = document.getElementById('form-input-category');
    const valueMoney = document.getElementById('form-register-input-value');
    const buttonSend = document.getElementById('form-register-button-send');
    const divMessage = document.getElementById("register-message-error");

    console.log(dateInput.value);
    console.log(dateExpireInput.value);
    console.log(categoryInput.options[categoryInput.selectedIndex].value);


    function registerFromEnableDisable(_code) {
        if (_code == 0) {
            dateInput.removeAttribute("disabled", "disabled");
            dateExpireInput.removeAttribute("disabled", "disabled");
            categoryInput.removeAttribute("disabled", "disabled");
            valueMoney.removeAttribute("disabled", "disabled");
            // buttonSend.removeAttribute("disabled", "disabled");
        } else if (_code == 1) {
            dateInput.setAttribute("disabled", "disabled");
            dateExpireInput.setAttribute("disabled", "disabled");
            categoryInput.setAttribute("disabled", "disabled");
            valueMoney.setAttribute("disabled", "disabled");
            // buttonSend.setAttribute("disabled", "disabled");
        }
    }

    let xhttpNewExpenseMessageText = "";

    const xhttpNewExpense = new XMLHttpRequest();
    xhttpNewExpense.onreadystatechange = () => {
        xhttpNewExpense.responseText !== "" ? xhttpNewExpenseMessageText = JSON.parse(xhttpNewExpense.responseText) : "";

        if (xhttpNewExpense.readyState === 4 && xhttpNewExpense.status === 200) {
            divMessage.innerHTML = xhttpNewExpenseMessageText.register;
            console.log(xhttpNewExpenseMessageText.register)
            registerFromEnableDisable(0);
        } else if (xhttpNewExpense.readyState === 4 && xhttpNewExpense.status >= 300) {
            divMessage.innerHTML = xhttpNewExpenseMessageText.register;
            registerFromEnableDisable(0);
        }
    }

    if (valueMoney.value !== "" && dateInput.value !== "" && dateExpireInput.value !== "") {
        registerFromEnableDisable(1);
        divMessage.innerHTML = "INFORMAÇÕES ENVIADAS... AGUARDE...";
        xhttpNewExpense.open('POST', '/register')
        xhttpNewExpense.setRequestHeader("Content-Type", "application/json");
        xhttpNewExpense.send(`[{"type":"expenses"},{"id":"","date":"${dateInput.value}","date-expire":"${dateExpireInput.value}","user_id":${userId},"category_id":"${categoryInput.options[categoryInput.selectedIndex].value}","value":"${floatJSValue("form-register-input-value")}"}]`);

    } else if (dateInput.value === "") {
        divMessage.innerHTML = "DATA DE LANÇAMENTO NÃO PODE FICAR EM BRANCO";
        registerFromEnableDisable(0);
    } else if (dateExpireInput.value === "") {
        divMessage.innerHTML = "DATA DE VENCIMENTO NÃO PODE FICAR EM BRANCO";
        registerFromEnableDisable(0);
    } else if (valueMoney.value === "") {
        divMessage.innerHTML = "O VALOR NÃO PODE FICAR EM BRANCO";
        registerFromEnableDisable(0);
    }
}
// OK - create: 14/01/2022
const maskValue = (noHTML) => {
    (() => {
        obj = noHTML;
        v = obj.value;
        v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
        v = v.replace(/(\d{2})$/, ",$1"); //Coloca a virgula
        v = v.replace(/(\d+)(\d{3},\d{2})$/g, "$1.$2"); //Coloca o primeiro ponto
        v = v.length <= 1 ? "0,00" + v : v;
        v0 = v[0] === "," ? "0" + v : v;
        v1 = v0[0] === "0" && v0.length === 5 ? v0.slice(1, v0.length) : v0;
        v2 = v1[0] === "," && v1.length === 7 ? "0" + v1 : v1;
        v3 = v2[v2.length - 3] === "," && v2.length >= 8 && v2[0] === "0" ? v0.slice(1, v2.length) : v2;
        v4 = "R$ " + v3;
        obj.value = v4;
    })()
}
// OK - create: 14/01/2022
const floatJSValue = (nodeHTMLID) => {
    obj = document.getElementById(nodeHTMLID);
    v = obj.value;
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{2})$/, ".$1"); //Coloca a ponto do float
    return v
}






// ---- CATEGORIA -----------------------------------------------------------
// OK - create: ? | update: 13/01/2022
function newCategoryPage() {
    document.getElementById("section").innerHTML = `
    <p id="register-category-head">CADASTRAR NOVA CATEGORIA</p>
    <div id="register-category-card-list">
        <article id="register-category-card">
        <div id="register-category-card-head"></div>
        <div id="register-category-card-keydados">

            <div id="register-category-card-key-list">
            <span id="register-category-card-key">ID</span>
            <span id="register-category-card-key">CATEGORIA</span>
            </div>

            <div id="register-category-card-dados-list">
            <input type="text" id="form-input-id" class="register-category-card-dados" disabled>
            <input type="text" id="form-input-category" class="register-category-card-dados" onkeyup="verify(this)" onfocus="resetCategoryInput()">
            </div>

        </div>
        <div id="message-register-error"></div>
        <div id="register-category-card-foot-client"><button id="form-button-send" onclick="newCategory()">SALVAR</button></div>
        </article>
    </div>`;
}
// OK - create: ? | update: 13/01/2022
function newCategory() {
    const categoryName = document.getElementById("form-input-category");
    const divMessage = document.getElementById("message-register-error");
    const buttonSend = document.getElementById('form-button-send');

    categoryName.setAttribute("disabled", "");
    buttonSend.setAttribute("disabled", "");

    const xhttpNewCategory = new XMLHttpRequest();
    xhttpNewCategory.open("POST", "/register");
    xhttpNewCategory.setRequestHeader("Content-Type", "application/json");
    xhttpNewCategory.send(`[{"type":"categories"},{"category":"${categoryName.value.trim()}","user_id":${sessionStorage.getItem("id")}}]`);

    let xhttpNewCategoryMessageText;

    xhttpNewCategory.onreadystatechange = () => {
        console.log("STATE: " + xhttpNewCategory.readyState);
        xhttpNewCategory.responseText !== "" ? xhttpNewCategoryMessageText = JSON.parse(xhttpNewCategory.responseText) : console.log(xhttpNewCategory.responseText);

        if (xhttpNewCategory.readyState == 4 && xhttpNewCategory.status === 200) {
            console.log(xhttpNewCategoryMessageText);

            categoryName.value = "";
            categoryName.removeAttribute("disabled");
            buttonSend.removeAttribute("disabled");
            divMessage.innerHTML = xhttpNewCategoryMessageText.register;

        } else if (xhttpNewCategory.readyState == 4 && xhttpNewCategory.status >= 300) {
            //divMessage.innerHTML = xhttpNewCategoryMessageText.register;
            divMessage.innerHTML = xhttpNewCategoryMessageText.register;
            categoryName.removeAttribute("disabled", "disabled");
            buttonSend.removeAttribute("disabled", "disabled");
        }
    }

}
// OK - create: 14/01/2022
function verifyCategory(_this) {
    const inputHTML = _this;
    const buttonSend = document.getElementById('form-button-send');

    if (inputHTML.value.trim().length !== 0) {
        buttonSend.removeAttribute("disabled", "disabled");
    } else {
        buttonSend.setAttribute("disabled", "");
    }
}
// OK - create: 13/01/2022
function resetCategoryInput() {
    document.getElementById("message-register-error").innerHTML = "";
}



// CIFRA DE CESAR
//caesarChiper()
function caesarChiper() {
    //let userPassword = document.getElementById('form-input-password');
    let userPassword = ".!#$ --- ýþÿ - ;\"<=>";
    let alphabetUTF8 = ".!#$%& ()*+,-/\\0123456789:;\"<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
    console.log(alphabetUTF8.length)
    let userPasswordCoded = "";
    let userPasswordDecoded = "";
    // CIFRA DE CESAR - CODIFICANDO
    for (u = 0; u < userPassword.length; u++) {
        for (i = 0; i < alphabetUTF8.length; i++) {
            if (userPassword[u] == alphabetUTF8[i]) {
                i + 3 >= 188 ? userPasswordCoded += alphabetUTF8[(i + 3) - 188] : userPasswordCoded += alphabetUTF8[i + 3];
                console.log(userPasswordCoded)
            }
        }
    }
    // CIFRA DE CESAR - DESIFRANDO
    for (u = 0; u < userPasswordCoded.length; u++) {
        for (i = 0; i < alphabetUTF8.length; i++) {
            if (userPasswordCoded[u] == alphabetUTF8[i]) {
                i - 3 < 0 ? userPasswordDecoded += alphabetUTF8[(i - 3) + 188] : userPasswordDecoded += alphabetUTF8[i - 3];
                console.log(userPasswordDecoded)
            }
        }
    }

}
