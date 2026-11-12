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
			"background-color": "cce5ff",
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

	$(".pagina-link").on("click", function(evento){
		evento.preventDefault();
		var pagina=$(this).data("pagina");
		darFormato(pagina);
		$(".pagina").hide();
		$("#pagina"+pagina).show();
	});
});
