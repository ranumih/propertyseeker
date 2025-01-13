import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const PropertyView = ({ property, onClose }) => {
  const [mainImage, setMainImage] = useState(property.picture[0]);

  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

  return (
    <div className="property-view-overlay">
      <div className="property-view-container">
        <button className="close-button" onClick={onClose}>
          <i className="material-icons">close</i>
        </button>
        <div className="property-view-content">
          <div className="property-view-left">
            <div className="property-view-images">
              <img src={mainImage} alt={property.title} className="main-image" />
              <div className="thumbnails">
                {property.picture.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="thumbnail"
                    onClick={() => handleThumbnailClick(src)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="property-view-right">
            <div className="property-view-header">
              <h2>{property.title}</h2>
              <p>{property.location}</p>
            </div>
            <Tabs>
              <TabList>
                <Tab>Description</Tab>
                <Tab>Details</Tab>
                <Tab>Floorplan</Tab>
                <Tab>Map</Tab>
              </TabList>

              <TabPanel>
                <p style={{ textAlign: 'justify' }}>{property.description}</p>
              </TabPanel>
              <TabPanel>
              <div className="property-details-view">
                  <p><strong>Price:</strong> £{property.price}</p>
                  <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                  <p><strong>Tenure:</strong> {property.tenure}</p>
                  <p><strong>Postcode:</strong> {property.postcode}</p>
                </div>
              </TabPanel>
              <TabPanel>
                <img src={property.floorplan} alt="Floorplan" className="floorplan-image" />
              </TabPanel>
              <TabPanel>
                <div className="property-view-map">
                  <iframe title="Property Map" width="100%" height="100%"
                  src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                  />
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyView;