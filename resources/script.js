const pokeTitle = document.querySelector('#pokeTitle');
const pokemonContainer = document.querySelector(".contentApi");
const spinner = document.querySelector(".loader");
const searchInput = document.querySelector("#search");
const previous = document.querySelector(".previous");
const next = document.querySelector('.next');

let offset = 1;
let limit = 8;

window.onload = () => {
    fetchPoke(offset, limit);
};

previous.addEventListener('click', () => {
   if(offset >= 8){
    offset -= 9;
    pokemonContainer.innerHTML = " ";
    fetchPoke(offset, limit);
   };
});

next.addEventListener('click', () => {
    offset += 9;
    pokemonContainer.innerHTML = " ";
    fetchPoke(offset, limit);
});

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then((data) => {
            createPokemon(data);
            spinner.style.display = "none"
        });
};


function fetchPoke(offset, limit) {
    spinner.style.display = "none"
    if(offset <= 8){
        previous.style.display = "none";
    }else {
        previous.style.display = "list-item"
    }
    for(let i = offset; i <= offset + limit; i++){
        fetchPokemon(i)
    };
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

    const lifeBar = document.createElement('span');


    card.append(spriteContainer, number, name);
    pokemonContainer.appendChild(card);

}