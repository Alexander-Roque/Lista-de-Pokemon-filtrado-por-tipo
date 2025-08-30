const form = document.forms.list

form.addEventListener("submit", async function getPokemon(event) {
    event.preventDefault()
    try{
        const formData = new FormData(form)
        const pokemon = formData.get("name")
        const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        const response = await fetch(`${URL}/pokemon/${pokemon}`)
         if (!response.ok) throw new Error("Pokémon no encontrado")
        const pokemonData = await response.json()
        for (const namePokemon of pokemonData.results) {
            const URL = namePokemon.url
            const response = await fetch(URL)
            const pokeDataIntert = await response.json()
            createCard (pokeDataIntert)
            for (const types of pokeDataIntert.types) {
                const nameType = types.type.name
                const URL = types.type.url
                const response = await fetch (URL)
                const pokeTypeData = await response.json()
                // console.log(pokeTypeData.sprites["generation-viii"]["sword-shield"].name_icon)
                typeImage(types)
            }
        }
        
    } catch (error){
        console.error(error)
    }
} )

function createCard (pokemon){
    const card = document.createElement ("div")
    

    const title = document.createElement ("p")
    title.textContent = pokemon.name
    
    function typeImage (pokeType){
        const type = document.createElement ("p")
        title.textContent = pokeType.name
        const typeImg = document.createElement ("img")
        typeImg.src = pokeType.sprites["generation-viii"]["sword-shield"].name_icon

        card.appendChild (type)
        card.appendChild (typeImg)
    }

    const imagen = document.createElement ("img")
    imagen.src = pokemon.sprites.front_default
    

    card.appendChild (title);
    card.appendChild (imagen);
    document.body.appendChild (card)
}
