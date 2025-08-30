const form = document.forms.list
let searchId = 0

form.addEventListener("submit", async function getPokemon(event) {
    event.preventDefault()
    searchId++
    const currentSearch = searchId

    // document.querySelectorAll(".pokemon-card"),forEach(card => card.remove())

    try{
        const formData = new FormData(form)
        const pokemon = formData.get("name")
        const selectedType = formData.get("type")

        const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
        const response = await fetch(`${URL}/pokemon/${pokemon}`)
        if (!response.ok) throw new Error("Pokémon no encontrado")
        const pokemonData = await response.json()

        for (const namePokemon of pokemonData.results) {
            
            if(currentSearch !== searchId) return
            
            const URL = namePokemon.url
            const response = await fetch(URL)
            const pokeDataIntert = await response.json()
            const typesData = []

            if (selectedType){
                const hasType = pokeDataIntert.types.some(t => t.type.name === selectedType)
                if (!hasType) continue
            }


            for (const types of pokeDataIntert.types) {
                const nameType = types.type.name
                const URL = types.type.url
                const response = await fetch (URL)
                const pokeTypeData = await response.json()
                const imgUrl = pokeTypeData.sprites["generation-viii"]["sword-shield"].name_icon
                typesData[types.slot - 1] = {name: nameType, img: imgUrl}
            }
            createCard(pokeDataIntert, typesData)
        }
    } catch (error){
        console.error(error)
    }
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
