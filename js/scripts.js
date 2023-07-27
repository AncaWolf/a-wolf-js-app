// creating IIFE
let pokemonRepository = (function () {

    let pokemonList = [
        {
            name: 'Bulbasaur',
            height: 0.7,
            types: ["grass", "poison"]
        },
        {
            name: 'Ivysaur',
            height: 1,
            types: ["grass", "poison"]
        },
        {
            name: 'Venusaur',
            height: 2,
            types: ["grass", "poison"]
        },
        {
            name: 'Charmander',
            height: 0.6,
            types: ["fire"]
        },
        {
            name: 'Charmeleon',
            height: 1.1,
            types: ["fire"]
        }
    ]

    function getAll () {
        return pokemonList;
    }
// add function that allows only object data types to be added
    function add (pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
        pokemonList.push(pokemon);
        }else{
            console.log("wrong input for pokemon list")
        }
    }
    return {
        getAll: getAll,
        add: add
    }

})()

// accesing IIFE objects
pokemonRepository.getAll().forEach(function(pokemon) {
    document.write(pokemon.name + ' has a height of: ' + pokemon.height + "<br>");
});


