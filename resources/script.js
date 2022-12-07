const pokeTitle = document.querySelector('#pokeTitle');
const pokemonContainer = document.querySelector(".contentApi");
const spinner = document.querySelector(".loader");
const searchInput = document.getElementById("searchInput");
const previous = document.querySelector(".previous");
const next = document.querySelector('.next');
const btnSearch = document.getElementById('btnSearch');

let offset = 1;
let limit = 8;

window.onload = () => {
    fetchPoke(offset, limit);
};

btnSearch.addEventListener('click' || 'keyup', (e) => {
    searchPokemon(searchInput.value)
})


function searchPokemon(i){
    pokemonContainer.innerHTML = " ";
    fetchPoke(i);
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
    sprite.classList.add('img-src');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite)

    const number = document.createElement('p');
    number.classList.add('number');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const spriteBack = document.createElement('img');
    spriteBack.classList.add('img-src');
    spriteBack.src = pokemon.sprites.back_default;

    const lifeBar = document.createElement('i');
    lifeBar.className = 'fi fi-rr-heart';
    lifeBar.textContent = ` =  ${pokemon.stats[0].base_stat}`;

    const attackBar = document.createElement('i');
    attackBar.className = 'fi fi-rs-sword'
    attackBar.textContent = ` = ${pokemon.stats[1].base_stat}`;

    const defenseBar = document.createElement('i');
    defenseBar.className = 'fi fi-rr-shield-plus'
    defenseBar.textContent = ` = ${pokemon.stats[2].base_stat}`;
    
    const flipCard = document.createElement('div');
    flipCard.classList.add('backCard');

    flipCard.append(spriteBack, lifeBar, attackBar, defenseBar);
    card.append(spriteContainer, number, name, flipCard);
    pokemonContainer.appendChild(card);
}