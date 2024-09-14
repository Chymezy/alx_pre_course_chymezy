import express from 'express';
import { geminiApi } from '../services/gemini';
import { movieDbApi } from '../services/moviedb';
import { weatherApi } from '../services/weather';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await geminiApi.generateChatResponse(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

router.get('/movie', async (req, res) => {
  try {
    const { title } = req.query;
    if (typeof title !== 'string') {
      return res.status(400).json({ error: 'Invalid title parameter' });
    }
    const movies = await movieDbApi.searchMovie(title);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie information' });
  }
});

router.get('/weather-movie-recommendation', async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    if (typeof city !== 'string') {
      return res.status(400).json({ error: 'Invalid city parameter' });
    }

    let weatherData;
    if (lat && lon) {
      // If lat and lon are provided, get weather for specific coordinates
      weatherData = await weatherApi.getCurrentWeatherByCoordinates(Number(lat), Number(lon));
    } else {
      // Otherwise, get weather for multiple cities with the same name
      weatherData = await weatherApi.getCurrentWeatherForMultipleCities(city);
    }

    // If multiple cities are found, return the list without movie recommendations
    if (Array.isArray(weatherData) && weatherData.length > 1) {
      return res.json({ weather: weatherData });
    }

    // Use the first (or only) city's weather for movie recommendations
    const primaryWeather = Array.isArray(weatherData) ? weatherData[0] : weatherData;
    const weatherCondition = primaryWeather.weather[0].main.toLowerCase();
    
    let movieGenre = 'action'; // default
    if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
      movieGenre = 'drama';
    } else if (weatherCondition.includes('clear') || weatherCondition.includes('sun')) {
      movieGenre = 'comedy';
    } else if (weatherCondition.includes('cloud')) {
      movieGenre = 'mystery';
    } else if (weatherCondition.includes('snow')) {
      movieGenre = 'romance';
    }
    
    const movies = await movieDbApi.searchMovie(movieGenre);
    res.json({ 
      weather: primaryWeather, 
      movieRecommendations: movies.slice(0, 5),
      recommendedGenre: movieGenre
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather-based movie recommendation' });
  }
});

// Remove the '/rate-movie' route as it's no longer needed

export default router;