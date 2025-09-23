# 🌐 Web Juegos Infantiles  

**Repositorio:** `web-juegos-infantiles`  
**Autor:** Pau Gracia  

*(Opcional: añade aquí una captura de pantalla de la app)*  

---

## 📖 Descripción  

**Web Juegos Infantiles** es una colección de juegos educativos web desarrollada con **HTML, CSS y JavaScript puro**.  
Está orientada a niños y niñas para aprender **matemáticas** y **vocabulario** de manera interactiva y divertida.  

Actualmente incluye:  
- 🧠 **Memori** → Juego de memoria visual con imágenes y puntuación.  
- ➕ **Operaciones** → Practica operaciones matemáticas (niveles fáciles y avanzados).  
- 🔤 **Juego de Palabras** → Aprende vocabulario en distintos idiomas con casillas de letras.  

👉 Funciona en **navegadores modernos** y es compatible con **Windows** y **Linux**.  
👉 Optimizado para una experiencia fluida en **móvil y escritorio**.  

---

## 🛠️ Tecnologías  

- **HTML5**  
- **CSS3** (Flexbox, media queries)  
- **JavaScript (Vanilla JS)**  
- **PHP** (backend mínimo para almacenamiento de puntuaciones `guardar.php`)  
- **Git** (control de versiones, despliegue seguro vía SSH)  

---

## ✨ Características  

- Modal de configuración para seleccionar nivel, número de operaciones o cantidad de palabras.  
- Diferentes niveles de dificultad en juegos matemáticos.  
- Validación en tiempo real de respuestas y feedback visual:  
  - ✅ Verde = correcto  
  - ❌ Rojo = incorrecto  
- **Responsive design** (adaptativo a móviles).  
- Persistencia de puntuaciones y ranking en memoria backend (`memori.txt`).  
- Navegación sencilla y segura entre juegos.  

---

## 🚀 Instalación y uso  

Clona el repositorio usando **SSH**:  


git clone git@github.com:PauGracia/web-juegos-infantiles.git
cd web-juegos-infantiles


---

## 📂 Estructura de carpetas

---
web-juegos-infantiles/
│
├─ backend/ # Archivos PHP y datos
│ └─ data/memori.txt
├─ css/ # Estilos
├─ js/ # Scripts JS (todos los juegos en un solo archivo)
├─ index.html # Página principal
├─ memoria.html # Juego Memori
├─ operaciones.html # Juego Operaciones
├─ palabras.html # Juego de palabras
└─ README.md # Documentación

---


## ⚙️ Configuración especial  

- **Compatibilidad Windows/Linux** → `core.autocrlf=input` en Git para evitar problemas de fin de línea.  
- **SSH en GitHub** → conexión remota con clave SSH para evitar errores 403.  
- **Operaciones** → en nivel avanzado (nivel 2) se deshabilita el input del máximo operando.  
- **Palabras** → el juego congela la palabra a adivinar, validando letra a letra con feedback en tiempo real.  

---

## 🔮 Mejoras futuras  

- Sonido y animaciones para feedback positivo/negativo.  
- Guardado de progreso de usuarios entre sesiones.  
- Inclusión de más idiomas y palabras para el juego de vocabulario.  
- Optimización de backend para ranking global multiusuario.  

---

## 📜 Licencia  

Proyecto personal desarrollado con fines **educativos** y de **demostración** para currículum y portfolio.  


