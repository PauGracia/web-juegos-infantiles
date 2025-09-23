// juegos.js (un solo archivo todo el js)

document.addEventListener("DOMContentLoaded", () => {
  // ------------------ MEMORI ------------------
  function iniciarMemori() {
    const tablero = document.getElementById("tablero");
    const marcador = document.getElementById("marcador");
    const modal = document.getElementById("modal-memori");
    const puntuacionFinal = document.getElementById("puntuacionFinal");
    const salirBtn = document.getElementById("salir");
    const salirJuegoBtn = document.getElementById("salir-juego");
    const reiniciarBtn = document.getElementById("reiniciar");
    const guardarBtn = document.getElementById("guardar");
    const registro = document.getElementById("registro");
    const registrarBtn = document.getElementById("registrar");
    const nombreJugador = document.getElementById("nombreJugador");

    let puntuacion = 0;
    let primeraCarta = null;
    let bloqueo = false;
    let parejasEncontradas = 0;

    // Usamos los primeros 40 elementos del array "elementos"
    const seleccionados = elementos.slice(0, 40);
    if (seleccionados.length === 0) {
      alert("Error: No hay elementos suficientes para jugar.");
      throw new Error("elementos.js vacío o insuficiente");
    }

    // Creamos los pares y mezclamos
    let valores = [
      ...seleccionados.map((e) => ({ ...e })),
      ...seleccionados.map((e) => ({ ...e })),
    ];
    valores = mezclar(valores);

    function mezclar(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function actualizarMarcador() {
      marcador.textContent = puntuacion;
    }

    function mostrarModal() {
      puntuacionFinal.textContent = "Puntuación: " + puntuacion;
      modal.classList.add("mostrar");
    }

    // Crear cartas
    valores.forEach((elemento) => {
      const div = document.createElement("div");
      div.classList.add("carta");
      div.dataset.valor = elemento.id;

      const img = document.createElement("img");
      img.src = elemento.imagen;
      img.style.width = "70%";
      img.style.display = "none";
      div.appendChild(img);

      div.addEventListener("click", () => {
        if (bloqueo || div.classList.contains("volteada")) return;

        div.classList.add("volteada");
        img.style.display = "block";

        if (!primeraCarta) {
          primeraCarta = div;
        } else {
          if (primeraCarta.dataset.valor === div.dataset.valor) {
            puntuacion += 100;
            parejasEncontradas++;
            actualizarMarcador();

            if (parejasEncontradas === seleccionados.length) {
              puntuacion += 500;
              actualizarMarcador();
              mostrarModal();
            }

            primeraCarta = null;
            bloqueo = false;
          } else {
            bloqueo = true;
            puntuacion = Math.max(0, puntuacion - 5);
            actualizarMarcador();

            setTimeout(() => {
              div.classList.remove("volteada");
              primeraCarta.classList.remove("volteada");
              div.querySelector("img").style.display = "none";
              primeraCarta.querySelector("img").style.display = "none";
              primeraCarta = null;
              bloqueo = false;
            }, 1000);
          }
        }
      });

      tablero.appendChild(div);
    });

    // Evento boton salir durante el juego
    salirJuegoBtn.addEventListener(
      "click",
      () => (location.href = "../index.html")
    );

    // Modal botones

    /*function actualizarBotonGuardar() {
      if (puntuacion <= 0) {
        guardarBtn.disabled = true;
        guardarBtn.textContent = "0 puntos no se pueden guardar";
      } else {
        guardarBtn.disabled = false;
        guardarBtn.textContent = "Guardar";
      }
    }

    function actualizarMarcador() {
      marcador.textContent = puntuacion;
      actualizarBotonGuardar();
    }*/

    // Llamada inicial al cargar la página
    actualizarMarcador();

    // Botón ir a pagina ranking
    document.getElementById("Ranking").addEventListener("click", () => {
      location.href = "ranking.html";
    });

    salirBtn.addEventListener("click", () => (location.href = "../index.html"));
    reiniciarBtn.addEventListener("click", () => location.reload());
    guardarBtn.addEventListener(
      "click",
      () => (registro.style.display = "block")
    );
    registrarBtn.addEventListener("click", () => {
      const nombre = nombreJugador.value.trim();
      if (nombre.length < 3 || nombre.length > 10) {
        alert("El nombre debe tener entre 3 y 10 caracteres");
        return;
      }

      fetch("../backend/guardar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, puntuacion }),
      })
        .then((res) =>
          res.ok ? res.text() : Promise.reject("Error " + res.status)
        )
        .then((msg) => {
          alert(msg);
          registro.style.display = "none";
          nombreJugador.value = "";
          cargarRanking(); // recargar ranking
        })
        .catch((err) => alert("Error al guardar: " + err));
    });

    // Ranking dentro de Memori
    function mostrarRanking(ranking) {
      const divRanking = document.getElementById("ranking");
      divRanking.innerHTML =
        "<h3>Ranking</h3><ol>" +
        ranking.map((r) => `<li>${r.nombre}: ${r.puntuacion}</li>`).join("") +
        "</ol>";
    }

    function cargarRanking() {
      fetch("../backend/data/memori.txt?cache=" + Date.now())
        .then((res) => res.text())
        .then((text) => {
          const ranking = [];
          text.split("\n").forEach((linea) => {
            const m = linea.match(/^-(.*):(\d+);$/);
            if (m) ranking.push({ nombre: m[1], puntuacion: parseInt(m[2]) });
          });
          ranking.sort((a, b) => b.puntuacion - a.puntuacion);
          mostrarRanking(ranking.slice(0, 5));
        })
        .catch(() => {
          document.getElementById("ranking").innerHTML =
            "<h3>Ranking</h3><p>Sin registros</p>";
        });
    }

    cargarRanking();
  }

  if (document.getElementById("tablero")) {
    iniciarMemori();
  }

  // ------------------ RANKING ------------------
  function iniciarRanking() {
    const listaDiv = document.getElementById("lista");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const paginaSpan = document.getElementById("pagina");
    const atrasBtn = document.getElementById("atras");

    if (!listaDiv || !prevBtn || !nextBtn || !paginaSpan || !atrasBtn) return;

    let ranking = [];
    let paginaActual = 1;
    const porPagina = 25;

    function escapeHtml(str) {
      return str.replace(
        /[&<>"']/g,
        (m) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          }[m])
      );
    }

    function mostrarPagina() {
      const totalPaginas = Math.max(1, Math.ceil(ranking.length / porPagina));
      paginaActual = Math.min(Math.max(1, paginaActual), totalPaginas);

      if (ranking.length === 0) {
        listaDiv.innerHTML = "<p>No hay puntuaciones aún.</p>";
        paginaSpan.textContent = "Página 0 de 0";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
      }

      const inicio = (paginaActual - 1) * porPagina;
      const fin = inicio + porPagina;
      const paginaDatos = ranking.slice(inicio, fin);

      let html = `<ol start="${inicio + 1}">`;
      paginaDatos.forEach(
        (r) =>
          (html += `<li>
                    <span class="nombre">${escapeHtml(r.nombre)}</span>
                    <span class="relleno"></span>
                    <span class="puntos">${r.puntuacion}</span>
                  </li>`)
      );
      html += "</ol>";
      listaDiv.innerHTML = html;
      paginaSpan.textContent = `Página ${paginaActual} de ${totalPaginas}`;
      prevBtn.disabled = paginaActual === 1;
      nextBtn.disabled = paginaActual === totalPaginas;
    }

    async function cargarRanking() {
      const ruta = "../backend/data/memori.txt?cache=" + Date.now();
      try {
        const res = await fetch(ruta);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        let text = await res.text();
        text = text.replace(/^\uFEFF/, "");
        ranking = [];
        text.split(/\r?\n/).forEach((linea) => {
          linea = linea.trim();
          if (!linea) return;
          const m = linea.match(/^\s*-?\s*(.+?)\s*:\s*(\d+)\s*;?\s*$/);
          if (m)
            ranking.push({
              nombre: m[1].trim(),
              puntuacion: parseInt(m[2], 10),
            });
        });
        ranking.sort((a, b) => b.puntuacion - a.puntuacion);
        mostrarPagina();
      } catch (err) {
        listaDiv.innerHTML = `<p>Error cargando ranking: ${err.message}</p>`;
        paginaSpan.textContent = "";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
      }
    }

    prevBtn.addEventListener("click", () => {
      if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina();
      }
    });
    nextBtn.addEventListener("click", () => {
      if (paginaActual < Math.ceil(ranking.length / porPagina)) {
        paginaActual++;
        mostrarPagina();
      }
    });
    atrasBtn.addEventListener("click", () => (location.href = "./memori.html"));

    cargarRanking();
  }

  if (document.getElementById("lista")) {
    iniciarRanking();
  }
});

// -----JUEGO OPERACIONES-----
const MAX_OPERACIONES = 50;
const MAX_OPERANDO = 1000;

const nivelSelect = document.getElementById("nivel");
const inputMaximo = document.getElementById("input-maximo");

// Desabilitar operador en nivel 2
if (nivelSelect && inputMaximo) {
  nivelSelect.addEventListener("change", () => {
    if (nivelSelect.value === "2") {
      inputMaximo.disabled = true;
      inputMaximo.value = "";
      inputMaximo.placeholder = "No aplicable en nivel 2";
    } else {
      inputMaximo.disabled = false;
      inputMaximo.placeholder = "Número Operador (solo nivel 1)";
    }
  });

  // Forzar estado al cargar la página
  nivelSelect.dispatchEvent(new Event("change"));
}

let operaciones = [];

function iniciar() {
  const nivel = parseInt(document.getElementById("nivel").value);
  const numOperaciones = parseInt(
    document.getElementById("input-operaciones").value
  );
  const maxValor =
    parseInt(document.getElementById("input-maximo").value) || MAX_OPERANDO;

  if (
    isNaN(numOperaciones) ||
    numOperaciones < 1 ||
    numOperaciones > MAX_OPERACIONES
  ) {
    alert("Por favor, introduce un número válido de operaciones.");
    return;
  }

  if (
    nivel === 1 &&
    (isNaN(maxValor) || maxValor < 0 || maxValor > MAX_OPERANDO)
  ) {
    alert("Por favor, introduce un número válido para el máximo operando.");
    return;
  }

  document.getElementById("modal-operaciones").style.display = "none";
  generarOperaciones(numOperaciones, nivel, maxValor);
}

function generarOperaciones(cantidad, nivel, max) {
  const pizarra = document.getElementById("pizarra");
  pizarra.innerHTML = "";
  operaciones = [];

  for (let i = 0; i < cantidad; i++) {
    let a, b, operador, resultadoReal;

    if (nivel === 1) {
      // Nivel 1: sumas y restas sin negativos
      a = Math.floor(Math.random() * (max + 1));
      b = Math.floor(Math.random() * (max + 1));
      operador = Math.random() < 0.5 ? "+" : "-";

      if (operador === "-" && b > a) {
        [a, b] = [b, a];
      }
      resultadoReal = operador === "+" ? a + b : a - b;
    } else {
      // Nivel 2: +, -, *, / con números hasta 1000
      const operadores = ["+", "-", "*", "/"];
      operador = operadores[Math.floor(Math.random() * operadores.length)];
      a = Math.floor(Math.random() * (MAX_OPERANDO + 1));
      b = Math.floor(Math.random() * (MAX_OPERANDO + 1));

      if (operador === "/") {
        while (b === 0) {
          b = Math.floor(Math.random() * (MAX_OPERANDO + 1)); // evitar división entre 0
        }
        resultadoReal = a / b;
        resultadoReal = parseFloat(resultadoReal.toFixed(2)); // limitar decimales
      } else if (operador === "+") {
        resultadoReal = a + b;
      } else if (operador === "-") {
        resultadoReal = a - b;
      } else if (operador === "*") {
        resultadoReal = a * b;
      }
    }

    operaciones.push({ a, b, operador, resultadoReal });

    let div = document.createElement("div");
    div.className = "operacion";

    let input = document.createElement("input");
    input.type = "number";
    input.className = "resultado-input";

    input.addEventListener("focus", () => {
      if (
        input.classList.contains("incorrecto") ||
        input.classList.contains("correcto")
      ) {
        input.value = "";
        input.classList.remove("incorrecto", "correcto");
      }
    });

    div.innerHTML = `${a}<br>${operador} ${b}<br><hr>`;
    div.appendChild(input);
    pizarra.appendChild(div);
  }
}

const botonSalirOperaciones = document.getElementById(
  "boton-salir-operaciones"
);
if (botonSalirOperaciones) {
  botonSalirOperaciones.addEventListener("click", () => {
    location.href = "../index.html";
  });
}

function comprobarRespuestas() {
  const inputs = document.querySelectorAll(".resultado-input");
  inputs.forEach((input, index) => {
    let valorUsuario = parseFloat(input.value);
    let correcto = valorUsuario === operaciones[index].resultadoReal;
    input.classList.remove("correcto", "incorrecto");
    input.classList.add(correcto ? "correcto" : "incorrecto");
    if (correcto) input.disabled = true;
  });
}
// JUEGO PALABRAS

let idiomaSeleccionado = 0;
let seleccionados = [];
let actual = 0;

// Estado “congelado” para la ronda actual
let comprobado = false;
let objetoActual = null;
let palabraObjetivo = "";

function iniciarJuego() {
  idiomaSeleccionado = parseInt(document.getElementById("idioma").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  seleccionados = [...elementos]
    .sort(() => Math.random() - 0.5)
    .slice(0, cantidad);

  document.getElementById("modal").style.display = "none";
  document.getElementById("juego").style.display = "flex";

  mostrarImagen();
}

function mostrarImagen() {
  comprobado = false;

  // Congelamos el objeto y la palabra objetivo de esta ronda
  objetoActual = seleccionados[actual];
  palabraObjetivo = String(objetoActual.palabras[idiomaSeleccionado] || "");

  // Seguridad: quitamos espacios antes/después (opcional)
  palabraObjetivo = palabraObjetivo.trim();

  document.getElementById("imagen").src = objetoActual.imagen;

  const contenedor = document.querySelector(".imagen-contenedor");
  contenedor.style.borderColor = "blue";

  const inputsDiv = document.getElementById("inputs");
  inputsDiv.innerHTML = "";

  // Botón ir a pagina index
  document.getElementById("salir-palabras").addEventListener("click", () => {
    location.href = "../index.html";
  });

  // Creamos las casillas exactamente con la longitud de la palabra congelada
  for (let i = 0; i < palabraObjetivo.length; i++) {
    const input = document.createElement("input");
    input.maxLength = 1;
    input.dataset.index = String(i);

    // Reset visual
    input.style.backgroundColor = "white";

    // Al escribir
    input.addEventListener("input", (e) => {
      const idx = parseInt(e.target.dataset.index, 10);

      if (!comprobado) {
        // Auto-salto antes de comprobar
        const siguiente = inputsDiv.querySelector(
          `input[data-index='${idx + 1}']`
        );
        if (siguiente && e.target.value !== "") {
          siguiente.focus();
        }
      } else {
        // Después de comprobar: al cambiar, vuelve a blanco
        e.target.style.backgroundColor = "white";
      }
    });

    // Al hacer clic (focus)
    input.addEventListener("focus", (e) => {
      if (comprobado && e.target.value !== "") {
        // Después de comprobar: clic borra para corregir
        e.target.value = "";
        e.target.style.backgroundColor = "white";
      }
    });

    inputsDiv.appendChild(input);
  }

  document.getElementById("btnSiguiente").disabled = true;
}

function comprobar() {
  // Usamos SIEMPRE la palabra congelada
  const inputs = document.querySelectorAll("#inputs input");

  // Si por cualquier motivo el número de casillas no coincide, reconstruimos (defensivo)
  if (inputs.length !== palabraObjetivo.length) {
    mostrarImagen();
    return;
    // Nota: mostramos de nuevo y salimos para no evaluar con longitudes distintas.
  }

  let resultado = "";
  inputs.forEach((input) => (resultado += input.value.toLowerCase()));

  const contenedor = document.querySelector(".imagen-contenedor");
  const botonSiguiente = document.getElementById("btnSiguiente");

  // Pintamos letra a letra según la palabra congelada
  for (let i = 0; i < palabraObjetivo.length; i++) {
    const esperado = palabraObjetivo[i]?.toLowerCase() ?? "";
    const actualLetra = (inputs[i].value || "").toLowerCase();

    if (actualLetra === esperado) {
      inputs[i].style.backgroundColor = "#9f9"; // verde suave
    } else {
      inputs[i].style.backgroundColor = "#f99"; // rojo suave
    }
  }

  if (resultado === palabraObjetivo.toLowerCase()) {
    contenedor.style.borderColor = "green";
    botonSiguiente.disabled = false;
  } else {
    contenedor.style.borderColor = "red";
    botonSiguiente.disabled = true;
  }

  comprobado = true; // desde aquí rige el comportamiento post-comprobación
}

function siguiente() {
  if (actual < seleccionados.length - 1) {
    actual++;
    mostrarImagen();
  } else {
    alert("¡Has terminado!");
    location.reload();
  }
}
