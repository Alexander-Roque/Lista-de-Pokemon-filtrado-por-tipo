REALIZACION DE LA TAREA DE LISTA DE POKEMONES
1) Mi proyecto se realizo con una estrategia estatica, utilizando html, css y javascript. Cada uno cumple sus funciones para lo que fueron diseñados
2) Cree mi index.html que contiene dentro del body la estructura mas importante, el
section que cumplira su rol de contenedor para mis dos articles, dentro del article
hay dos div, el primero que tiene el rol de contenedor para el titulo y el segundo
que contendra al form.
3) Construyo mi formulario agregando un div para contener los elementos del formulario
como select y option. El select le coloce una id y name para identificarlo cuando lo
utilize en javascripts, mientras que el option posee el value con los tipos de pokemon, colocamos tambien un boton con el tipo submit.
4) El segundo article que dejamos es donde se agregaran los pokemones con sus tipos
5) Pasando al Javascript, capturamos form y creamos un flap llamado searchId igual a 0, lo colocamos ya que nos ayudara a borrar los pokemons del filtro
6) Usamos el form capturado para ingresarle un evento listener con submit, luego
ingresamos una funcion asyn await llamada getPokemon(event)
7) Dentro del evento creamos un event.preventDefault() que preevera la ejecucion
de acciones predeterminadas, ademas de sumar dos veces el searchId cada vez que se detona el evento
8) creamos un try cath para ejecutar la peticion del requet con nuestro fetch a la 
url que deseamos y no olvidar la creacion de formData que nos permite crear clave-valor. Luego de haber obtenido los datos ya parseados de json que sera un
array, al ser un objeto iterable lo colocamos dentro de un for..of para recorrer los valores dentro del array
9) Dentro del for of creamos otro fetch ya que posee otra url, asi obtendremos los datos internos de todos los pokemones, creamos un nuevo array con const para guardar
los tipos que obtendremos de un nuevo for of, este for of nos ayudara a obtener los tipos de los pokemones y la imagenes.
10) Luego de eso obtendremos ya los datos listos para crea nuestra carta de pokemones, pero antes debemos crear las cartas para que aparescan en nuestra pagina
11) Creamos una funcion createCard con dos parametros, dentro de ella creamos un div con su clase pokemon-card, un p y un img para que se coloquen los nombres y imagenes de los pokemones. Para la segunda variable crearemos un forEach ya que como dijimos antes sobre crear un array nuevo sera este que sera recorrido de manera automatica para obtener las imagenes de los tipos de los pokemon
12) Finalmente organizamos los hijos de card para luego crear un append en el article
con el class containerPokemon
13) Para finalizar creamos los estilos para nuestro proyecto, jugando con los colores
y flex para obtener una pagina bien estilizada.