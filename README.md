Web Juegos Infantiles

Repositorio: web-juegos-infantiles
Autor: Pau Gracia

(opcional: añade captura de pantalla de la app)

Descripción

Web Juegos Infantiles es una colección de juegos educativos web desarrollada con HTML, CSS y JavaScript puro. Está orientada a niños y niñas para aprender matemáticas y vocabulario de manera interactiva y divertida.

Actualmente incluye:

Memori: Juego de memoria visual con imágenes y puntuación.

Operaciones: Practica operaciones matemáticas (niveles fáciles y avanzados).

Juego de Palabras: Aprende vocabulario en distintos idiomas con casillas de letras.

El proyecto está pensado para uso en navegadores modernos y funciona tanto en Windows como Linux. Se ha optimizado la experiencia de usuario y la compatibilidad de teclas y colores.

Tecnologías

HTML5

CSS3 (Flexbox, media queries)

JavaScript (Vanilla JS)

Backend mínimo con PHP para almacenamiento de puntuaciones (guardar.php)

Control de versiones con Git y uso de SSH para despliegue seguro.

Características

Modal de configuración para seleccionar nivel, número de operaciones o cantidad de palabras.

Diferentes niveles de dificultad en juegos matemáticos.

Validación en tiempo real de respuestas y feedback visual:

Verde = correcto

Rojo = incorrecto

Adaptativo a dispositivos móviles (responsive design).

Persistencia de puntuaciones y ranking en memoria backend (memori.txt).

Navegación sencilla y segura entre juegos.

Instalación y uso

Clona el repositorio usando SSH:

git clone git@github.com:PauGracia/web-juegos-infantiles.git


Entra en la carpeta del proyecto:

cd web-juegos-infantiles


Abre index.html en tu navegador favorito.

Para cambios y desarrollo:

Crea tu rama dev:

git checkout -b dev


Realiza cambios, prueba localmente y sube la rama:

git add .
git commit -m "Descripción de cambios"
git push -u origin dev

Estructura de carpetas
web-juegos-infantiles/
│
├─ backend/          # Archivos PHP y datos
│   └─ data/memori.txt
├─ css/              # Estilos
├─ js/               # Scripts JS (todos los juegos en un solo archivo)
├─ index.html        # Página principal
├─ memoria.html      # Juego Memori
├─ operaciones.html  # Juego Operaciones
├─ palabras.html     # Juego de palabras
└─ README.md         # Documentación

Configuración especial

Compatibilidad Windows/Linux: se ha configurado core.autocrlf=input en Git para evitar problemas de fin de línea.

SSH GitHub: la conexión remota usa clave SSH para evitar errores 403 al hacer push.

Modal de Operaciones: el input del máximo operando se deshabilita en nivel avanzado (nivel 2).

Palabras: el juego congela la palabra a adivinar, validando letra a letra y mostrando feedback en tiempo real.

Mejoras futuras

Implementar sonido y animaciones para feedback positivo/negativo.

Guardado de progreso de usuarios entre sesiones.

Inclusión de más idiomas y palabras para ampliar el juego de vocabulario.

Optimización de backend para ranking global multiusuario.

Licencia

Proyecto personal desarrollado con fines educativos y de demostración para curriculum y portfolio.
