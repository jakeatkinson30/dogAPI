import React, { useState, useEffect } from 'react';
import './imageGallery.css';

function ImageGallery({ breed, subBreed, count }) {
    const [images, setImages] = useState([]);
    const [showImages, setShowImages] = useState(true);
  
    useEffect(() => {
      if (showImages) {
        let url = `https://dog.ceo/api/breed/${breed}/images`;
        if (subBreed) {
          url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images`;
        }
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const imageData = data.message.slice(0, count);
            setImages(imageData);
          })
          .catch(error => console.log(error));
      }
    }, [breed, subBreed, count, showImages]);
    
    return (
      <>
        {showImages && (
          <div className='imageContainer'>
            {images.map(image => (
              <img key={image} src={image} alt={breed} className='imageGallery' />
            ))}
          </div>
        )}
      </>
    );
  };
  
  export default ImageGallery;