let pokemonList = [
    {name: "Bulbasaur", height: 70, types: ["grass", "poison"]},
    {name: "Ivysaur", height: 100, types: ["grass", "poison"]},
    {name: "Venusaur", height: 200, types: ["grass", "poison"]}
];
for (let i = 0; i < pokemonList.length; i++)
     if (pokemonList[i].height > 150) {
    document.write(pokemonList[i].name + " " + "(Height: " + pokemonList[i].height + ") - " + "Wow, that is big!" + "\n"); 
     }
    else { document.write(pokemonList[i].name + "(Height: " + pokemonList[i].height + ") " + "\n")
 }

