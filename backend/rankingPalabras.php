<?php
$archivo = __DIR__ . "/data/rankingPalabras.txt";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST["usuario"] ?? "");
    $puntos = intval($_POST["puntos"] ?? 0);
    $fecha = date("Y-m-d H:i:s");

    if ($usuario !== "") {
        $linea = "$usuario|$puntos|$fecha" . PHP_EOL;
        file_put_contents($archivo, $linea, FILE_APPEND);
    }
}

header("Location: paginaRankingPalabras.php");
exit;
?>
