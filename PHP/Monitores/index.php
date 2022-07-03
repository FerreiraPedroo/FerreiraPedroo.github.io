<?php

echo '
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>MonitorWindow</title>
  <style>
  body {
    display: flex;
    margin: 0;
    padding: 0;
  }
  main {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    gap: 48px;
  }
  img {
    width: 320px;
  }
  form {
    display:flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  input {
    width: 96px;
    text-align: center;
    font-size: 24px;
  }
  button {
    width: 128px;
    height: 32px;
  }
  button:hover {
    cursor: pointer;
  }
  </style>

</head>
<body>
  <main>
  <img src="./window.jpeg" alt="Image window" />
  <form method="get" action="monitor.php">
  <input type="number" name="monitorQtd" min-value="1" required value="10"/>
  <button type="submit">CRIAR</button>

  </main>
</body>
</html>';
