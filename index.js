const form = document.forms.list

async function getPokemon() {
    try{
        const formData = new FormData(form)
        const pokemon = formData.get("name")

        const URL = "https://pokeapi.co/api/v2/"
        const response = await fetch(`${URL}/pokemon/${pokemon}`)
        const pokemonData = await response.json()
        console.log(pokemonData)

    } catch (error){
        console.error(error)
    }
    
}

getPokemon()