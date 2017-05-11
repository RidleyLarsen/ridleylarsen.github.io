var habitats = {"any": {}};
var pokemon = {};
function process_pokemon (response) {
  json = response;

  pokemon[json.name] = json;
  if (json.habitat !== null && habitats[json.habitat.name] === undefined) {
    habitats[json.habitat.name] = {};
  }
  for (var i = 0; i < json.pokedex_numbers.length; i++) {
    if (json.habitat !== null) {
      if (habitats[json.habitat.name][json.pokedex_numbers[i].pokedex.name] === undefined) {
        habitats[json.habitat.name][json.pokedex_numbers[i].pokedex.name] = [];
      } else {
        habitats[json.habitat.name][json.pokedex_numbers[i].pokedex.name].push(json.name);
      }
    }
    if (habitats["any"][json.pokedex_numbers[i].pokedex.name] === undefined) {
      habitats["any"][json.pokedex_numbers[i].pokedex.name] = [];
    }
    habitats["any"][json.pokedex_numbers[i].pokedex.name].push(json.name);
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
  $('button').removeAttr("disabled");
});
function get_first_evolution(pkmn) {
  while (pkmn.evolves_from_species !== null) {
    pkmn = pokemon[pkmn.evolves_from_species.name]
  }
  return pkmn;
}

$("#btn-choose-pkmn").on('click', function () {
  selected_habitat = habitats[$('#habitats').val()][$('#pokedex').val()];
  _pkmn = pokemon[selected_habitat[parseInt(Math.random() * selected_habitat.length)]];
  if ($('#first_evo_only').is(":checked")) {
    _pkmn = get_first_evolution(_pkmn);
  }
  var img = $('<img>');
  $(img).attr('src', 'https://img.pokemondb.net/artwork/' + _pkmn.name + '.jpg')
  $('#pokemon').append(img);
})

$("#reset").on('click', function () {
  $('#pokemon').empty();
})
