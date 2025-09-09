const form:HTMLFormElement = document.forms.namedItem("list")!;
let searchId = 0
let globalPokemonData;

try {
    const typeUrl = "https://pokeapi.co/api/v2/type"
    const response = await fetch (`${typeUrl}`)
    const types:string[] = []

    if (!response.ok) throw new Error("Error fetching types")
        const typesData:{
    count: number,
    next: string,
    previous: null,
    results: {
        name: string,
        url: string,
    }[]} = await response.json();

    for (const typeInfo of typesData.results) {
        const allName = typeInfo.name
        types.push (allName)
    }
    const typeSelect = form.elements.namedItem("type")as HTMLSelectElement;
    types.forEach((type):void=>{
        const option = document.createElement("option")
        option.value = type;
        option.textContent = type;
        typeSelect.append(option)
    })
} catch (error) {
    console.error(error)
}

interface fetchPokemonTye {
    counter: number,
    next: string,
    previous: null,
    results: {
        name: string,
        url: string,
    }[]
}

async function fetchPokemon():Promise<fetchPokemonTye>{
    const formData = new FormData(form)
        const selectedType = formData.get("type")

        const URL = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
        const response = await fetch(`${URL}`)
        if (!response.ok) throw new Error("Pokémon no encontrado")
        const pokemonData:fetchPokemonTye = await response.json()
    return pokemonData
}

type pokemonDetailType = {
    id: number,
    name: string,
    types: {
        slot: 1,
        type: {
            name: string,
            url: string,
        }
    }[]
}

type pokemonDataIntType = pokemonDetailType[]


async function pokemonDataInt(pokemonData:fetchPokemonTye):Promise<pokemonDataIntType> {
    const allPokemonDetails:pokemonDataIntType = []
for (const namePokemon of pokemonData.results){
    const URL = namePokemon.url
    const response = await fetch(URL)
    const pokeDataIntert = await response.json()
    allPokemonDetails.push(pokeDataIntert)
    }
    return allPokemonDetails
}

// continuar desde aqui

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
