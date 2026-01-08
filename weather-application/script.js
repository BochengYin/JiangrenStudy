document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const cityInput = document.getElementById('city-input');
    const weatherDisplay = document.getElementById('weather-display');
    const loadingDiv = document.getElementById('loading');
    const errorMessageDiv = document.getElementById('error-message');

    // DOM Elements for weather data
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();

        if (city) {
            await fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        // Reset UI state
        weatherDisplay.classList.add('hidden');
        errorMessageDiv.classList.add('hidden');
        errorMessageDiv.textContent = '';
        loadingDiv.classList.remove('hidden');

        try {
            // Step 1: Geocoding to get coordinates
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
            const geoResponse = await fetch(geoUrl);

            if (!geoResponse.ok) throw new Error('Failed to fetch location data');

            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error('City not found. Please try again.');
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // Step 2: Fetch Weather Data
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&wind_speed_unit=ms`;

            const weatherResponse = await fetch(weatherUrl);
            if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');

            const weatherData = await weatherResponse.json();
            displayWeather(weatherData, name, country);

        } catch (error) {
            errorMessageDiv.textContent = error.message;
            errorMessageDiv.classList.remove('hidden');
        } finally {
            loadingDiv.classList.add('hidden');
        }
    }

    function displayWeather(data, cityName, country) {
        const current = data.current;

        // Update DOM elements
        // Optionally update the input to the formal name found
        // cityInput.value = `${cityName}, ${country}`;

        temperature.textContent = `${Math.round(current.temperature_2m)}°C`;

        // Get description and icon based on WMO code
        const weatherInfo = getWeatherInfo(current.weather_code);
        description.textContent = weatherInfo.description;

        feelsLike.textContent = `${Math.round(current.apparent_temperature)}°C`;
        humidity.textContent = `${current.relative_humidity_2m}%`;
        windSpeed.textContent = `${current.wind_speed_10m} m/s`;

        // Set weather icon (using OpenWeatherMap icons for consistency)
        weatherIcon.src = `http://openweathermap.org/img/wn/${weatherInfo.icon}@4x.png`;
        weatherIcon.alt = weatherInfo.description;

        // Show the display
        weatherDisplay.classList.remove('hidden');
    }

    // Helper to map WMO Weather Codes to Description and Icon
    // Sourced from Open-Meteo docs + OpenWeatherMap icon matching
    function getWeatherInfo(code) {
        const map = {
            0: { desc: 'Clear sky', icon: '01d' },
            1: { desc: 'Mainly clear', icon: '02d' },
            2: { desc: 'Partly cloudy', icon: '03d' },
            3: { desc: 'Overcast', icon: '04d' },
            45: { desc: 'Fog', icon: '50d' },
            48: { desc: 'Depositing rime fog', icon: '50d' },
            51: { desc: 'Light drizzle', icon: '09d' },
            53: { desc: 'Moderate drizzle', icon: '09d' },
            55: { desc: 'Dense drizzle', icon: '09d' },
            56: { desc: 'Light freezing drizzle', icon: '13d' },
            57: { desc: 'Dense freezing drizzle', icon: '13d' },
            61: { desc: 'Slight rain', icon: '10d' },
            63: { desc: 'Moderate rain', icon: '10d' },
            65: { desc: 'Heavy rain', icon: '10d' },
            66: { desc: 'Light freezing rain', icon: '13d' },
            67: { desc: 'Heavy freezing rain', icon: '13d' },
            71: { desc: 'Slight snow fall', icon: '13d' },
            73: { desc: 'Moderate snow fall', icon: '13d' },
            75: { desc: 'Heavy snow fall', icon: '13d' },
            77: { desc: 'Snow grains', icon: '13d' },
            80: { desc: 'Slight rain showers', icon: '09d' },
            81: { desc: 'Moderate rain showers', icon: '09d' },
            82: { desc: 'Violent rain showers', icon: '09d' },
            85: { desc: 'Slight snow showers', icon: '13d' },
            86: { desc: 'Heavy snow showers', icon: '13d' },
            95: { desc: 'Thunderstorm', icon: '11d' },
            96: { desc: 'Thunderstorm with slight hail', icon: '11d' },
            99: { desc: 'Thunderstorm with heavy hail', icon: '11d' },
        };

        return map[code] || { desc: 'Unknown', icon: '50d' };
    }
});
