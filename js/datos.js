var formularioValido = true;

function diferenciaTemp() {
	var minTemp = parseFloat(document.getElementById("t_minima").value);
	var maxTemp = parseFloat(document.getElementById("t_maxima").value);
	var out = document.getElementById("diferencia");

	if (!isNaN(minTemp) && !isNaN(maxTemp)) {
		if (maxTemp < minTemp) {
			mostrarError("Error: La temperatura máxima debe ser mayor o igual que la mínima.");
			out.innerHTML = "";
			return false;
		} else {
			var resultado = maxTemp - minTemp;
			out.innerHTML = resultado;
			return true;
		}
	}
}

function mostrarError(mensaje) {
	document.getElementById("mensajeError").textContent = mensaje;
	document.getElementById("modalErrores").showModal();
	formularioValido = false;
}

function validarPais() {
	var pais = document.getElementById("pais").value.trim().toLowerCase();
	var paisesPermitidos = ["españa", "portugal", "francia", "italia", "grecia"];

	if (pais === "") {
		mostrarError("Error: El país es un campo obligatorio.");
		return false;
	}

	if (!paisesPermitidos.includes(pais)) {
		mostrarError("Error: El país introducido no es válido.");
		return false;
	}
	return true;
}

function validarTemperatura() {
	var nodoTemp = document.getElementById("valor_t_actual");
	if (!nodoTemp) return true;

	var valorTexto = nodoTemp.textContent.trim();
	var temperatura = Number(valorTexto);

	if (valorTexto === "" || isNaN(temperatura)) {
		mostrarError("Error: El valor de la temperatura actual en la página no es válido.");
		return false;
	}

	if (temperatura < 22 || temperatura > 26) {
		mostrarError("Advertencia: La temperatura está fuera del intervalo de 22 a 26 ºC.");
	}
	return true;
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
	
	if (!coordenadas || !enlaceMapa) return;

	var lat = 0, lon = 0;

	if (coordenadas.includes("º")) {
		var partes = coordenadas.split(",");
		
		function aDecimal(str) {
			var numeros = str.match(/\d+(\.\d+)?/g);
			var decimal = parseFloat(numeros[0]) + (parseFloat(numeros[1])/60) + (parseFloat(numeros[2])/3600);
			if (str.includes("S") || str.includes("W")) decimal = -decimal;
			return decimal;
		}

		lat = aDecimal(partes[0]);
		lon = aDecimal(partes[1]);
	} else {
		var partes = coordenadas.split(",");
		lat = parseFloat(partes[0]);
		lon = parseFloat(partes[1]);
	}

	enlaceMapa.href = "https://www.google.com/maps?q=" + lat + "," + lon;
}

function validarFormulario(event) {
	event.preventDefault();
	formularioValido = true;

	var paisValido = validarPais();

	if (paisValido) {
		var temValida = validarTemperatura();

		if (formularioValido) {
			guardarCoordenadas();
			event.target.submit();
		}
	}
}

function guardarNombre() {
	var nombre = document.getElementById("nombre").value;
	localStorage.setItem("fname", nombre);
	alert("¡Nombre guardado correctamente!");
}

var nombre_guardado = localStorage.getItem("fname");

if (nombre_guardado != null) {
	var info_nombre = document.getElementById("info_nombre");

	if (info_nombre) {
		info_nombre.innerHTML = "Hola " + nombre_guardado + ": Bienvenido a Smart Room";
	}
}

window.addEventListener("load", cargarMapa);
