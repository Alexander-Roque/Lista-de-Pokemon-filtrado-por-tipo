const form = document.forms.list
let searchId = 0
let globalPokemonData;

async function fetchPokemon(){
    const formData = new FormData(form)
        const selectedType = formData.get("type")

        const URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
        const response = await fetch(`${URL}`)
        if (!response.ok) throw new Error("Pokémon no encontrado")
        const pokemonData = await response.json()
    return pokemonData
}

async function pokemonDataInt(pokemonData) {
    const allPokemonDetails = []
for (const namePokemon of pokemonData.results){
    const URL = namePokemon.url
    const response = await fetch(URL)
    const pokeDataIntert = await response.json()
    allPokemonDetails.push(pokeDataIntert)
    }
    return allPokemonDetails
}

async function filterByType(pokeDataIntert){
    const typesData = []
    for (const types of pokeDataIntert.types){

        const nameType = types.type.name
        const URL = types.type.url

        const response = await fetch (URL)
        const pokeTypeData = await response.json()

        const imgUrl = pokeTypeData.sprites["generation-viii"]["sword-shield"].name_icon

        typesData.push({name: nameType, url: imgUrl})
    }
    return typesData
}


form.addEventListener("submit", async (event)=> {
    event.preventDefault()
    try {
        const allPokemon = await fetchPokemon()
        const allDataInter = await pokemonDataInt(allPokemon)

        for (const pokemones of allDataInter){
            const types = await filterByType(pokemones)

            createCard (pokemones, types)
        }
    }catch (error) {
        console.error(error);
    }
 })


const TypeSelectChange = document.getElementById ("type")

// TypeSelectChange.addEventListener("change", ()=>{
//     document.querySelectorAll (".pokemon-card").forEach(card => card.remove())
//     searchId++
// })

function createCard (pokemon, types){
    const card = document.createElement ("div")
    card.classList.add ("pokemonCard")

    const title = document.createElement ("p")
    title.textContent = pokemon.name
    title.classList.add ("titleCard")

    const imagen = document.createElement ("img")
    imagen.src = pokemon.sprites.front_default
    imagen.classList.add ("imagenCard")
    
    types.forEach(t => {
        
        const type = document.createElement("p")
        type.textContent = t.name
        type.classList.add ("typeCard")
    
        const typeImg = document.createElement("img")
        typeImg.src = t.url
        typeImg.classList.add ("typeImgCard")
    
        card.append (type)
        card.append (typeImg)

    });

    card.prepend (title);
    card.prepend (imagen);

    const articleContainer = document.querySelector (".containerPokemon")
    if(articleContainer){
        articleContainer.append(card)
    }
}
