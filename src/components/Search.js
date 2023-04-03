import { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [bgColor, setBgColor] = useState('bg-blue-500');

  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get(`https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640&q=${searchTerm}&image_type=photo&pretty=true`);
      setResults(response.data.hits);
    };

    fetchResults();
  }, [searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(randomColor);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`container mx-auto ${bgColor}`}>
      <input
        type="text"
        className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 bg-white text-gray-800"
        placeholder="Search for images"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {results.map((result) => (
          <img
            key={result.id}
            src={result.webformatURL}
            alt={result.tags}
            className="w-full h-screen/4 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
