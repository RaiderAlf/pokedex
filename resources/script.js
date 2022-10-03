const pokemonContainer = document.querySelector(".contentApi");
const spinner = document.querySelector("#spinner");
const searchInput = document.querySelector("#search");
const previous = document.querySelector(".previous");
const next = document.querySelector('.next');

let offset = 1;
let limit = 8;

window.onload = () => {
    fetchPoke(offset, limit)
}

previous.addEventListener('click', () => {
   if(offset >= 9){
    offset -= 8;
    pokemonContainer.innerHTML = " ";
    fetchPoke(offset, limit)
   }
})

next.addEventListener('click', () => {
    offset += 8;
    pokemonContainer.innerHTML = " ";
    fetchPoke(offset, limit)

})

function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then((data) => {
            createPokemon(data);
            spinner.style.display = "none"
        })
};


function fetchPoke(offset, limit) {
    spinner.style.display = "none"
    for(let i = offset; i <= offset + limit; i++){
        fetchPokemon(i)
    } 
};


function createPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-block');
    card.id = "pokemon-block";
    if(card) {
        card.addEventListener('click', () => {
        card.classList.replace('pokemon-block', 'pokemon-block-focus')
    })
    }else{
        console.log("pokemon block doesn`t exists")
    }

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