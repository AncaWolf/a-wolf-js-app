// creating IIFE
let pokemonRepository = (function () {

    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

    //  adding function addListItem
    function addListItem (pokemon) {
        let pokemonButtons = document.querySelector(".pokemon-buttons");
        let listItem = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-design");
        listItem.appendChild(button);
        pokemonButtons.appendChild(listItem);
        button.addEventListener("click", function(){
            showDetails(pokemon);
        });
    // add function showDetails - later edit(20230802) - modified code to use fetch
        function showDetails (pokemon) {
            loadDetails(pokemon).then(function () {
                console.log(pokemon);
            });            
        }
    }

    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();            
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // using fetch - loading data from external source
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();            
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    }

})()

// accesing IIFE objects
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


