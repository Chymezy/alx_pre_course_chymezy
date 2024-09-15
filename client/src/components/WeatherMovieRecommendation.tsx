import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWeatherMovieRecommendation } from '../services/api';

interface WeatherMovieRecommendationProps {
  onCitySubmit: (city: string, result?: any) => void;
  onMovieClick: (movie: any) => void;  // Add this line
  recommendation: any;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;  // Add this line
  error: string | null;
}

const WeatherMovieRecommendation: React.FC<WeatherMovieRecommendationProps> = ({ 
  onCitySubmit, 
  onMovieClick,  // Add this line
  recommendation, 
  isLoading,
  setIsLoading,  // Add this line
  error
}) => {
  const [city, setCity] = useState('');
  const [multipleCities, setMultipleCities] = useState<any[]>([]);
  const [localRecommendation, setLocalRecommendation] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setIsLoading(true);
      setSelectedCity(null);
      try {
        const result = await getWeatherMovieRecommendation(city);
        if (Array.isArray(result.weather) && result.weather.length > 1) {
          setMultipleCities(result.weather.slice(0, 2)); // Limit to 2 cities
          setLocalRecommendation(null);
        } else {
          setMultipleCities([]);
          setLocalRecommendation(result);
          setSelectedCity(city);
          onCitySubmit(city, result);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCitySelect = async (lat: number, lon: number, cityName: string) => {
    setIsLoading(true);
    try {
      const result = await getWeatherMovieRecommendation(cityName, lat, lon);
      setMultipleCities([]);
      setLocalRecommendation(result);
      setSelectedCity(cityName);
      onCitySubmit(cityName, result);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear': return '☀️';
      case 'clouds': return '☁️';
      case 'rain': return '🌧️';
      case 'snow': return '❄️';
      default: return '🌤️';
    }
  };

  const renderWeatherInfo = (weather: any) => {
    if (!weather || !weather.weather || !weather.weather[0]) {
      return <p>Weather information not available</p>;
    }

    return (
      <>
        <motion.span 
          className="text-4xl mr-4"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {getWeatherIcon(weather.weather[0].main)}
        </motion.span>
        <div>
          <h3 className="text-lg font-semibold dark:text-white">{weather.name} Weather</h3>
          <p className="dark:text-gray-300">{weather.weather[0].main}, {weather.main.temp}°C</p>
          <p className="text-sm dark:text-gray-400">{weather.sys.country}</p>
        </div>
      </>
    );
  };

  const displayRecommendation = localRecommendation || recommendation;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full flex flex-col">
      <div className="bg-blue-600 dark:bg-blue-800 p-4">
        <h2 className="text-xl font-semibold text-white">Weather-based Movie Recommendation</h2>
      </div>
      <div className="p-4 flex-grow flex flex-col overflow-hidden">
        <form onSubmit={handleSubmit} className="mb-4 flex-shrink-0">
          <div className="flex">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-grow border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter city name..."
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Get Recommendations'}
            </button>
          </div>
        </form>
        
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="loading" // Add this line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Loading...
            </motion.div>
          )}
          {error && (
            <motion.div
              key="error" // Add this line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          {multipleCities.length > 0 && (
            <motion.div
              key="multiple-cities" // Add this line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <h3 className="text-lg font-semibold mb-2">Multiple cities found. Please select one:</h3>
              <ul className="list-disc pl-5">
                {multipleCities.map((city, index) => (
                  <li key={index} className="mb-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                      onClick={() => handleCitySelect(city.coord.lat, city.coord.lon, city.name)}
                    >
                      {city.name}, {city.sys.country}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {selectedCity && (
            <motion.div
              key="selected-city" // Add this line
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-2 text-sm text-gray-600 italic"
            >
              Showing recommendations for {selectedCity}
            </motion.div>
          )}
          
          {displayRecommendation && (
            <motion.div
              key="recommendation" // Add this line
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-grow flex flex-col overflow-hidden"
            >
              <div className="mb-4 flex items-center flex-shrink-0">
                {renderWeatherInfo(displayRecommendation.weather)}
              </div>
              {displayRecommendation.movieRecommendations && (
                <div className="flex-grow overflow-auto">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Recommended Movies ({displayRecommendation.recommendedGenre}):</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-4">
                    {displayRecommendation.movieRecommendations.map((movie: any, index: number) => (
                      <motion.div 
                        key={index} 
                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg flex flex-col items-center cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onMovieClick(movie)}  // Add this line
                      >
                        {movie.poster_path && (
                          <div className="w-full aspect-[2/3] mb-2 overflow-hidden rounded-lg">
                            <img 
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm font-medium text-center dark:text-white line-clamp-2">{movie.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WeatherMovieRecommendation;