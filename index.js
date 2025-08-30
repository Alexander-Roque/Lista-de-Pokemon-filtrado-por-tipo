const form = document.forms.list

form.addEventListener("submit", async function getPokemon(event) {
    event.preventDefault()
    try{
        const formData = new FormData(form)
        const pokemon = formData.get("name")
        const URL = "https://pokeapi.co/api/v2/"
        const response = await fetch(`${URL}/pokemon/${pokemon}`)
         if (!response.ok) throw new Error("Pokémon no encontrado")
        const pokemonData = await response.json()
        for (const namePokemon of pokemonData.results) {
            console.log(namePokemon)
        }
        

    } catch (error){
        console.error(error)
    }
} )

function createCard (pokemon){
    const card = document.createElement ("div")
    

    const title = document.createElement ("p")
    title.textContent = pokemon.name
    

    const type = document.createElement ("p")
    type.textContent = pokemon.types[0].type.name

    const imagen = document.createElement ("img")
    imagen.src = pokemon.sprites.front_default
    

    card.appendChild (title);
    card.appendChild (type)
    card.appendChild (imagen)    
    document.body.appendChild (card)
}
