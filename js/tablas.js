$(document).ready(function(){
	$(".pagina:not(:first)").hide();
	function darFormato(pagina){
		var contenedor="#pagina"+pagina;
		$(contenedor+" table").css({
			"width": "90%",
			"margin": "0 auto",
			"border-collapse": "collapse"
		});

		$(contenedor+" th").css({
			"background-color": "#cce5ff",
			"color": "#004085",
			"padding": "10px",
			"border": "1px solid #aab9ca",
			"text-align": "center"
		});

		$(contenedor+" td").css({
			"padding": "8px",
			"border": "1px solid #aab9ca",
			"text-align": "center"
		});

		$(contenedor+" tr:odd").css("background-color","#f2f6fb");
	}

	darFormato(1);

	function cargarXML(){
		var peticion = new XMLHttpRequest();
		peticion.open("GET", "datos/estaciones_pagina3.xml");

		peticion.onload = function(){
			var tabla = document.getElementById("datos_xml");

			if (peticion.status != 200) {
				tabla.innerHTML = '<tr><td colspan="6">Error al cargar el XML</td></tr>';
				return;
			}

			var estaciones = peticion.responseXML.getElementsByTagName("estacion");
			var campos = ["ciudad", "temperatura", "humedad", "ruido", "luz", "color"];
			tabla.innerHTML = "";

			for (var i = 0; i < estaciones.length; i++) {
				var fila = "<tr>";
				for (var j = 0; j < campos.length; j++) {
					fila += "<td>" + estaciones[i].getElementsByTagName(campos[j])[0].textContent + "</td>";
				}
				tabla.innerHTML += fila + "</tr>";
			}

			darFormato(3);
			filtrarCiudades();
		};

		peticion.send();
	}


	function cargarJSON(){
		$.getJSON("datos/estaciones_pagina4.json", function(estaciones){
			$("#datos_json").empty();

			$.each(estaciones, function(i, e){
				$("#datos_json").append(
					"<tr><td>" + e.ciudad + "</td><td>" + e.temperatura + "</td><td>" + e.humedad +
					"</td><td>" + e.ruido + "</td><td>" + e.luz + "</td><td>" + e.color + "</td></tr>"
				);
			});

			darFormato(4);
			filtrarCiudades();
		}).fail(function(){
			$("#datos_json").html('<tr><td colspan="6">Error al cargar el JSON</td></tr>');
		});
	}

	function dibujarHistograma(){
		$("#histograma").empty();

		var marcado = $(".checkbox-histograma:checked");
		if (marcado.length == 0) return;

		var columna = parseInt(marcado.val());
		var datos = [];
		var maximo = 0;

		$(".pagina:visible tr:visible").has("td").each(function(){
			var celdas = $(this).children("td");
			var valor = parseFloat(celdas.eq(columna).text());
			datos.push({ ciudad: celdas.eq(0).text(), valor: valor });
			if (valor > maximo) maximo = valor;
		});

		$("#histograma").append("<h3>Histograma de " + marcado.parent().text().trim() + "</h3>");

		$.each(datos, function(i, d){
			var ancho = d.valor / maximo * 100;
			$("#histograma").append(
				'<div class="hist-fila">' +
					'<span class="hist-ciudad">' + d.ciudad + '</span>' +
					'<div class="hist-fondo"><div class="hist-barra" style="width:' + ancho + '%"></div></div>' +
					'<span class="hist-valor">' + d.valor + '</span>' +
				'</div>'
			);
		});
	}

	$(".checkbox-histograma").on("change", function(){
		$(".checkbox-histograma").not(this).prop("checked", false);
		dibujarHistograma();
	});


	function filtrarCiudades(){
		var texto = $("#buscarCiudad").val().trim().toLowerCase();

		$(".pagina:visible tr").has("td").each(function(){
			var ciudad = $(this).children("td").eq(0).text().toLowerCase();
			$(this).toggle(ciudad.includes(texto));
		});

		dibujarHistograma();
	}

	$("#buscarCiudad").on("input", filtrarCiudades);


	$(".pagina-link").on("click", function(evento){
		evento.preventDefault();
		var pagina=$(this).data("pagina");
		darFormato(pagina);
		$(".pagina").hide();
		$("#pagina"+pagina).show();

		$("#buscarCiudad").val("");
		if (pagina == 3) {
			cargarXML();
		} else if (pagina == 4) {
			cargarJSON();
		} else {
			filtrarCiudades();
		}
	});
});
