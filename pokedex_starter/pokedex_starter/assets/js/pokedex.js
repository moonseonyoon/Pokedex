//image src
// OLDER POKEMON (gen V and earlier)
// DATA.sprites.versions["generation-v"]["black-white"].animated.front_default

//NEW POKEMON
// DATA.sprites.font_default

let currentPokemon;

function getPokemonData(pokemon) {
  weight.textContent = "";
  height.textContent = "";
  description.textContent = "";
  id.textContent = "";
  sprite.src = "";

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      // REQUEST IS GOOD
    } else if (xhr.readyState === xhr.DONE) {
      // Error handling
      description.textContent = "INVALID DATA :(";
    }
  });

  xhr.addEventListener("load", function () {
    const data = JSON.parse(xhr.responseText);
    const name = document.querySelector("#name");

    id.textContent = data.id;
    currentPokemon = data.id;

    sprite.src =
      data.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;

    if (data.id >= 650 && data.id <= 1010) {
      sprite.src = data.sprites.front_default;
    }

    name.textContent = data.name;

    height.textContent = data.height / 10;
    weight.textContent = data.weight / 10;
  });

  xhr.send(null);
}

function getPokemonData2(pokemon) {
  const xhr = new XMLHttpRequest(); //STEP 1

  xhr.open("GET", `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

  xhr.addEventListener("load", function () {
    const data = JSON.parse(xhr.responseText);

    for (let genera of data.genera) {
      if (genera.language.name === "en") {
        genus.textContent = genera.genus.slice(0, -7);
        break;
      }
    }

    for (let flavor of data.flavor_text_entries) {
      if (flavor.language.name === "en") {
        description.textContent = flavor.flavor_text;
        break;
      }
    }
  });

  xhr.send(null);
}

const controllerLeft = document.querySelector(".direction-pad .left");
const controllerRight = document.querySelector(".direction-pad .right");

const searchName = document.querySelector(".controls input");

controllerLeft.addEventListener("click", function () {
  if (currentPokemon > 1) {
    currentPokemon--;
    getPokemonData(currentPokemon);
    getPokemonData2(currentPokemon);
  } else {
    return;
  }
});

controllerRight.addEventListener("click", function () {
  if (currentPokemon < 1010) {
    currentPokemon++;
    getPokemonData(currentPokemon);
    getPokemonData2(currentPokemon);
  } else {
    return;
  }
});

searchName.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    getPokemonData(searchName.value);
    getPokemonData2(searchName.value);
  }
});

getPokemonData(1);
getPokemonData2(1);
