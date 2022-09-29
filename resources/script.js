const pokemonContainer = document.querySelector(".contentApi");

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then((data) => createPokemon(data))
};

function fetchPoke(number) {
    for(let i = 1; i <= number; i++){
        fetchPokemon(i)
    } 
};

function createPokemon(pokemon) {
    console.log(pokemon)
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.classList.add('img-src')
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite)

    const number = document.createElement('p');
    number.classList.add('number');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    card.append(spriteContainer, number, name);
    pokemonContainer.appendChild(card);
}

fetchPoke(9)