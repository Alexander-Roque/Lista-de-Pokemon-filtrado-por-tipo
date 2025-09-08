const form = document.forms.list
let searchId = 0
let globalPokemonData;

try {
    const typeUrl = "https://pokeapi.co/api/v2/type"
    const response = await fetch (`${typeUrl}`)
    const types = []

    if (!response.ok) throw new Error("Error fetching types")
        const typesData = await response.json();

    for (const typeInfo of typesData.results) {
        const allName = typeInfo.name
        types.push (allName)
    }
    const typeSelect = form.elements.type;
    types.forEach((type)=>{
        const option = document.createElement("option")
        option.value = type;
        option.textContent = type;
        typeSelect.append(option)
    })
} catch (error) {
    console.error(error)
}

async function fetchPokemon(){
    const formData = new FormData(form)
        const selectedType = formData.get("type")

        const URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
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
        const articleContainer = document.querySelector (".containerPokemon")
        articleContainer.innerHTML = ""

        const formData = new FormData(form)
        const selectedType = formData.get("type")

        const allPokemon = await fetchPokemon()
        const allDataInter = await pokemonDataInt(allPokemon)

        for (const pokemones of allDataInter){
            const types = await filterByType(pokemones)
            
            if(selectedType === "all" || types.some(t => t.name === selectedType)){
                createCard (pokemones, types)
            }
        }
    }catch (error) {
        console.error(error);
    }
 })


const TypeSelectChange = document.getElementById ("type")

function createCard (pokemon, types){
    const card = document.createElement ("div")
    card.classList.add ("pokemon-card")

    const title = document.createElement ("p")
    title.textContent = pokemon.name
    title.classList.add ("title-card")

    const imagen = document.createElement ("img")
    imagen.src = pokemon.sprites.front_default
    imagen.classList.add ("imagen-card")
    
    types.forEach(t => {
        
        const type = document.createElement("p")
        type.textContent = t.name
        type.classList.add ("type-card")
    
        const typeImg = document.createElement("img")
        typeImg.src = t.url
        typeImg.classList.add ("type-img-card")
    
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
