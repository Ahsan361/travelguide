const searchBtn = document.getElementById("btnSearch");
const clearBtn = document.getElementById("btnClear");
const keywordsInput = document.getElementById("keywords");
const homePageDiv = document.querySelector(".home_page");

let travelData = {};

// Fetch data once when page loads
fetch("./travel_recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    travelData = data;
  })
  .catch(err => console.error("Error loading travel data:", err));

// Handle search
searchBtn.addEventListener("click", function() {
  const keyword = keywordsInput.value.trim().toLowerCase();
  homePageDiv.innerHTML = "";

  if (!keyword) {
    homePageDiv.innerHTML = "<p>Please enter a keyword to search.</p>";
    return;
  }

  let category = "";

  if (keyword.includes("beach") || keyword.includes("beaches")) {
    category = "beaches";
  } else if (keyword.includes("temple") || keyword.includes("temples")) {
    category = "temples";
  } else if (keyword.includes("country") || keyword.includes("countries")) {
    category = "countries";
  } else {
    homePageDiv.innerHTML = `<p>No results found for "${keyword}". Try searching for "beach", "temple", or "country".</p>`;
    return;
  }

  displayResults(category);
});

// Display fetched results
function displayResults(category) {
  const places = travelData[category];
  if (!places || places.length === 0) {
    homePageDiv.innerHTML = "<p>No recommendations found.</p>";
    return;
  }

  let html = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)} Recommendations</h2>`;
  html += `<div class="results-container">`;

  places.forEach(place => {
    html += `
      <div class="place-card">
        <img src="${place.image}" alt="${place.name}">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
      </div>
    `;
  });

  html += `</div>`;
  homePageDiv.innerHTML = html;
}

// Clear button functionality
clearBtn.addEventListener("click", function() {
  keywordsInput.value = "";
  homePageDiv.innerHTML = `
    <h1>Welcome to Your Travel Guide</h1>
    <p>Explore amazing travel destinations around the world. 
    Get personalized recommendations, discover top attractions, 
    and plan your dream vacation effortlessly.</p>
  `;
});
