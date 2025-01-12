import React, { useState } from 'react';
import PropertyView from './PropertyView';

function PropertyList({ properties, favorites, toggleFavorite }) {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="property-list">
      {properties.map(property => (
        <div
          key={property.id}
          className="property-card"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('propertyId', property.id);
          }}
        >
          <img
            src={property.picture[0]}
            alt={property.title}
            className="property-image"
          />
          <div className="property-info">
            <h3 className="property-title">{property.title}</h3>
            <p className="property-price">£ {property.price}</p>
            <p className="property-details">
              {property.bedrooms} bedrooms • {property.type}
            </p>
            <p className="property-details">{property.shortDescription}</p>
            <button
              onClick={() => toggleFavorite(property.id)}
              className="favorite-button"
            >
              {favorites.includes(property.id) ? '❤️' : '🤍'}
            </button>
            <button className="view-details-button" onClick={() => handleViewDetails(property)}>View Details</button>
          </div>
        </div>
      ))}
      {selectedProperty && (
        <PropertyView property={selectedProperty} onClose={handleCloseDetails} />
      )}
    </div>
  );
}

export default PropertyList;