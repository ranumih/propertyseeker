import React, { useState, useEffect } from 'react';

const Favourites = ({ children, properties }) => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false); // State to manage the visibility of the favorites container
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  // Load favorites from local storage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (propertyId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(propertyId)) {
        return prevFavorites.filter(id => id !== propertyId); // Remove from favorites
      } else {
        return [...prevFavorites, propertyId]; // Add to favorites
      }
    });
  };

  const addToFavourite = (propertyId) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.includes(propertyId)) {
        return [...prevFavorites, propertyId]; // Add to favorites if not already present
      }
      return prevFavorites; // Return the existing favorites if already present
    });
  };

  const removeFromFavourite = (propertyId) => {
    setFavorites((prevFavorites) => {
      return prevFavorites.filter(id => id !== propertyId); // Remove from favorites
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('active');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('active');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('active');
    const propertyId = e.dataTransfer.getData('propertyId');
    addToFavourite(propertyId);
  };

  const handleDragStartRemove = (e, propertyId) => {
    e.dataTransfer.setData('propertyId', propertyId);
    e.currentTarget.classList.add('dragging');
    console.log(`Dragging to remove property with ID: ${propertyId}`);
    handleDragEndRemove(e);
  };

  const handleDragEndRemove = (e) => {
    const propertyId = e.dataTransfer.getData('propertyId'); 
    e.currentTarget.classList.remove('dragging');
    const dropZone = document.elementFromPoint(e.clientX, e.clientY);
    console.log("Dropzone"+ dropZone);
    if (!dropZone || !dropZone.classList.contains('favorites-container')) {
      removeFromFavourite(propertyId);
      console.log(`Removed property with ID: ${propertyId}`);
    }
  };

  const handleClearFavorites = () => {
    setShowClearConfirmation(true); 
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const confirmClearFavorites = () => {
    clearFavorites();
    setShowClearConfirmation(false);
  };

  const cancelClearFavorites = () => {
    setShowClearConfirmation(false); 
  };

  return (
    <div>
      <button 
        className="favorites-toggle" 
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? 'Hide Favourites' : 'Show Favourites'}
      </button>
      {showFavorites && (

        <div 
          className="favorites-container"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <h2>Favorite Properties</h2>
          {showClearConfirmation && (
            <div className="clear-confirmation">
              <p>Are you sure you want to clear all favorites?</p>
              <button className="clear-yes-btn confirm-btn" onClick={confirmClearFavorites}>Yes</button>
              <button className="clear-no-btn confirm-btn" onClick={cancelClearFavorites}>No</button>
            </div>
          )}
          <div>
            {favorites.length === 0 ? (
              <p>Drag properties here to add to favorites</p>
            ) : (
              properties
                .filter(property => favorites.includes(property.id))
                .map(property => (
                    <div
                        key={property.id}
                        className="favorite-item"
                        draggable
                        onDragStart={(e) => handleDragStartRemove(e,property.id)}
                        onDragEnd={handleDragEndRemove}
                    >
                    <img src={property.picture[0]} alt={property.title} className="favorite-item-img" />
                    <div>
                      <h4 className='name-in-fav'>{property.title}</h4>
                      <p className='price-in-fav'>£ {property.price}</p>
                      <button className="remove-fav-button" onClick={() => toggleFavorite(property.id)}>Remove</button>
                    </div>
                  </div>
                ))
            )}
          </div>
          <button onClick={handleClearFavorites} className="clear-fav-btn">Clear All</button>
        </div>
      )}
      {children({ favorites, toggleFavorite })}
    </div>
  );
};

export default Favourites;