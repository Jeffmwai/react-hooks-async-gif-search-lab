import React, { useState, useEffect } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';
import axios from 'axios';

function GifListContainer() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&rating=g`
        );
        setGifs(response.data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching gifs:', error);
      }
    };

    if (searchTerm) {
      fetchGifs();
    }
  }, [searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <div>
      <GifSearch onSearch={handleSearch} />
      <GifList gifs={gifs} />
    </div>
  );
}

export default GifListContainer;
