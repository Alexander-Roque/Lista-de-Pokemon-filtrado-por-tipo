const form = document.forms.list
let searchId = 0
let globalPokemonData;

async function fetchPokemon(){
    const formData = new FormData(form)
        const selectedType = formData.get("type")

        const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        const response = await fetch(`${URL}/pokemon`)
        if (!response.ok) throw new Error("Pokémon no encontrado")
        const pokemonData = await response.json()
    return pokemonData
}

async function filterByType(pokemonData) {
for (const namePokemon of pokemonData.results){
    const URL = namePokemon.url
    const response = await fetch(URL)
    const pokeDataIntert = await response.json()

    const typesData = []

    for (const types of pokeDataIntert.types) {
            const nameType = types.type.name
            const URL = types.type.url

            const response = await fetch (URL)
            const pokeTypeData = await response.json()

        }  
        return {pokeDataIntert, typesData}
    }
}

fetchPokemon().then(pokemonData => {
    globalPokemonData = pokemonData;
}).catch(error=>{
    console.error(error)
});

form.addEventListener("submit", async (event)=> {
    event.preventDefault()
    try {
        const allPokemon = await fetchPokemon()
        const data = await filterByType(globalPokemonData)
        console.log (data)
        console.log(allPokemon)
    }catch (error) {
        console.error(error);
    }
    
    // searchId++
    // const currentSearch = searchId

    // document.querySelectorAll(".pokemon-card"),forEach(card => card.remove())
            // if(currentSearch !== searchId) return
            
            // createCard(pokeDataIntert, typesData)
 })

const TypeSelectChange = document.getElementById ("type")

TypeSelectChange.addEventListener("change", ()=>{
    document.querySelectorAll (".pokemon-card").forEach(card => card.remove())
    searchId++
})

function createCard (pokemon, typesData){
    const card = document.createElement ("div")
    card.classList.add ("pokemon-card")

    const title = document.createElement ("p")
    title.textContent = pokemon.name
    title.classList.add ("titleCard")

    const imagen = document.createElement ("img")
    imagen.src = pokemon.sprites.front_default
    imagen.classList.add ("imagenCard")
    
    typesData.forEach(typeObj => {
        if (typeObj) {
            // const type = document.createElement("p")
            // type.textContent = typeObj.name
            // type.classList.add ("typeCard")

            const typeImg = document.createElement("img")
            typeImg.src = typeObj.img
            typeImg.classList.add ("typeImgCard")
            
            // card.append (type)
            card.append (typeImg)
        }
    })
    card.prepend (title);
    card.prepend (imagen);

    const articleContainer = document.querySelector (".containerPokemon")
    if(articleContainer){
        articleContainer.append(card)
    }
}
