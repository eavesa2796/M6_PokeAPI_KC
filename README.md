
# Pokemon API Search Web App

## Description

This web app allows users to search for Pokemon by name or ID. It interacts with the [PokeAPI](https://pokeapi.co/) to fetch data about the requested Pokémon, including its name, type, and image. The information is dynamically displayed on the page, and error handling is provided for invalid inputs or when the Pokemon is not found.

## Features

- **Search by Name or ID**: Enter the name (e.g., "pikachu") or ID (e.g., "25") of a Pokemon in the input field.
- **Pokemon Data Display**: Upon a successful search, the Pokemon’s name, type, and image are displayed.
- **Floating Animation**: The Pokemon image floats above the background using CSS animations.
- **Error Handling**: If the Pokemon is not found, an error message is displayed with a fallback image.

## How to Use

1. **Enter a Pokemon Name or ID**:
   - Type the name (e.g., "pikachu") or ID (e.g., "25") of a Pokemon in the input field.
   
2. **Click "Search" or Press "Enter"**:
   - Click the search button or press "Enter" to trigger the search.
   
3. **View the Result**:
   - After the search is processed, the Pokemon's name, type, and image will be shown on the page.
   
4. **Handle Errors**:
   - If the Pokemon is not found, an error message is displayed.

## Technical Requirements

- **JavaScript**: Vanilla JavaScript used for functionality, including fetching data and dynamic DOM updates.
- **HTML/CSS**: Standard HTML structure, with custom CSS for styling and animations.
- **API Integration**: Fetches data from the [PokeAPI](https://pokeapi.co/) using JavaScript's Fetch API.
- **Animations**: The Pokemon image floats using a CSS animation (`@keyframes`).

## Code Breakdown

### HTML

- **Input Field**: Allows users to type a Pokemon name or ID.
- **Search Button**: Triggers the search functionality when clicked.
- **Image Area**: Displays the Pokemon’s image, name, and type after a successful search.
- **Error Handling**: Shows an error message and fallback image if the Pokemon is not found.

```html
<input id="pokemonNameOrId" type="text" placeholder="Enter the name or ID" />
<button id="submitBtn">Search</button>
<div id="imageArea" class="image-area d-none">
  <img id="pokemonImage" src="images/sad-pokemon.png" alt="Pokemon Image" />
  <p id="pokemonName"></p>
  <p id="pokemonType"></p>
</div>
```

### CSS

- **Styling**: Background color, borders, and layout designed using Bootstrap and custom CSS.
- **Floating Animation**: Pokemon image floats using a custom `@keyframes` animation.

```css
.pokemon-image {
  width: 300px;
  margin-left: 20%;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
```

### JavaScript

- **Asynchronous API Call**: Uses the `fetch` API to retrieve Pokemon data asynchronously.
- **Error Handling**: Catches errors if the Pokemon is not found, displaying a fallback image and error message.
- **Event Listeners**: Supports both button clicks and "Enter" key presses to trigger the search.

```javascript
async function getNameOrId(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) throw new Error("Pokemon not found!");
    const data = await response.json();
    document.getElementById("pokemonName").textContent = `Name: ${data.name.toUpperCase()}`;
    document.getElementById("pokemonImage").src = data.sprites.front_default;
    document.getElementById("pokemonType").textContent = `Type: ${data.types[0].type.name.toUpperCase()}`;
    document.getElementById("imageArea").classList.remove("d-none");
  } catch (error) {
    console.error("Problem fetching:", error.message);
    document.getElementById("pokemonImage").src = "/images/sad-pokemon.png";
    document.getElementById("pokemonName").textContent = "Problem fetching that Pokémon, please try again.";
    document.getElementById("pokemonType").textContent = "No Type Available";
    document.getElementById("imageArea").classList.remove("d-none");
  }
}
```

## Installation

1. Clone or download the repository.
2. Open the `index.html` file in a web browser.
3. Ensure your internet connection is active to fetch data from the PokeAPI.

## Conclusion

This project demonstrates how to fetch data from an external API using vanilla JavaScript and dynamically update the webpage based on the response. It also includes basic error handling and user feedback for a smooth experience.

