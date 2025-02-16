// Wait for the document to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
  // Get references to HTML elements
  const searchButton = document.getElementById("submitBtn");
  const inputField = document.getElementById("pokemonNameOrId");
  const imageArea = document.getElementById("imageArea");
  const pokemonName = document.getElementById("pokemonName");
  const pokemonImage = document.getElementById("pokemonImage");
  const pokemonType = document.getElementById("pokemonType");

  // Function to fetch Pokemon data from the API
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

  // Function to handle search input and trigger the API call
  function handleSearch() {
    const pokemonNameOrId = inputField.value.trim(); // Get user input and remove extra spaces

    // If input is empty, log a message, add border-red class, and exit the function
    if (!pokemonNameOrId) {
      console.log("You need an input first!");
      inputField.classList.add("border-red");
      return;
    }

    inputField.classList.remove("border-red");

    getNameOrId(pokemonNameOrId); // Call the function to fetch Pokemon data
  }

  // Add event listener for search button click
  searchButton.addEventListener("click", handleSearch);

  // Allow pressing "Enter" to trigger the search
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });
});
