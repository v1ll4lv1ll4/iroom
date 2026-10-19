function mostrarModal(mensajeHtml) {
    var modal = document.getElementById("modalErrores");
    var parrafo = document.getElementById("mensajeError");

    if (modal && parrafo) {
        parrafo.innerHTML = mensajeHtml;
        modal.showModal();
    }
}

function calcular(operacion) {
    var op1 = parseFloat(document.getElementById("operando1").value);
    var op2 = parseFloat(document.getElementById("operando2").value);
    var pantalla = document.getElementById("pantalla_resultado");
    var unidad = document.getElementById("unidad_actual").value;

    if (isNaN(op1) || isNaN(op2)) {
        mostrarModal("Por favor, introduce números válidos en ambos campos.");
        return;
    }

    var resultado = 0;

    if (operacion === "+") {
        resultado = op1 + op2;
    } else if (operacion === "-") {
        resultado = op1 - op2;
    } else if (operacion === "*") {
        resultado = op1 * op2;
    } else if (operacion === "/") {
        if (op2 === 0) {
            mostrarModal("Error: No se puede dividir entre cero.");
            return;
        }
        resultado = op1 / op2;
    }

    var simbolo = "";
    if (unidad === "C") simbolo = " °C";
    else if (unidad === "K") simbolo = " K";
    else if (unidad === "F") simbolo = " °F";

    pantalla.innerHTML = resultado.toFixed(2) + simbolo;
}

function convertir() {
    var pantalla = document.getElementById("pantalla_resultado");
    var unidadOrigen = document.getElementById("unidad_actual").value;
    var unidadDestino = document.getElementById("unidad_destino").value;

    if (unidadOrigen === unidadDestino) {
        mostrarModal("Ya estás en esa unidad.");
        return;
    }

    var textoPantalla = pantalla.innerHTML;
    var valorActual = parseFloat(textoPantalla);

    if (isNaN(valorActual)) {
        mostrarModal("No hay ningún resultado válido para convertir.");
        return;
    }

    var resultadoConvertido = 0;
    var valorEnCelsius = 0;

    if (unidadOrigen === "C") {
        valorEnCelsius = valorActual;
    } else if (unidadOrigen === "K") {
        valorEnCelsius = valorActual - 273.15;
    } else if (unidadOrigen === "F") {
        valorEnCelsius = (valorActual - 32) * 5 / 9;
    }

    var simboloDestino = "";
    if (unidadDestino === "C") {
        resultadoConvertido = valorEnCelsius;
        simboloDestino = " °C";
    } else if (unidadDestino === "K") {
        resultadoConvertido = valorEnCelsius + 273.15;
        simboloDestino = " K";
    } else if (unidadDestino === "F") {
        resultadoConvertido = (valorEnCelsius * 9 / 5) + 32;
        simboloDestino = " °F";
    }

    pantalla.innerHTML = resultadoConvertido.toFixed(2) + simboloDestino;
    document.getElementById("unidad_actual").value = unidadDestino;
}
