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
    <title>Ranking - El Corredor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f2f2f2;
            padding: 30px;
            text-align: center;
        }
        h1 {
            margin-bottom: 20px;
        }
        #tabla-rankingPalabras {
            margin: auto;
            border-collapse: collapse;
            width: 80%;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            margin-bottom: 50px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
        }
        th {
            background: #333;
            color: white;
        }
        tr:nth-child(even) {
            background: #f9f9f9;
        }
        .boton-rankingPalabras {
            margin-top: 50px;
            padding: 10px 20px;
            background: #28a745;
            color: white;
            border-radius: 6px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>🏆 Ranking de Palabras</h1>

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
            <td><?= $i+1 ?></td>
            <td><?= htmlspecialchars($r["usuario"]) ?></td>
            <td><?= $r["puntos"] ?></td>
            <td><?= $r["fecha"] ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
    <?php else: ?>
        <p>No hay registros aún.</p>
    <?php endif; ?>

    <a href="../juegos/partido.html" class="boton-rankingPalabras">Volver al Juego</a>
</body>
</html>
