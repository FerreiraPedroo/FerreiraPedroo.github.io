<?php

$monitorQtd = isset($_GET["monitorQtd"]) ? $_GET["monitorQtd"] : 0;
$resolucoesMonitor;
$corMonitor;

class Monitor
{
  private $id;
  private $tamanho;
  private $botao;
  public $resolucao;
  private $conector;
  private $marca;
  private $cor;
  public $ligado;

  private $tamanhoArray = ["19", "21", "24", "29"];
  private $botaoArray = 5;
  private $resolucaoArray = ["HD", "FHD", "4K", "8K", "10K", "12K"];
  private $conectorArray = ["HDMI", "VGA", "D-SUB"];
  private $marcaArray = ["LG", "SAMSUNG", "AOC", "PHILLIPS"];
  private $corArray = ["amarelo", "azul", "verde", "cinza", "roxo"];

  // metodo contrutor que executa assim que a classe é instanciada.
  public function __construct()
  {
    $this->id = mt_rand(0, 1000);
  }
  function ligar()
  {
    $this->ligado = true;
  }
  function desligar()
  {
    $this->ligado = false;
    echo "Desligando...";
  }
  function mudarResolucao()
  {
    foreach ($this->resolucaoArray as $posicao => $valor) {
      if ($this->resolucao === $valor) {
        if ($posicao === count($this->resolucaoArray) - 1) {
          $this->resolucao = $this->resolucaoArray[0];
        } else {
          $this->resolucao = $this->resolucaoArray[$posicao];
        }
      }
    }

    $this->resolucao = $this->resolucaoArray[mt_rand(0, count($this->resolucaoArray) - 1)];
  }
  function gerarMonitor()
  {
    $this->tamanho = $this->tamanhoArray[mt_rand(0, count($this->tamanhoArray) - 1)];
    $this->botao = mt_rand(1, $this->botaoArray);
    $this->resolucao = $this->resolucaoArray[mt_rand(0, count($this->resolucaoArray) - 1)];
    $this->conector = $this->conectorArray[mt_rand(0, count($this->conectorArray) - 1)];
    $this->marca = $this->marcaArray[mt_rand(0, count($this->marcaArray) - 1)];
    $this->cor = $this->corArray[mt_rand(0, count($this->corArray) - 1)];
  }
  function getDadosMonitor()
  {
    $monitor = array();
    $monitor["id"] = $this->id;
    $monitor["tamanho"] = $this->tamanho;
    $monitor["botao"] = $this->botao;
    $monitor["resolucao"] = $this->resolucao;
    $monitor["conector"] = $this->conector;
    $monitor["marca"] = $this->marca;
    $monitor["cor"] = $this->cor;
    $monitor["ligado"] = $this->ligado;
    return $monitor;
  }
  function getMonitorResolucoes()
  {
    return $this->resolucaoArray;
  }
  function getCores()
  {
    return $this->corArray;
  }
}

function gerarMonitores($qtd)
{
  $gerMonitores = array();

  for ($i = 0; $i <= $qtd; $i++) {
    $monitor = new Monitor;
    $monitor->gerarMonitor();
    array_push($gerMonitores, $monitor);

    if ($i === 0) {
      global $resolucoesMonitor, $corMonitor;
      $resolucoesMonitor = json_encode($monitor->getMonitorResolucoes()); // converter array em JS.
      $corMonitor = json_encode($monitor->getCores()); // converter array em JS.
      // $GLOBALS["resolucoesMonitor"] = json_encode($monitor->getMonitorResolucoes()); // alternativa para modificar variavel fora do escopo.
    }
  }
  return $gerMonitores;
}

function gerarMonitorHTML($monitores)
{
  for ($i = 0; $i < count($monitores) - 1; $i++) {
    $mon = $monitores[$i]->getDadosMonitor();

    echo "<div id='$i' class='
        monitor-size-{$mon['tamanho']} 
        monitor-cor-{$mon['cor']} 
        monitor-ligado-{$mon['ligado']}'>
        <div id='$i-$i'class='tela-resolucao tela-resolucao-{$mon['resolucao']}'>{$mon['resolucao']}</div>
        <div id='$i-$i-$i' class='menu-botao botao-fundo-{$mon['cor']}'>";

    for ($b = 1; $b <= $mon['botao']; $b++) {
      echo "<button class='botao'";

      if ($b == $mon['botao']) {
        echo "onclick='ligaDesliga($i)'>⋮";
      } else if ($b == $mon['botao'] - 1) {
        echo "onclick=\"mudarResolucao($i)\">◩";
      } else if ($b == $mon['botao'] - 2) {
        echo "onclick=\"mudarCor($i)\">🏳️‍🌈";
      } else {
        echo ">";
      };

      echo "</button>";
    }

    echo "</div></div>";
  }
}

if ($monitorQtd > 0 && intval($monitorQtd)) {
  $monitores = gerarMonitores($monitorQtd); //gerar a quantidade de objetos.

  echo "<!DOCTYPE html>
    <html lang='pt-BR'>
    <head>
      <meta charset='UTF-8'>
      <title>Document</title>
      <style>
        body {
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          background-color: gray;
        }
  
        .menu-botao {
          width: 100%;
          height: 16px;
          display: flex;
          justify-content: flex-end;
        }
  
        .botao-fundo-amarelo {
          background-color: #FDED2A;
        }
  
        .botao-fundo-roxo {
          background-color: #8601AF;
        }
  
        .botao-fundo-azul {
          background-color: blue;
        }
  
        .botao-fundo-verde {
          background-color: green;
        }
  
        .botao-fundo-cinza {
          background-color: silver;
        }
  
        .botao {
          width: 18px;
          height: 14px;
          margin: 4px 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 2px;
          ;
          font-size: 8px;
          background-color: white;
        }
  
        .botao:hover {
          cursor: pointer;
        }
  
        .botao:active{
          background-color: tomato;
        }
  
        .monitor-size-19 {
          min-width: 190px;
          min-height: 128px;
          display: flex;
          flex-direction: column;
        }
  
        .monitor-size-21 {
          min-width: 210px;
          min-height: 128px;
          display: flex;
          flex-direction: column;
        }
  
        .monitor-size-24 {
          min-width: 240px;
          min-height: 128px;
          display: flex;
          flex-direction: column;
        }
  
        .monitor-size-29 {
          min-width: 290px;
          min-height: 128px;
          display: flex;
          flex-direction: column;
        }
  
        .monitor-cor-amarelo {
          border: 5px solid #FDED2A;
        }
  
        .monitor-cor-roxo {
          border: 5px solid #8601AF;
        }
  
        .monitor-cor-azul {
          border: 5px solid blue;
        }
  
        .monitor-cor-verde {
          border: 5px solid green;
        }
  
        .monitor-cor-cinza {
          border: 5px solid silver;
        }
  
        .monitor-ligado- {
          background-color: black;
        }
  
        .monitor-ligado-1 {
          background-color: seashell;
        }
  
        .tela-resolucao {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
  
        .tela-resolucao-HD {
          font-size: 19px;
        }
  
        .tela-resolucao-FHD {
          font-size: 21px;
        }
  
        .tela-resolucao-4K {
          font-size: 24px;
        }
  
        .tela-resolucao-8K {
          font-size: 29px;
        }
  
        .tela-resolucao-10K {
          font-size: 36px;
        }
  
        .tela-resolucao-12K {
          font-size: 40px;
        }
      </style>
    </head>
    <body>
  ";

  gerarMonitorHTML($monitores);

  echo "<script type='text/JavaScript'>
    const resolucaoArray = {$resolucoesMonitor};
    const corArray = {$corMonitor};
  
    function ligaDesliga(_position) {
      const el = document.getElementById(_position);
      if (el.classList.contains('monitor-ligado-1')) {
        el.classList.remove('monitor-ligado-1');
        el.classList.add('monitor-ligado-');
      } else {
        el.classList.add('monitor-ligado-1');
        el.classList.remove('monitor-ligado-');
      };
    }
  
    function mudarResolucao(_position) {
      const elPai = document.getElementById(`\${_position}`);
      const monitorLigado = elPai.classList.contains('monitor-ligado-1');
      const el = document.getElementById(`\${_position}-\${_position}`);
      const listaClasses = el.classList;
      const textoResolucao = el.innerText;
  
      if (monitorLigado) {
        listaClasses.forEach((classe) => {
          const classeSeparada = classe.split('-');
  
          if (classeSeparada.length === 3 && `\${classeSeparada[0]}-\${classeSeparada[1]}` === 'tela-resolucao') {
  
            resolucaoArray.forEach((res, index, array) => {
  
              if (res === classeSeparada[2]) {
                el.classList.remove(`tela-resolucao-\${resolucaoArray[index]}`);
  
                if (index === array.length - 1) {
                  console.log('resolução array 0 : ', resolucaoArray[0]);
                  el.classList.add(`tela-resolucao-\${resolucaoArray[0]}`);
                  el.innerHTML = resolucaoArray[0];
  
                } else {
                  console.log('resolução array other : ', resolucaoArray[index + 1]);
                  el.classList.add(`tela-resolucao-\${resolucaoArray[index+1]}`);
                  el.innerHTML = resolucaoArray[index + 1];
  
                }
              }
            });
          }
        });
      }
    }
  
    function mudarCor(_position) {
      const elPai = document.getElementById(`\${_position}`);
      const monitorLigado = elPai.classList.contains('monitor-ligado-1');
      const el = document.getElementById(`\${_position}-\${_position}-\${_position}`);
      const listaClasses = el.classList;
      const textoResolucao = el.innerText;
  
      if (monitorLigado) {
        listaClasses.forEach((classe) => {
          const classeSeparada = classe.split('-');
  
          if (classeSeparada.length === 3 && `\${classeSeparada[0]}-\${classeSeparada[1]}` === 'botao-fundo') {
  
            corArray.forEach((res, index, array) => {
  
              if (res === classeSeparada[2]) {
                el.classList.remove(`botao-fundo-\${corArray[index]}`);
                elPai.classList.remove(`monitor-cor-\${corArray[index]}`);
  
                if (index === array.length - 1) {
                  console.log('resolução array 0 : ', corArray[0]);
                  el.classList.add(`botao-fundo-\${corArray[0]}`);
                  elPai.classList.add(`monitor-cor-\${corArray[0]}`);
  
                } else {
                  console.log('resolução array other : ', corArray[index + 1]);
                  el.classList.add(`botao-fundo-\${corArray[index+1]}`);
                  elPai.classList.add(`monitor-cor-\${corArray[index+1]}`);
  
                }
              }
            });
          }
        });
      }
    }
  
    </script>
    </body>
    </html>
  ";

} else if ($monitorQtd <= 0) {
  echo "Nenhum monitor para ser exibido...";

} else if (!intval($monitorQtd)) {
  echo "Erro, a quantidade de monitores não é valido...";

}

?>
