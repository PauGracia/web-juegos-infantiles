<?php
$archivo = __DIR__ . "/data/rankingPalabras.txt";
$ranking = [];

if (file_exists($archivo)) {
    $lineas = file($archivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lineas as $linea) {
        list($usuario, $puntos, $fecha) = explode("|", $linea);
        $ranking[] = [
            "usuario" => trim($usuario),
            "puntos" => intval($puntos),
            "fecha" => trim($fecha)
        ];
    }

    // Ordenar de mayor a menor por puntos
    usort($ranking, function($a, $b) {
        return $b["puntos"] <=> $a["puntos"];
    });
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ranking - El Ahorcado</title>
    <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body class="body-rankingPalabras">
    <h1 class="titulo-rankingPalabras">🏆 Ranking de Palabras</h1>

    <?php if (!empty($ranking)): ?>
    <table id="tabla-rankingPalabras">
        <tr>
            <th>Posición</th>
            <th>Usuario</th>
            <th>Puntos</th>
            <th>Fecha</th>
        </tr>
        <?php foreach ($ranking as $i => $r): ?>
        <tr>
            <td><?= $i + 1 ?></td>
            <td><?= htmlspecialchars($r["usuario"]) ?></td>
            <td><?= $r["puntos"] ?></td>
            <td><?= $r["fecha"] ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
    <?php else: ?>
        <p class="mensaje-sin-registros">No hay registros aún.</p>
    <?php endif; ?>

    <div class="boton-volver-rankingPalabras">
        <a href="../juegos/juegoAhorcado.html" class="boton-rankingPalabras">Volver al Juego</a>
    </div>
</body>
</html>
