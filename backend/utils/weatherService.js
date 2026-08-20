const axios = require('axios');

const getWeatherByCity = async (city) => {
  if (!city || !process.env.OPENWEATHER_API_KEY) return null;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const { data } = response;
    return {
      temp: Math.round(data.main.temp),
      description: data.weather[0]?.description,
      cityName: data.name,
    };
  } catch (error) {
    console.error(`Weather fetch error for ${city}:`, error.message);
    return null;
  }
};

module.exports = { getWeatherByCity };