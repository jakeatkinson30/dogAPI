import React, { useState } from 'react';
import Breeds from "../breeds/breeds";
import SubBreeds from "../subBreed/subBreed";
import ImageGallery from '../imageGallery/imageGallery';
import './App.css';

function App() {
  const [breed, setBreed] = useState('');
  const [subBreed, setSubBreed] = useState('');
  const [count, setCount] = useState(10);
  const [images, setImages]= useState([]);

  function handleSelectBreed(breed) {
    setBreed(breed);
    setSubBreed('');
  };

  function handleSelectSubBreed(subBreed) {
    setSubBreed(subBreed);
  };

  function handleSelectCount(event) {
    const count = parseInt(event.target.value);
    setCount(count);
  };

  function handleViewImages() {
    // Only show images if a breed is selected
    if (breed) {
      // If a sub-breed is selected, fetch images for that sub-breed
      if (subBreed) {
        fetchImages(`breed/${breed}/${subBreed}`);
      } else {
        // Otherwise, fetch images for the breed
        fetchImages(`breed/${breed}`);
      }
    }
  };
  
  function fetchImages(path) {
    const url = `https://dog.ceo/api/${path}/images/random/${count}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const images = data.message;
        setImages(images);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className='appContainer'>
        <div className='container'>
            <div className='selectContainer'>
                <Breeds onSelectBreed={handleSelectBreed} />
                <SubBreeds breed={breed} onSelectSubBreed={handleSelectSubBreed} />
                <select className='select' onChange={handleSelectCount}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        <ImageGallery breed={breed} subBreed={subBreed} count={count} />
        </div>
    </div>
  );
}

export default App;