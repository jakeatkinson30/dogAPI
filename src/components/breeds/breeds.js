import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './breeds.css';

function Breeds({ onSelectBreed }) {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const data = response.data.message;
        const breeds = Object.keys(data);
        setBreeds(breeds);
      })
      .catch(error => console.log(error));
  }, []);

  function handleSelectBreed(event) {
    const breed = event.target.value;
    onSelectBreed(breed);
  }

  return (
    <select className='select' onChange={handleSelectBreed}>
        <option value="" disabled selected hidden>Select Breed</option>
        {breeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
      ))}
    </select>
  );
};

export default Breeds; 
