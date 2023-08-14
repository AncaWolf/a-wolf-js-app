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
          showModal(item);
      }).catch(function (e) {
          console.error(e);
      });
  }

// adding modal to display Pokemon
      function showModal(pokemon) {
          let modalContainer = document.querySelector('#modal-container');

          modalContainer.innerHTML = '';
          let modal = document.createElement('div');
          modal.classList.add('modal');

          let closeButtonElement = document.createElement('button');
          closeButtonElement.classList.add('modal-close');
          closeButtonElement.innerText = "Close button";
          closeButtonElement.addEventListener('click', hideModal);

          let titleElement = document.createElement('h1');
          titleElement.innerText = pokemon.name;

          let imageElement = document.createElement('img');
          imageElement.classList.add('modal-img');
          imageElement.src = pokemon.imageUrl

          let heightElement = document.createElement('p');
          heightElement.innerText = 'Height: ' + pokemon.height;

          let typesElement = document.createElement('p');
          typesElement.innerText = 'Types: ' + pokemon.types;

          modal.appendChild(closeButtonElement);
          modal.appendChild(imageElement);
          modal.appendChild(titleElement);
          modal.appendChild(heightElement);
          modal.appendChild(typesElement);
          modalContainer.appendChild(modal);

          modalContainer.classList.add('is-visible');

          modalContainer.addEventListener('click', (e) => {
              let target = e.target;
              if (target === modalContainer) {
                  hideModal();
              }
          });
      }

  return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      // showDetails: showDetails,
      showModal: showModal
  }

})();

// accesing IIFE objects
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});

let dialogPromiseReject;

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');

  if(dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
  }
}

window.add('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
  }
});
