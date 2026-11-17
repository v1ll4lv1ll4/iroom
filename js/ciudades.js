$(document).ready(function(){
	$("#pais").on("change", function(){
		var pais=$("#pais").val().trim().toLowerCase();
		var archivo="";

		if(pais=="españa"){
			archivo="datos/ciudades_espana.txt";
		}
		else if(pais=="portugal"){
			archivo="datos/ciudades_portugal.txt";
		}
		else if(pais=="francia"){
			archivo="datos/ciudades_francia.txt";
		}
		else if(pais=="italia"){
			archivo="datos/ciudades_italia.txt";
		}

		$("#ciudad").html('<option value="">Selecciona una ciudad</option>');
		if(archivo!==""){
			$.get(archivo, function(datos){
				var ciudades=datos.split("\n");
				for (var i=0; i<ciudades.length; i++){
					var ciudad=ciudades[i].trim();
					if (ciudad!==""){
						$("#ciudad").append(
							$("<option>").val(ciudad).text(ciudad)
						);
					}
				}
			}).fail(function(){
				$("#ciudad").html('<option value="">Error al cargar ciudades</option>');
			});
		}
		else{
			$("#ciudad").html('<option value="">País no disponible</option>');
		}
	});
});
