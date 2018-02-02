var scopeGlobal = {
	numberRandom: 9
};

function templateLis (data){
	return '<li>POPULATION: ' + data.population + '</li><li>CLIMATED: '+ data.climate +'</li><li>TERRAIN: '+ data.terrain +'</li>';
}

function getRandomNumber (length){
	var numberRandomInside = Math.floor(Math.random() * length);

	if (scopeGlobal.numberRandom === numberRandomInside) {
		numberRandomInside = Math.floor(Math.random() * length);
	}

	scopeGlobal.numberRandom = numberRandomInside;

	return numberRandomInside;
}

function templateFilm (item){
	return '<li>Films: ' + item.filmsChoosed + '</li>';
}


function cliqueBotao(){  
	jQuery.ajax({ 
		type: "GET", 
		dataType: "json", 
		url: "https://swapi.co/api/planets", 
		success: function(response){
			var planetsLenght = response.results.length;
			var planetChoosed = response.results[getRandomNumber(planetsLenght)];

			$('.header h1').text(planetChoosed.name);
			$('.population').html(templateLis(planetChoosed));

			planetChoosed.films.forEach(function(item, index){

				jQuery.ajax({ 
					type: "GET", 
					dataType: "json", 
					url: item,
					success: function(responseFilms){
						$('.population').append('<li>Film ' + responseFilms.title + '</li>');
					} 
				});

			})

		} 
	}); 
}



$(document).ready(function(){ 
	$("#next").on('click', cliqueBotao); 
}); 