const apiKey = 'be073727542655e04db7e948e4bdb803'; // My API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    getWeather(city);
});

// --- ASYNC FETCH ---
async function getWeather(city) {
    try {
        // Template Literal: injects variables directly into the URL string
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        console.log("Fetching from:", url); // This lets you see the actual link being used

        // Await: pauses function execution until the server responds
        const response = await fetch(url);
        
        if (!response.ok) {
            console.log("Response Status:", response.status);
            throw new Error("City not found or API key inactive");
        }

        // Parsing: converts the raw stream from the server into a JS Object
        const data = await response.json();
        console.log("Data received:", data); 
        displayWeather(data);

    } catch (error) {
        // Error Handling: catches network failures or thrown Errors above
        console.error("Error Detail:", error);
        alert(error.message);
    }
}

function displayWeather(data) {
    const display = document.getElementById('weatherDisplay');
    display.classList.remove('hidden');
    
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('desc').innerText = data.weather[0].description;
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Logic-driven Styling: changes CSS based on data values
    const mainWeather = data.weather[0].main;
    if (mainWeather === "Clear") {
        document.body.style.background = "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)";
    } else if (mainWeather === "Rain" || mainWeather === "Drizzle") {
        document.body.style.background = "linear-gradient(135deg, #616161 0%, #9bc5c3 100%)";
    } else if (mainWeather === "Clouds") {
        document.body.style.background = "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)";
    }
}