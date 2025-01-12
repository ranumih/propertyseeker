import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchForm from './components/SearchForm';   
import PropertyList from './components/PropertyList';
import Favourites from './components/Favourites'; 
import propertiesData from './data/properties.json';

const properties = propertiesData.properties;

function Home() {
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearch = (filtered) => {
    setFilteredProperties(filtered);
  };

  return (
    <div>
      <Header/>
      <SearchForm onSearch={handleSearch} />
      <Favourites properties={properties}>
        {({ favorites, toggleFavorite }) => (
          <PropertyList 
            properties={filteredProperties} 
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
          />
        )}
      </Favourites>
      <Footer/>
    </div>
  );
}

export default Home;