// creating IIFE
let pokemonRepository = (function () {

  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll () {
      return pokemonList;
  }
// add function that allows only object data types to be added
  function add (pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
      }else{
          console.log('wrong input for pokemon list')
      }
  }

  //  adding function addListItem
  function addListItem (pokemon) {
      let pokemonButtons = document.querySelector('.list-group');
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-info'); // add Bootstrap button utility class
      button.setAttribute('data-target', '#modal-container'); // add data-target attribute
      button.setAttribute('data-toggle', 'modal'); // add data-toggle attribute
      listItem.appendChild(button);
      pokemonButtons.appendChild(listItem);
      button.addEventListener('click', function () {
          showDetails(pokemon);
      });
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
        // showModal(item);
    }).catch(function (e) {
        console.error(e);
    });
  }

  // add function showDetails - later edit(20230802) - modified code to use fetch. edit 14 August: modified for Bootstrap modal
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {

            const modalContainer = document.getElementById('modal-container');
            const modalTitle = document.getElementById('modal-title');
            const modalHeight = document.getElementById('modal-height');
            const modalImage = document.getElementById('modal-image');
            const modalClose = document.getElementById('modal-close');

            modalTitle.textContent = 'Name: ' + item.name;
            modalHeight.textContent = 'Height: ' + item.height;
            modalImage.setAttribute('src', item.imageUrl);
            modalImage.setAttribute('alt', item.name);

            modalClose.addEventListener('click', function () {
              modalContainer.style.display = 'none';
            });

            modalContainer.style.display = 'block';
          });           
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

  return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
    }
})();

// accesing IIFE objects
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  })
});
