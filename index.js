document.addEventListener("DOMContentLoaded", async () => {
    const weatherContainer = document.getElementById("weather");
  
    try {
      // Fetch weather data
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto"
      );
      const data = await response.json();
      console.log(data);
      
  
      // Extract current weather details
      const currentTemp = data.current.temperature_2m;
      const humidity = data.current.relative_humidity_2m;
      const windSpeed = data.current.wind_speed_10m;
      const currentTime = data.current.time

    //   console.log(date);
      
  
      // Extract daily forecast
      const forecast = data.daily;
      const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  
      // Generate HTML for the UI
      let forecastHTML = "";
      for (let i = 0; i < days.length; i++) {
        forecastHTML += `
          <div class="forecast-item">
            <p>${days[i]}</p>
            <p>${forecast.temperature_2m_max[i]}°</p>
            <p>${getWeatherDescription(forecast.weathercode[i])}</p>
          </div>
        `;
      }
  
      // Set the HTML content
      weatherContainer.innerHTML = `
        <div class="weather-card">
         <h1>${currentTime}°</h1>
          <h1>${currentTemp}°</h1>
          <p>Rain Shower</p>
          <div class="weather-details">
            <p><strong>Feels Like:</strong> ${currentTemp}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} km/h</p>
          </div>
          <div class="forecast">${forecastHTML}</div>
        </div>
      `;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      weatherContainer.innerHTML = "<p>Failed to load weather data.</p>";
    }
  });
  
  // Function to return weather description based on code
  function getWeatherDescription(code) {
    const weatherConditions = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Fog",
      51: "Drizzle",
      61: "Rain Shower",
      80: "Rain Showers",
      95: "Thunderstorm",
    };
    return weatherConditions[code] || "Unknown";
  }
  getWeatherDescription(code)