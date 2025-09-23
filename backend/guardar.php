<?php
// guardar.php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $nombre = trim($data['nombre']);
    $puntuacion = intval($data['puntuacion']);

    // Validar longitud del nombre
    if (strlen($nombre) < 3 || strlen($nombre) > 10) {
        http_response_code(400);
        echo "El nombre debe tener entre 3 y 10 caracteres";
        exit;
    }

    // Formato: -nombre:puntuacion;
    $linea = "-" . $nombre . ":" . $puntuacion . ";\n";
    file_put_contents("./data/memori.txt", $linea, FILE_APPEND | LOCK_EX);

    echo "Guardado correctamente";
}
?>
