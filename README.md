
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
        <input
          id="pokemonNameOrId"
          type="text"
          class="form-control mb-3"
          id="formControlInput"
          placeholder="Enter the name or ID"
        />
        <button type="submit" id="submitBtn" class="btn btn-primary w-100">
          Search
        </button>
        <div id="imageArea" class="image-area d-none mt-5 py-4">
          <div class="overlay">
            <img
              id="pokemonImage"
              class="pokemon-image floating"
              src="images/sad-pokemon.png"
              alt="Pokemon Image"
            />
            <p
              id="pokemonName"
              class="content text-end text-dark fw-bold me-3"
            ></p>
            <p
              id="pokemonType"
              class="content text-end text-dark fw-bold me-3"
            ></p>
          </div>
        </div>
```

### CSS

- **Styling**: Background color, borders, and layout designed using Bootstrap and custom CSS.
- **Floating Animation**: Pokemon image floats using a custom `@keyframes` animation.

```css
.pokemon-image {
  width: 300px;
  margin-left: 20%;
}
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
```

### JavaScript

- **Asynchronous API Call**: Uses the `fetch` API to retrieve Pokemon data asynchronously.
- **Error Handling**: Catches errors if the Pokemon is not found, displaying a fallback image and error message.
- **Event Listeners**: Supports both button clicks and "Enter" key presses to trigger the search.

```javascript
  async function getNameOrId(pokemon) {
    try {
      searchButton.disabled = true; // Disable button to prevent multiple requests while fetching

      // Determine whether the input is a number (ID) or a string (name)
      const query = isNaN(pokemon) ? pokemon.toLowerCase() : pokemon;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );

      // Check if the response is valid; otherwise, throw an error
      if (!response.ok) {
        throw new Error(`Pokemon not found! (${response.status})`);
      }

      const data = await response.json(); // Convert response to JSON

      // Update the displayed Pokemon name
      pokemonName.textContent = `Name: ${data.name.toUpperCase()}`;

      // Set the Pokemon image, or display a fallback image if unavailable
      pokemonImage.src =
        data.sprites?.front_default || "/images/sad-pokemon.png";
      pokemonImage.alt = data.name;

      // Display Pokemon type
      pokemonType.textContent = `Type: ${data.types[0].type.name.toUpperCase()}`;

      // Ensure the image area is visible
      imageArea.classList.remove("d-none");
    } catch (error) {
      console.error("Problem fetching:", error.message);

      // Handle error: show a fallback image and display an error message
      pokemonImage.src = "/images/sad-pokemon.png";
      pokemonImage.alt = "Pokemon Not Found";
      pokemonName.textContent =
        "Problem fetching that Pokemon, please try again.";
      pokemonType.textContent = "No Type Available";

      // Ensure the image area is visible even when an error occurs
      imageArea.classList.remove("d-none");
    } finally {
      searchButton.disabled = false; // Re-enable the search button
    }
  }
```

## Installation

1. Clone or download the repository.
2. Open the `index.html` file in a web browser.
3. Ensure your internet connection is active to fetch data from the PokeAPI.

## Conclusion

This project demonstrates how to fetch data from an external API using vanilla JavaScript and dynamically update the webpage based on the response. It also includes basic error handling and user feedback for a smooth experience.

