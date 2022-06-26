// CARREGA O MODULO 'express' E EXECUTA.
const express = require('express');
const app = express();

// CARREGA O MODULO 'fs' PARA TRATAMENDO DE ARQUIVOS
const fs = require('fs');

// CONFIGURAÇÃO DO EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('.'));

// DIRETORIO DO SISTEMA
const PATH_DIR = "./";

// FUNÇÃO PARA LER ARQUIVOS E RETORNAR SEU CONTEÚDO - OK
/*
    Função para ler dados no arquivo.
    Retorna uma Promise, (.then(dados do arquivo).catch(erro))
    readFile(  
            _dir = nome do diretorio,
            _name = nome do arquivo com extenção ex:(".txt"),
            ) 
*/
function readFile(_dir, _file) {
    return new Promise((resolve, reject) => {
        fs.readFile(_dir + _file, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

/*
    Função para gravar dados no formato JSON.
    Retorna uma Promise
    writeFile(  
            _dir = nome do diretorio,
            _name = nome do arquivo com extenção ex:(".txt"),
            _data = dados para ser gravado no formato JSON em texto (JSON.stringify)
            )            
*/
function writeFile(_dir, _file, _data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(_dir + _file, _data, (err) => {
            if (err) {
                reject();
            } else {
                resolve();

            }
        })
    })
}

/*
    Função para gravar log em arquivo.
    A função não sobrescreve o conteúdo existente.
    A função faz um append no arquivo.
    writeLog(
            _dir  = diretorio onde está o arquivo,
            _file = nome do arquivo com extenção ex:(".txt"),
            _data = dados que será gravado no arquivo
            )
*/
function writeLog(_dir, _file, _data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(_dir + _file, _data, { encoding: 'utf-8', flag: 'w' }, (err) => {
            if (err) {
                reject('{"writeFile":"ERROR"}');
            } else {
                resolve('{"writeFile":"OK"}');
            }
        })
    })
}
// ROTA PARA FAZER UPDATE DO USUÁRIO - OK
app.put('/update', (req, res) => {
    let userJsonUpdateData = req.body;
    console.log(userJsonUpdateData);

    console.log("|¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨|");
    console.log("| SOLICITAÇÃO ALTERAÇÃO DE DADOS DO USUÁRIO   |");
    console.log("| Informações do usuario para alterar: " + JSON.stringify(userJsonUpdateData));

    new Promise((resolve, reject) => {
        console.log("| Start Promise")

        fs.readFile('users.json', 'utf-8', (err, data) => {

            if (err) {
                console.log("| READ FILE - ERRO: " + err);
                reject();

            } else {
                console.log("| ReadFile: 'users.json' - OK");
                let userListJSON = JSON.parse(data);
                let userListJSONPosition = 0;

                for (u in userListJSON) {
                    if (userListJSON[u].id == userJsonUpdateData.id) {
                        console.log("| Usuario encontrado: " + JSON.stringify(userListJSON[u]));
                        userListJSON[u].user = userJsonUpdateData.user;
                        userListJSON[u].email = userJsonUpdateData.email;
                        userListJSON[u].phone = userJsonUpdateData.phone;
                        console.log("| Dados do usuario alterado : " + JSON.stringify(userListJSON[u]));
                        resolve(userListJSON)
                        break;
                    }
                    userListJSONPosition++
                };

                if (userListJSONPosition == userListJSON.length) {
                    console.log("| Erro usuário não encontrado");
                    reject();
                }
            }
        })

    }).then((_data) => {

        fs.writeFile('users.json', JSON.stringify(_data), (err) => {

            if (err) {

                fs.appendFile('log.txt', `${new Date().toLocaleString()} > UPDATE USER    ->  READ FILE:'users.json'  ->  ERRO CODE: ${err.code}${'\n'}`, (err) => {
                    err ? console.log(`| ${new Date().toLocaleString()} > READ FILE:'log.txt' > ERRO:${err.code}`) : "";
                })

                console.log("| WriteFile: ERRO: " + err);
                console.log("| USUARIO NÃO ALTERADO - FIM                  |");
                console.log("|_____________________________________________|");
                reject();

            } else {
                console.log("| Dados do usuario alterado com sucesso");
                console.log("| USUÁRIO ALTERADO - FIM                      |");
                console.log("|_____________________________________________|");
                res.send('{"UPDATE":"OK"}');
            }

        })
    }).catch(() => {
        console.log("| USUARIO NÃO ALTERADO - FIM                  |");
        console.log("|_____________________________________________|");

        res.status(500).json({ "UPDATE": "NÃO FOI POSSIVEL ATUALIZAR" })
    })

});
// ROTA PARA DELETAR UM USUÁRIO ESPECIFICO - OK
app.delete('/delete/:type/:id', function (req, res) {
    let deleteId = req.params.id;
    let deleteType = req.params.type;
    console.log(deleteId)
    console.log(deleteType)

    console.log("|¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨|");
    console.log("| SOLICITAÇÃO DE DELETAR           |");
    console.log("| Deletar tipo:" + deleteType);
    console.log("| Deletar id:" + deleteId);

    new Promise((resolve, reject) => {
        console.log("| Promisse Iniciada");

        if (deleteType == "user") {

            fs.readFile('users.json', 'utf-8', (err, data) => {

                if (err) {
                    console.log("| READ FILE - ERRO: " + err);
                    reject("USUÁRIO NÃO EXCLUIDO - ERRO INTERNO");

                } else {
                    console.log("| ReadFile: 'users.json' - OK");
                    let userListJSON = JSON.parse(data);
                    let userListJSONPosition = 0;

                    for (u of userListJSON) {
                        if (u.id == deleteId) {
                            console.log("| ReadFile: User encontrado: " + JSON.stringify(u));
                            userListJSON.splice(userListJSONPosition, 1);
                            resolve(JSON.parse(`[{"type":"user"},${JSON.stringify(userListJSON)}]`));
                            break;
                        }
                        userListJSONPosition++;
                    }

                    if (userListJSONPosition == userListJSON.length) {
                        reject("ERRO ID DO USUARIO NÃO EXISTE");
                    }
                }
            })

        } else if (deleteType == "category") {


            fs.readFile('categories.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log("| READ FILE - ERRO: " + err);
                    reject("CATEGORIA NÃO EXCLUIDA - ERRO INTERNO");
                } else {
                    console.log("| ReadFile: 'categories.json' - OK");
                    let categoryListJSON = JSON.parse(data);
                    let categoryListJSONPosition = 0;
                    for (u of categoryListJSON) {
                        if (u.id == deleteId) {
                            console.log("| ReadFile: Categoria encontrada: " + JSON.stringify(u));
                            categoryListJSON.splice(categoryListJSONPosition, 1);
                            resolve(JSON.parse(`[{"type":"category"},${JSON.stringify(categoryListJSON)}]`));
                            break;
                        }
                        categoryListJSONPosition++;
                    }
                    if (categoryListJSONPosition == categoryListJSON.length) {
                        reject("ERRO ID DA CATEGORIA NÃO EXISTE");
                    }
                }
            })

        }


    }).then((_data) => {

        if (_data[0].type == "user") {

            fs.writeFile('users.json', JSON.stringify(_data[1]), (err) => {
                if (err) {
                    console.log("| WriteFile: ERRO: " + err);
                    console.log("| USUARIO NÃO DELETADO - FIM       |");
                    console.log("|__________________________________|");
                    fs.appendFile('log.txt', `${new Date().toLocaleString()} > DELETE USER    ->  WRITE FILE:'users.json'  ->  ERRO CODE: ${err.code}${'\n'}`, (err) => {
                        if (err) {
                            console.log(`| ${new Date().toLocaleString()} > WRITE FILE:'log.txt.json' > ERRO:${err.code}`);
                        }
                    })
                    res.send('{"DELETE":"USUARIO_NÃO_DELETADO_ERRO_INTERNO"}');
                } else {
                    console.log("| Usuario deletado com sucesso");
                    console.log("| USUARIO DELETADO - FIM           |");
                    console.log("|__________________________________|");
                    res.send('{"DELETE":"USUARIO_DELETADO_OK"}');
                }
            })

        } else if (_data[0].type == "category") {

            fs.writeFile('categories.json', JSON.stringify(_data[1]), (err) => {
                if (err) {
                    console.log("| WriteFile: ERRO: " + err);
                    console.log("| CATEGORIA NÃO DELETADO - FIM     |");
                    console.log("|__________________________________|");
                    fs.appendFile('log.txt', `${new Date().toLocaleString()} > DELETE CATEGORY->  WRITE FILE:'categories.json'  ->  ERRO CODE: ${err.code}${'\n'}`, (err) => {
                        if (err) {
                            console.log(`| ${new Date().toLocaleString()} > WRITE FILE:'log.txt.json' > ERRO:${err.code}`);
                        }
                    })
                    res.status(500).json(`{"DELETE": "CATEGORIA NÃO DELETADO ERRO INTERNO"`);
                } else {
                    console.log("| Categoria deletada com sucesso");
                    console.log("| CATEGORIA DELETADA - FIM         |");
                    console.log("|__________________________________|");
                    res.send('{"DELETE":"CATEGORIA DELETADA - OK"}');
                }
            })

        }


    }).catch((_err) => {
        console.log("| NÃO DELETADO - FIM               |");
        console.log("|__________________________________|");
        res.status(500).json(`{"DELETE": "${_err}"`);
    })

})







app.post('/register/expe', function (req, res) {
    let expenseRegister = req.body;
    let expensesList;
    let usersList;
    let categoriesList;

    console.log("|¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨|");
    console.log("| SOLICITAÇÃO DE REGISTRO                 |");
    console.log("| Dados para registrar : " + JSON.stringify(expenseRegister));
    new Promise((resolve, reject) => {
        console.log("| Promise Iniciada");

        readFile(PATH_DIR, "expenses.json")
            .then((_data) => {
                console.log(`| ReadFile: 'expenses.json' - OK`);
                console.log("| Total de registros : " + JSON.parse(_data).length);
                expensesList = JSON.parse(_data);
            })
            .catch((_err) => {
                console.log("| ReadFile: ERRO: " + _err)
                console.log("| NÃO REGISTRADO - FIM                    |");
                console.log("|_________________________________________|");
                res.status(500).send(`{"register":"${_err}"}`);
            })

        readFile(PATH_DIR, "users.json")
            .then((_data) => {
                console.log(`| ReadFile: 'expenses.json' - OK`);
                console.log("| Total de registros : " + JSON.parse(_data).length);
                usersList = JSON.parse(_data);
            })
            .catch((_err) => {
                console.log("| ReadFile: ERRO: " + _err)
                console.log("| NÃO REGISTRADO - FIM                    |");
                console.log("|_________________________________________|");
                res.status(500).send(`{"register":"${_err}"}`);
            })

        readFile(PATH_DIR, "categories.json")
            .then((_data) => {
                console.log(`| ReadFile: 'expenses.json' - OK`);
                console.log("| Total de registros : " + JSON.parse(_data).length);
                categoriesList = JSON.parse(_data);
            })
            .catch((_err) => {
                console.log("| ReadFile: ERRO: " + _err)
                console.log("| NÃO REGISTRADO - FIM                    |");
                console.log("|_________________________________________|");
                res.status(500).send(`{"register":"${_err}"}`);
            })




    }).then((_data) => {
        let dados = JSON.parse(_data)
        writeFile(PATH_DIR, dados[0].type + ".json", JSON.stringify(dados[1]))
            .then(() => {
                console.log("| Registro realizado com sucesso");
                console.log("| REGISTRADO - FIM                        |");
                console.log("|_________________________________________|");
                // res.send('{"register":"REGISTRADO COM SUCESSO"}')
            })
            .catch(() => {
                console.log("| WriteFile: ERRO: " + err.message);
                console.log("| Não foi possivel efetuar o registro");
                console.log("| NÃO REGISTRADO - FIM                    |");
                console.log("|_________________________________________|");
                // res.status(500).send(`{"register":"NÃO REGISTRADO - ERRO INTERNO"}`);
            })
    }).catch((_err) => {
        console.log("| WriteFile: ERRO: " + _err);
        console.log("| Não foi possivel efetuar o registro");
        console.log("| NÃO REGISTRADO - FIM                    |");
        console.log("|_________________________________________|");
        // res.status(500).send(`{"register":"NÃO REGISTRADO - ERRO INTERNO"}`);
    })
})








// ROTA DE SOLICITAÇÃO DE TODOS OS USUÁRIOS - OK - REFATORADO - OK
app.get('/query/:all', function (req, res) {
    console.log("|¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨|");
    console.log("| SOLICITAÇÃO DE DADOS                    |");
    console.log("| Qual solicitação: " + req.params.all);

    readFile(PATH_DIR, `${req.params.all}.json`)
        .then((_data) => {
            console.log("| SOLICITAÇÃO ENVIADA - FIM               |");
            console.log("|_________________________________________|");
            res.send(_data);
        })
        .catch((_err) => {
            console.log("| ReadFile: ERRO: " + _err)
            console.log("| NÃO FOI POSSIVEL LER O ARQUIVO - FIM    |");
            console.log("|_________________________________________|");
            res.status(500).send('{"CONSULTA":"LISTA_NÃO_DISPONIVEL_ERRO_INTERNO"}');
        })
})


// ------------------ AROVADOS -----------------------
// ROTA PARA CADASTRAR USUARIO/CATEGORIA - OK
/*
    Rota para cadastro
    Para cadastrar no POST deve receber um objeto JSON.
    Formato do objeto JSON:[{"type":"nome do arquivo que irá cadastrar, sem a extensão"},{"dados do que deseja cadastrar no arquivo"}]
    Dentro da função readFile(Promise) no "".then", deve-se colocar um "else if" para identificar o "type" e diferenciar dos outros.
*/
app.post('/register', function (req, res) {
    const registerJSON = req.body;
    console.log(registerJSON)
    console.log("|¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨|");
    console.log("| SOLICITAÇÃO DE REGISTRO                 |");
    console.log("| Dados para registrar : " + JSON.stringify(registerJSON[0]));
    new Promise((resolve, reject) => {
        console.log("| Promise Iniciada");
        readFile(PATH_DIR, registerJSON[0].type + ".json")
            .then((_data) => {
                console.log(`| ReadFile: '${registerJSON[0].type}.json' - OK`);
                console.log("| Total de registros : " + JSON.parse(_data).length);
                listJSON = JSON.parse(_data);
                let listJSONPosition = 0;

                if (registerJSON[0].type === "users") {
                    for (u of listJSON) {
                        if (u.user == registerJSON[1].user && registerJSON[1].user != "") {
                            console.log("| Nome do usuário ja registrado : " + u.user);
                            reject("NOME JÁ REGISTRADO");
                            break;
                        } else if (u.email == registerJSON[1].email && registerJSON[1].email != "") {
                            console.log("| E-mail do usuário ja registrado : " + u.email);
                            reject("EMAIL JÁ REGISTRADO");
                            break;
                        }
                        listJSONPosition++;
                    }
                } else if (registerJSON[0].type === "categories") {
                    for (u of listJSON) {
                        if ((registerJSON[1].category !== "" && u.category === registerJSON[1].category) && u.user_id == registerJSON[1].user_id) {
                            console.log("| Categoria já registrada : " + u.category);
                            reject("CATEGORIA JA REGISTRADA");
                            break;
                        }
                        listJSONPosition++;
                    }
                } else if (registerJSON[0].type === "expenses") {
                    listJSONPosition = listJSON.length;
                }

                if (listJSONPosition == listJSON.length) {
                    console.log("| Registro não encontrado");
                    listJSON[listJSON.length - 1] === undefined ? registerJSON[1].id = 1 : registerJSON[1].id = listJSON[listJSON.length - 1].id + 1;
                    console.log("| Registro: " + JSON.stringify(registerJSON[1]));
                    listJSON.push(registerJSON[1]);
                    resolve(`[{"type":"${registerJSON[0].type}"},${JSON.stringify(listJSON)}]`);
                }
            })
            .catch((_err) => {
                console.log("| ReadFile: ERRO: " + _err)
                console.log("| NÃO REGISTRADO - FIM                    |");
                console.log("|_________________________________________|");
                res.status(500).send(`{"register":"${_err}"}`);
            })
    }).then((_data) => {
        let dados = JSON.parse(_data)
        writeFile(PATH_DIR, dados[0].type + ".json", JSON.stringify(dados[1]))
            .then(() => {
                console.log("| Registro realizado com sucesso");
                console.log("| REGISTRADO - FIM                        |");
                console.log("|_________________________________________|");
                res.send('{"register":"REGISTRADO COM SUCESSO"}')
            })
            .catch(() => {
                console.log("| WriteFile: ERRO: " + err.message);
                console.log("| Não foi possivel efetuar o registro");
                console.log("| NÃO REGISTRADO - FIM                    |");
                console.log("|_________________________________________|");
                res.status(500).send(`{"register":"NÃO REGISTRADO - ERRO INTERNO"}`);
            })
    }).catch((_err) => {
        console.log("| WriteFile: ERRO: " + _err);
        console.log("| Não foi possivel efetuar o registro");
        console.log("| NÃO REGISTRADO - FIM                    |");
        console.log("|_________________________________________|");
        res.status(500).send(`{"register":"${_err}"}`);
    })
})


/* 
    Rota POST para efetuar o LOGIN.
*/
app.post('/login', function (req, res) {
    let autentication = req.body
    const loginAutentication = new Promise((resolve, reject) => {

        console.log("|¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨|");
        console.log("| SOLICITAÇÃO DE LOGIN                        |");
        console.log("| Usuario a logar: " + JSON.stringify(autentication));

        fs.readFile('users.json', 'utf-8', (err, data) => {
            if (err) {
                fs.appendFile('log.txt', `${new Date().toLocaleString()} > ROUTE:/login > METHOD:POST > LOGIN USER > READ FILE:'users.json' > ERRO CODE: ${err.code}${'\n'}`, (err) => {
                    err ? console.log(`| ${new Date().toLocaleString()} > ROUTE:/login > METHOD:POST > READ FILE:'log.txt' > ERRO:${err.code}`) : "";
                })
                console.log("| ReadFile erro: 'users.json'");
                reject();
            } else {
                console.log("| ReadFile: 'users.json' - OK");
                let userListJSONPosition = 0;
                userListJSON = JSON.parse(data);
                for (u of userListJSON) {
                    if (u.user == autentication.user && autentication.user != "" && u.password == autentication.password) {
                        console.log("| Usuário encontrado: " + JSON.stringify(u));
                        resolve(u);
                        break;
                    }
                    userListJSONPosition++;
                }
                if (userListJSONPosition == userListJSON.length) {
                    console.log("| Usuario não encotrado")
                    reject()
                }
            }
        })
    });


    loginAutentication
        .then((_data) => {
            let userAutentication = _data;

            fs.readFile('loged.json', 'utf-8', (err, data) => {
                if (err) {
                    console.log("| USUARIO NÃO EFETUOU LOGIN - FIM         |");
                    console.log("|_________________________________________|");
                    fs.appendFile('log.txt', `${new Date().toLocaleString()} > ROUTE:/login > METHOD:POST > LOGIN USER > READ FILE:'users.json' -> ERRO CODE: ${err.code}${'\n'}`, (err) => {
                        err ? console.log(`| ${new Date().toLocaleString()} > ROUTE:/login > METHOD:POST > READ FILE:'log.txt' > ERRO:${err.code}`) : "";
                    })
                    res.status(500).send(`{"LOGIN":"ERRO AO FAZER LOGIN"}`);

                } else {
                    console.log("| ReadFile: 'loged.json' - OK");
                    let usersLoged = JSON.parse(data);
                    let userLoginCheck = 0;

                    for (l of usersLoged) {
                        if (l.user === userAutentication.user) {
                            console.log("| Usuário já logado: " + JSON.stringify(l));
                            console.log("| USUÁRIO LOGADO - FIM                        |");
                            console.log("|_____________________________________________|");
                            res.send(JSON.stringify(l));
                            break;
                        }
                        userLoginCheck++
                    }

                    if (usersLoged.length === userLoginCheck) {
                        console.log("| Usuário não logado anteriormente");
                        let userAutenticationOK = JSON.parse(`{"id":${userAutentication.id},"user":"${userAutentication.user}","key":"${(Math.random() * 9999999) + ((Math.random() * 9) + 10000000)}"}`);
                        userAutenticationOK.time = Date.now();
                        usersLoged.push(userAutenticationOK);

                        fs.writeFile('loged.json', JSON.stringify(usersLoged), (err) => {
                            if (err) {
                                fs.appendFile('log.txt', `${new Date().toLocaleString()} > ROUTE:/login > METHOD:POST > LOGIN USER > READ FILE:'loged.json' > ERRO CODE: ${err.code}${'\n'}`, (err) => {
                                    err ? console.log(`| ${new Date().toLocaleString()} > ROUTE:/login > METHOD:POST > READ FILE:'log.txt' > ERRO:${err.code}`) : "";
                                })
                                console.log("| WriteFile: ERRO: " + err);
                                console.log("| USUARIO NÃO LOGADO - FIM                    |");
                                console.log("|_____________________________________________|");
                                reject();

                            } else {
                                console.log("| Usuário logado com sucesso");
                                console.log("| USUÁRIO LOGADO - FIM                        |");
                                console.log("|_____________________________________________|");
                                console.log(usersLoged)
                                res.send(JSON.stringify(usersLoged));
                            }
                        })
                    }
                }
            })
        })
        .catch(() => {
            console.log("| USUARIO NÃO LOGADO - FIM                    |");
            console.log("¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨");
            res.status(500).json({ "LOGIN": "ERRO NO LOGIN" });
        })
})
// OK - 29-06-21
app.get('/query/new-expenses/user/:userid', function (req, res) {
    console.log("|¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨|");
    console.log("| SOLICITAÇÃO DE DADOS                    |");
    console.log("| Qual solicitação: " + req.params.userid);
    let userId = req.params.userid;

    readFile(PATH_DIR, `categories.json`)
        .then((_dados) => {

            let dados = JSON.parse(_dados);
            let dadosFiltered = dados.filter((expense) => {
                if (expense.user_id == 0 || expense.user_id == userId) {
                    console.log(expense);
                    return expense;
                }
            })
            console.log("| CATEGORIAS ENVIADAS - FIM               |");
            console.log("|_________________________________________|");
            res.send(dadosFiltered)
        })
        .catch((_err) => {
            console.log("| ERRO - FIM                              |");
            console.log("|_________________________________________|");
            res.status(500).send(_err);

        })
})



// PORTA DO SERVIDOR - OK
app.listen(3000, () => {
    fs.appendFile('log.txt', `${new Date().toLocaleString()} - SERVER RUNNING ON PORT: ` + 3000 + `${'\n'}`, (err) => {
        if (err) {
            console.log(`| ${new Date().toLocaleString()} > NO SERVER START LOG > ERRO:${err.message}`);
        }
    })
    console.log(`${new Date().toLocaleString()} - Server rodando na porta: ` + 3000)
});






















/*

// usando objetos Date
let inicio = Date.now();

// o evento para o tempo vai aqui:
setTimeout(()=>{
let fim = Date.now();
let decorrido = fim - inicio; // tempo decorrido em milisegundos
console.log("decorrido:"+ decorrido)
},0);

*/