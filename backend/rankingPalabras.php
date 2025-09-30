<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST["usuario"]);
    $puntos = intval($_POST["puntos"]);

    if (!empty($usuario)) {
        $linea = date("Y-m-d H:i:s") . " | " . $usuario . " | " . $puntos . PHP_EOL;
        file_put_contents(__DIR__ . "/data/rankingPalabras.txt", $linea, FILE_APPEND);
    }

     header("Location: paginaRankingPalabras.php");
    exit;
}
?>
