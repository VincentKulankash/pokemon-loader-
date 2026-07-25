const searchDiv = document.createElement('div');
document.body.appendChild(searchDiv);

const pokemonName = document.createElement('input');
pokemonName.type = 'text';
pokemonName.className = 'pokemon-input'
pokemonName.placeholder = 'Enter pokemon name';
searchDiv.appendChild(pokemonName);

const button = document.createElement('button');
button.textContent = 'Search';
button.className = 'search-btn'
searchDiv.appendChild(button);

const resultDiv = document.createElement('div');
resultDiv.className = 'result-container'
document.body.appendChild(resultDiv);

button.addEventListener('click', function searchPokemon(){
    let userInput = pokemonName.value.toLowerCase().trim();  

    resultDiv.classList.add('show');
    
    if (userInput === ''){
        resultDiv.textContent = 'Please enter a pokemon name!';
        return;
    }

    resultDiv.textContent = 'Searching.....';

    fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
    .then(response => {
        if(!response.ok){
            throw new Error('Could not fetch resource');
        }
        return response.json();
    })
    .then(data => {
        resultDiv.innerHTML = '';
        
        const name = document.createElement('h2');
        name.textContent = data.name.toUpperCase();
        resultDiv.appendChild(name);

        const sprite = document.createElement('img');
        sprite.src = data.sprites.front_default;
        sprite.alt = data.name;
        resultDiv.appendChild(sprite);
        
        const height = document.createElement('p');
        height.textContent = `Height: ${data.height / 10} m`;
        resultDiv.appendChild(height);
        
        const weight = document.createElement('p');
        weight.textContent = `Weight: ${data.weight / 10} kg`;
        resultDiv.appendChild(weight);
        
        const types = document.createElement('p');
        types.textContent = `Types: ${data.types.map(t => t.type.name).join(', ')}`;
        resultDiv.appendChild(types);
    })
    .catch(error => {
        resultDiv.textContent = 'Pokemon not found!';
        console.error(error);
    });
});