var formularioValido = true;

function mostrarModal(mensajeHtml) {
    var modal = document.getElementById("modalErrores");
    var parrafo = document.getElementById("mensajeError");

    if (modal && parrafo) {
        parrafo.innerHTML = mensajeHtml;
        modal.showModal();
    }
}

function cerrarModal() {
    var modal = document.getElementById("modalErrores");
    if (modal) {
        modal.close();
    }
}

function diferenciaTemp() {
    var minTemp = parseFloat(document.getElementById("t_minima").value);
    var maxTemp = parseFloat(document.getElementById("t_maxima").value);
    var out = document.getElementById("diferencia");

    if (!isNaN(minTemp) && !isNaN(maxTemp)) {
        if (maxTemp < minTemp) {
            mostrarModal("Error: La temperatura máxima debe ser mayor o igual que la mínima.");
            out.innerHTML = "";
            return false;
        } else {
            var resultado = maxTemp - minTemp;
            out.innerHTML = resultado;
            return true;
        }
    }
    return true;
}

function validarPais() {
    var pais = document.getElementById("pais").value.trim().toLowerCase();
    var paisesPermitidos = ["españa", "portugal", "francia", "italia", "grecia"];

    if (pais === "") {
        return "El país es un campo obligatorio. ";
    }

    if (!paisesPermitidos.includes(pais)) {
        return "El país introducido no es válido. ";
    }

    localStorage.setItem("pais_guardado", pais);
    return "";
}

function validarTemperatura() {
    var campo = document.getElementById("t_actual");
    if (!campo) return "";

    var valor = campo.value.trim();
    var temperatura = parseFloat(valor);

    if (valor === "" || isNaN(temperatura)) {
        return "Introduce una temperatura actual válida. ";
    }

    if (temperatura < 22 || temperatura > 26) {
        mostrarModal("Advertencia: La temperatura está fuera del intervalo de 22 a 26 ºC.");
    }

    localStorage.setItem("temp_guardada", temperatura);
    return "";
}

function guardarCiudad() {
    var campo = document.getElementById("ciudad");
    if (campo && campo.value.trim() !== "") {
        localStorage.setItem("ciudad_guardada", campo.value.trim());
    }
}

function guardarURL() {
    var campo = document.getElementById("url");
    if (campo && campo.value.trim() !== "") {
        localStorage.setItem("url_guardada", campo.value.trim());
    }
}

function guardarTempMaxMin() {
    var maxTemp = document.getElementById("t_maxima");
    var minTemp = document.getElementById("t_minima");

    if (maxTemp && maxTemp.value !== "") {
        localStorage.setItem("t_max_guardada", maxTemp.value);
    }
    if (minTemp && minTemp.value !== "") {
        localStorage.setItem("t_min_guardada", minTemp.value);
    }
}

function evaluarContrasena() {
    var campo = document.getElementById("contrasena");
    var indicador = document.getElementById("nivelContrasena");

    if (!campo || !indicador) return;

    var longitud = campo.value.length;

    if (longitud === 0) {
        indicador.textContent = "Sin introducir";
    } else if (longitud < 9) {
        indicador.textContent = "Insuficiente (menos de 9 caracteres)";
        indicador.style.color = "red";
    } else if (longitud <= 12) {
        indicador.textContent = "Cumple el mínimo (9 a 12 caracteres)";
        indicador.style.color = "orange";
    } else {
        indicador.textContent = "Longitud alta (13 caracteres o más)";
        indicador.style.color = "green";
    }
}

function validarContrasena() {
    var campo = document.getElementById("contrasena");
    if (campo && campo.value.length < 9) {
        return "La contraseña debe tener al menos 9 caracteres. ";
    }
    return "";
}

function guardarCoordenadas() {
    var inputCoords = document.getElementById("coordenadas");
    if (inputCoords && inputCoords.value.trim() !== "") {
        localStorage.setItem("coordenadas_gps", inputCoords.value.trim());
    }
}

function cargarMapa() {
    var coordenadas = localStorage.getItem("coordenadas_gps");
    var enlaceMapa = document.getElementById("enlace_mapa");
    var textoCoords = document.getElementById("dato_coordenadas");

    if (!coordenadas || !enlaceMapa) return;

    if (textoCoords) textoCoords.innerHTML = coordenadas;

    var lat = 0;
    var lon = 0;

    if (coordenadas.indexOf("º") !== -1) {
        var partes = coordenadas.split(",");

        function convertirDMSaDecimal(dmsStr) {
            dmsStr = dmsStr.trim();
            var multiplicador = 1;
            if (dmsStr.indexOf("S") !== -1 || dmsStr.indexOf("W") !== -1) {
                multiplicador = -1;
            }

            var numeros = dmsStr.match(/\d+(\.\d+)?/g);
            if (numeros && numeros.length >= 3) {
                var grados = parseFloat(numeros[0]);
                var minutos = parseFloat(numeros[1]);
                var segundos = parseFloat(numeros[2]);
                return multiplicador * (grados + (minutos / 60) + (segundos / 3600));
            }
            return 0;
        }

        lat = convertirDMSaDecimal(partes[0]);
        lon = convertirDMSaDecimal(partes[1]);
    } else {
        var partes = coordenadas.split(",");
        if (partes.length >= 2) {
            lat = parseFloat(partes[0]);
            lon = parseFloat(partes[1]);
        }
    }

    enlaceMapa.href = "https://www.google.com/maps?q=" + lat + "," + lon;
}

function validarEmailCadenas(correo) {
    var posArroba = correo.indexOf("@");
    var ultimoPunto = correo.lastIndexOf(".");

    if (correo.indexOf(" ") !== -1) return false;
    if (posArroba <= 0) return false;
    if (posArroba !== correo.lastIndexOf("@")) return false;
    if (ultimoPunto < posArroba + 2) return false;
    if (ultimoPunto > correo.length - 3) return false;

    return true;
}

function validarEmailRegex(correo) {
    var patron = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/i;
    return patron.test(correo);
}

function comprobarEmail(usarRegex) {
    var campo = document.getElementById("email");
    if (!campo) return false;

    var correo = campo.value.trim();
    var resultado = document.getElementById("resultadoEmail");

    var esValido = false;
    var metodoUsado = "";

    if (usarRegex) {
        esValido = validarEmailRegex(correo);
        metodoUsado = "expresión regular";
    } else {
        esValido = validarEmailCadenas(correo);
        metodoUsado = "cadenas";
    }

    if (!esValido) {
        mostrarModal("Error: Formato de correo electrónico inválido (validado con " + metodoUsado + ").");
        if (resultado) resultado.innerHTML = "Correo inválido.";
        return false;
    } else {
        mostrarModal("¡Éxito! El correo electrónico es correcto (validado con " + metodoUsado + ").");
        if (resultado) resultado.innerHTML = "Correo correcto.";

        localStorage.setItem("correo_guardado", correo);
        return true;
    }
}

function validarFormulario(event) {
    event.preventDefault();
    var mensajesError = "";

    var errPais = validarPais();
    var errTemp = validarTemperatura();
    var errCont = validarContrasena();
    var errDiff = !diferenciaTemp();

    if (errPais !== "") mensajesError += "<li>" + errPais + "</li>";
    if (errTemp !== "") mensajesError += "<li>" + errTemp + "</li>";
    if (errCont !== "") mensajesError += "<li>" + errCont + "</li>";
    if (errDiff) mensajesError += "<li>La temperatura máxima debe ser mayor o igual que la mínima.</li>";

    if (mensajesError !== "") {
        mostrarModal("CORRIGE ESTOS ERRORES:<br><br><ul>" + mensajesError + "</ul>");
	guardarCoordenadas();
	guardarCiudad();
	guardarURL();
	guardarTempMaxMin();
	cargarMapa();
    } else {
        guardarCoordenadas();
        guardarCiudad();
        guardarURL();
        guardarTempMaxMin();
	cargarMapa();

        mostrarModal("¡Formulario validado con éxito! Se ha guardado la información localmente.");
    }
}

function guardarNombre(event) {
    if (event) event.preventDefault();

    var campo = document.getElementById("nombre");
    if (campo) {
        var nombre = campo.value.trim();
        localStorage.setItem("fname", nombre);
        mostrarModal("¡Nombre guardado correctamente!");
    }
}

window.addEventListener("load", function() {

    var nombre_guardado = localStorage.getItem("fname");
    if (nombre_guardado !== null) {
        var info_nombre = document.getElementById("info_nombre");
        if (info_nombre) info_nombre.innerHTML = "Hola " + nombre_guardado + ": Bienvenido a Smart Room";
    }

    var dato_pais = document.getElementById("dato_pais");
    var dato_ciudad = document.getElementById("dato_ciudad");
    var dato_temp = document.getElementById("dato_t_actual");
    var dato_url = document.getElementById("dato_url");
    var dato_t_max = document.getElementById("dato_t_maxima");
    var dato_t_min = document.getElementById("dato_t_minima");
    var dato_correo = document.getElementById("dato_correo");

    if (dato_pais && localStorage.getItem("pais_guardado")) dato_pais.innerHTML = localStorage.getItem("pais_guardado");
    if (dato_ciudad && localStorage.getItem("ciudad_guardada")) dato_ciudad.innerHTML = localStorage.getItem("ciudad_guardada");
    if (dato_temp && localStorage.getItem("temp_guardada")) dato_temp.innerHTML = localStorage.getItem("temp_guardada");

    var url_guardada = localStorage.getItem("url_guardada");
    if (dato_url && url_guardada) {
        dato_url.innerHTML = url_guardada;
        dato_url.href = url_guardada;
    }

    if (dato_t_max && localStorage.getItem("t_max_guardada")) dato_t_max.innerHTML = localStorage.getItem("t_max_guardada");
    if (dato_t_min && localStorage.getItem("t_min_guardada")) dato_t_min.innerHTML = localStorage.getItem("t_min_guardada");
    if (dato_correo && localStorage.getItem("correo_guardado")) dato_correo.innerHTML = localStorage.getItem("correo_guardado");

    var campoContrasena = document.getElementById("contrasena");
    if (campoContrasena) campoContrasena.addEventListener("input", evaluarContrasena);

    cargarMapa();
});
