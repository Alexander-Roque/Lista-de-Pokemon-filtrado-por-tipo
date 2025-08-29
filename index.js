async function pokemons() {
    try {
        const url = "https://pokeapi.co/api/v2/"
        const response = await fetch(`${url}/pokemon`)
        if (!response.ok) throw new Error(response.statusText)
        const pokemonData = await response.json();
        console.log(pokemonData)
} catch (error) {
    console.error(error)
}


}

pokemons()