import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './subBreed.css';

function SubBreeds({ breed, onSelectSubBreed }) {
  const [subBreeds, setSubBreeds] = useState([]);

  useEffect(() => {
    axios.get(`https://dog.ceo/api/breed/${breed}/list`)
      .then(response => {
        const data = response.data.message;
        setSubBreeds(data);
      })
      .catch(error => console.log(error));
  }, [breed]);

  function handleSelectSubBreed(event) {
    const subBreed = event.target.value;
    onSelectSubBreed(subBreed);
  }

  return (
    <select className='select' onChange={handleSelectSubBreed}>
      <option value="">Select sub-breed</option>
      {subBreeds.map(subBreed => (
        <option key={subBreed} value={subBreed}>{subBreed}</option>
      ))}
    </select>
  );
};

export default SubBreeds;
