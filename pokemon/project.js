var habitats = {};
var pokemon = {};
function process_pokemon (response) {
  json = response;
  try {
    pokemon[json.name] = json;
    if (habitats[json.habitat.name] === undefined) {
      habitats[json.habitat.name] = {};
    }
    for (var i = 0; i < json.pokedex_numbers.length; i++) {
      if (habitats[json.habitat.name][json.pokedex_numbers[i].pokedex.name] === undefined) {
        habitats[json.habitat.name][json.pokedex_numbers[i].pokedex.name] = [];
      }
      habitats[json.habitat.name][json.pokedex_numbers[i].pokedex.name].push(json.name);
    }

  } catch (e) {

  }
}
fetch("pokemon/pokedex.json")
.then(response => response.json())
.then(function (pokedex) {
  for (var i = 1; i < pokedex.pokemon_entries.length; i++) {
    fetch("pokemon/" + i + ".json")
      .then(response => response.json())
      .then(function (response) {
        process_pokemon(response);
      })
  }
})
.then(function () {
  $('#spinner').remove();
  $('button').removeAttr("disabled")
  $.each(habitats, function (e) {
    console.log('<option val="' + e + '">' + e +'</option>');
  })
});
function get_first_evolution(pkmn) {
  console.log(pkmn);
  while (pkmn.evolves_from_species !== null) {
    pkmn = pokemon[pkmn.evolves_from_species.name]
  }
  return pkmn;
}
$("#btn-choose-pkmn").on('click', function () {
  selected_habitat = habitats[$('#habitats').val()][$('#pokedex').val()];
  _pkmn = pokemon[selected_habitat[parseInt(Math.random() * selected_habitat.length)]];
  console.log(_pkmn.name)
  _pkmn = get_first_evolution(_pkmn);
  var img = $('<img>');
  $(img).attr('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + _pkmn.id + '.png')
  $('#pokemon').append(img);
})
$("#reset").on('click', function () {
  $('#pokemon').empty();
})
