const form = document.forms.list
let searchId = 0
let globalPokemonData;

async function fetchPokemon(){
    const formData = new FormData(form)
        const selectedType = formData.get("type")

        const URL = "https://pokeapi.co/api/v2/pokemon?limit="
        const response = await fetch(`${URL}/pokemon`)
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
    for (const types of pokeDataIntert.types ){

        const nameType = types.type.name
        const URL = types.type.url

        const response = await fetch (URL)
        const pokeTypeData = await response.json()

        typesData.push({name: nameType, url: URL})
    }
    return typesData
}


form.addEventListener("submit", async (event)=> {
    event.preventDefault()
    try {
        const allPokemon = await fetchPokemon()
        const allDataInter = await pokemonDataInt(allPokemon)
        // const data = await filterByType(allDataInter)

        for (const pokemones of allDataInter){
            createCard (pokemones)
        }
        // console.log (data)
        // console.log(allPokemon)

        // primero hay que hacer que funcione la lista de tipos
        // segundo filtra el tipo de pokemon
        // mejorar el diseño y borrar las cosas innesesarias
    }catch (error) {
        console.error(error);
    }
 })


const TypeSelectChange = document.getElementById ("type")

TypeSelectChange.addEventListener("change", ()=>{
    document.querySelectorAll (".pokemon-card").forEach(card => card.remove())
    searchId++
})

function createCard (pokemon){
    const card = document.createElement ("div")
    card.classList.add ("pokemonCard")

    const title = document.createElement ("p")
    title.textContent = pokemon.name
    title.classList.add ("titleCard")

    const imagen = document.createElement ("img")
    imagen.src = pokemon.sprites.front_default
    imagen.classList.add ("imagenCard")
    
    // typesData.forEach(typeObj => {
    //     if (typeObj) {
    //         // const type = document.createElement("p")
    //         // type.textContent = typeObj.name
    //         // type.classList.add ("typeCard")

    //         const typeImg = document.createElement("img")
    //         typeImg.src = typeObj.img
    //         typeImg.classList.add ("typeImgCard")
            
    //         // card.append (type)
    //         card.append (typeImg)
    //     }
    // })
    card.prepend (title);
    card.prepend (imagen);

    const articleContainer = document.querySelector (".containerPokemon")
    if(articleContainer){
        articleContainer.append(card)
    }
}
