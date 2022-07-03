<?php

$matrizX = isset($_GET["numberOne"]) ? $_GET["numberOne"] : "10";
$matrizY = isset($_GET["numberTwo"]) ? $_GET["numberTwo"] : "10";
$positionX = isset($_GET["positionX"]) ? $_GET["positionX"] : 1;
$positionY = isset($_GET["positionY"]) ? $_GET["positionY"] : 1;
$moving = isset($_GET["movPos"]) ? $_GET["movPos"] : "";

function movingPlayer(&$positionX, &$positionY, $moving)
{
  switch ($moving) {
    case "left":
      $positionY--;
      break;
    case "right":
      $positionY++;
      break;
    case "top":
      $positionX--;
      break;
    case "down":
      $positionX++;
      break;
  }
};
movingPlayer($positionX, $positionY, $moving);

function createMapArray($matrizX, $matrizY, $positionX, $positionY)
{
  $x = str_repeat("0#", $matrizX);
  $y = str_repeat("0#", $matrizY);

  $xM = explode("#", $x);
  array_pop($xM);
  $yM = explode("#", $y);
  array_pop($yM);

  foreach ($xM as $position => $value) {
    $xM[$position] = $yM;
  };

  $xM[$positionX][$positionY] = "X";

  return $xM;
};

function updateHtml($matriz)
{
  $line = count($matriz);
  $column = count($matriz[0]);
  echo "<div id='matriz'>";

  for ($l = 0; $l < $line; $l++) {
    echo "<div class='line'>";
    for ($c = 0; $c < $column; $c++) {
      echo "<div class='cell'>";
      if ($matriz[$l][$c] === "X") {
        echo "X";
      };
      echo "</div>";
    };
    echo "</div>";
  };
  echo "</div>";
};

echo "
<head>
  <style>
  #nOne {
    box-sizing: border-box;
    width: 64px;
    height: 32px;
    padding: 4px;
    background: #D9D9D9;
    border-radius: 2px;
    mix-blend-mode: normal;
    border: 2px solid #000000;
    box-shadow: inset -2px -2px 2px rgba(255, 255, 255, 0.5), inset 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
  #tOne {
    box-sizing: border-box;
    width: 128px;
    height: 32px;
    padding: 4px;
    background: #D9D9D9;
    border-radius: 2px;
    mix-blend-mode: normal;
    border: 2px solid #000000;
    box-shadow: inset -2px -2px 2px rgba(255, 255, 255, 0.5), inset 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
  #textArea {
    box-sizing: border-box;
    width: 192px;
    height: 128px;
    padding: 4px;
    background: #D9D9D9;
    border-radius: 2px;
    mix-blend-mode: normal;
    border: 2px solid #000000;
    box-shadow: inset -2px -2px 2px rgba(255, 255, 255, 0.5), inset 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
  #buttonSubmit {
    box-sizing: border-box;
    width: 128px;
    height: 32px;
    background: #D9D9D9;
    border: 2px solid #000000;
    box-shadow: inset -1px -1px 4px rgba(0, 0, 0, 0.75), inset 3px 3px 2px rgba(255, 255, 255, 1);
  }
  #buttonSubmit:hover {
    cursor: pointer;
    border: 3px solid #000000;
    box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.75), inset 4px 4px 4px rgba(255, 255, 255, 1);
  }
  #button-order {
    display: flex;
  }
  #button-updown {
    display: flex;
    width: 48px;
    flex-direction: column;
  }
  #matriz {
    padding: 10px;
  }
  .line{
    display: flex;
  }
  .cell{
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: bolder;
    color: tomato;
    border: 1px solid rgba(0,0,0,0.8);
  }
  </style>
</head>";

echo "
<body>
<form id='button-order' action='dados19.php'>
  <input type='hidden' name='numberOne' value='$matrizX'/>
  <input type='hidden' name='numberTwo' value='$matrizY'/>
  <input type='hidden' name='positionX' value='$positionX'/>
  <input type='hidden' name='positionY' value='$positionY'/>

  <input id='left' type='submit' name='movPos' value='left'>
  <div id='button-updown'>
    <input id='top' type='submit' name='movPos' value='top'>
    <input id='botton' type='submit' name='movPos' value='down'>
  </div>
  <input id='right' type='submit' name='movPos' value='right'>
</form>
";

echo "Matriz: X:$matrizX / Y:$matrizY <br/>";
echo "mover: $moving <br/>";
echo "Posição: X:$positionX / Y:$positionY <br/><br/>";

$matriz = createMapArray($matrizX, $matrizY, $positionX, $positionY);
updateHtml($matriz);

echo "</body>";