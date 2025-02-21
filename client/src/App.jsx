import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const jsonInput = JSON.parse(input);
      const res = await axios.post('http://localhost:8081/bfhl', jsonInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setOptions((prevOptions) =>
      prevOptions.includes(value)
        ? prevOptions.filter((option) => option !== value)
        : [...prevOptions, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { alphabets, numbers, highest_alphabet } = response;
    const selectedData = [];

    if (options.includes('Alphabets')) {
      selectedData.push(...alphabets);
    }
    if (options.includes('Numbers')) {
      selectedData.push(...numbers);
    }
    if (options.includes('Highest alphabet')) {
      selectedData.push(...highest_alphabet);
    }

    return (
      <div>
        <h3 className="text-xl font-bold mb-4">Response:</h3>
        <ul className="list-none p-0">
          {selectedData.map((item, index) => (
            <li key={index} className="bg-gray-200 my-2 p-4 rounded">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Your Roll Number</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Enter JSON input"
            rows="5"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <br />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {response && (
          <div className="mt-4">
            <label className="mr-4">
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleOptionChange}
                className="mr-2"
              />
              Alphabets
            </label>
            <label className="mr-4">
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleOptionChange}
                className="mr-2"
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest alphabet"
                onChange={handleOptionChange}
                className="mr-2"
              />
              Highest alphabet
            </label>
          </div>
        )}
        {renderResponse()}
      </div>
    </div>
  );
}

export default App;
