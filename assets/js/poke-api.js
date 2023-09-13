
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiDetailToPokemonModal(pokeDetail) {
    const pokemonModal = new PokemonModal()
    pokemonModal.number = pokeDetail.id
    pokemonModal.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemonModal.types = types
    pokemonModal.type = type

    pokemonModal.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemonModal.hp = pokeDetail.stats[0].base_stat

    pokemonModal.attack = pokeDetail.stats[1].base_stat

    pokemonModal.defense = pokeDetail.stats[2].base_stat

    pokemonModal.spAttack = pokeDetail.stats[3].base_stat

    pokemonModal.spDefense = pokeDetail.stats[4].base_stat

    pokemonModal.speed = pokeDetail.stats[5].base_stat

    pokemonModal.total = pokemonModal.hp + pokemonModal.attack + pokemonModal.defense + pokemonModal.spAttack + pokemonModal.spDefense + pokemonModal.speed

    return pokemonModal
}

pokeApi.getPokemonModal = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemonModal)

}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
