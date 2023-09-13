const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonModal = document.getElementById('modalPokemon')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="toggleModal(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonToModal(pokemon){
    modal.classList = pokemon.type

    return `            
        <div id="modalHeader">
        <h1 id="modalNumber">${pokemon.number}</h1>
        <h1 id="modalName">${pokemon.name}</h1>

        <ol id="modalTypes">
                    ${pokemon.types.map((type) => `<li id="modalType" class="${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.photo}"
            alt="${pokemon.name}">
    </div>
    <div id="modalBody">
        <h1 id="pokemonStatus">Pokemon Status</h1>
        <h4 id="hp">HP: ${pokemon.hp}</h4>
        <h4 id="attack">ATTACK: ${pokemon.attack}</h4>
        <h4 id="defense">DEFENSE: ${pokemon.defense}</h4>
        <h4 id="spAttack">SP ATTACK: ${pokemon.spAttack}</h4>
        <h4 id="spDefense">SP DEFENSE: ${pokemon.spDefense}</h4>
        <h4 id="speed">SPEED: ${pokemon.speed}</h4>
        <h4 id="total">TOTAL: ${pokemon.total}</h4>
    </div>`
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadPokemonModal(id){
    pokeApi.getPokemonModal(id).then((pokemon) =>{
        const newHtml = convertPokemonToModal(pokemon)
        pokemonModal.innerHTML = newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})