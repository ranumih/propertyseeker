import React, { useState } from 'react'; // Import React and hooks
import properties from '../data/properties.json';

const searchImage = "/assets/Search-page-image.jpg";

// State variable 'criteria' to store the search criteria entered by the user
function SearchForm({ onSearch }) {
  const [criteria, setCriteria] = useState({
    type: 'any', // Property type, default set to "any"
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: '',
    dateBefore: '', // To filter properties between two dates
    postcode: '',
  });
  const [isFiltered, setIsFiltered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Month name to index mapping
    const monthNames = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    const filteredProperties = properties.properties.filter((property) => {
      if (criteria.type !== 'any' && property.type.toLowerCase() !== criteria.type) return false;
      if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;
      if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) return false;
      if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) return false;
      
      // Filter by Date Added After
      if (criteria.dateAfter) {
        const monthIndex = monthNames.indexOf(property.added.month.toLowerCase()); // Convert month name to index
        const propertyDate = new Date(property.added.year, monthIndex, property.added.day);
        if (propertyDate < new Date(criteria.dateAfter)) return false;
      }

      // Filter by Date Added Before
      if (criteria.dateBefore) {
        const monthIndex = monthNames.indexOf(property.added.month.toLowerCase()); // Convert month name to index
        const propertyDate = new Date(property.added.year, monthIndex, property.added.day);
        if (propertyDate > new Date(criteria.dateBefore)) return false;
      }

      if (criteria.postcode && !property.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())) return false;
      return true;
    });

    console.log('Filtered Properties:', filteredProperties);
    onSearch(filteredProperties);
    setIsFiltered(true);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleShowAll = () => {
    setCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAfter: '',
      dateBefore: '',
      postcode: '',
    });
    onSearch(properties.properties);
    setIsFiltered(false);
  };

  // Render the search form UI
  return (
    <div className="search-form-container">
      {/* Left Side Image */}
      <div className="left-image">
        <img src={searchImage} alt="Property Search" />
      </div>

      {/* Right Side Search Form */}
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form-grid">
          
          {/* Property Type Dropdown */}
          <div className="form-group full-width">
            <label htmlFor="type">Property Type</label>
            <select id="type" name="type" value={criteria.type} onChange={handleChange}>
              <option value="any">Any</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          {/* Minimum Price Input */}
          <div className="form-group">
            <label htmlFor="minPrice">Min Price (£)</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={criteria.minPrice}
              onChange={handleChange}
            />
          </div>

          {/* Maximum Price Input */}
          <div className="form-group">
            <label htmlFor="maxPrice">Max Price (£)</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={criteria.maxPrice}
              onChange={handleChange}
            />
          </div>

          {/* Minimum Bedrooms Dropdown */}
          <div className="form-group">
            <label htmlFor="minBedrooms">Min Bedrooms</label>
            <select
              id="minBedrooms"
              name="minBedrooms"
              value={criteria.minBedrooms}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* Maximum Bedrooms Dropdown */}
          <div className="form-group">
            <label htmlFor="maxBedrooms">Max Bedrooms</label>
            <select
              id="maxBedrooms"
              name="maxBedrooms"
              value={criteria.maxBedrooms}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* Date Added After Input */}
          <div className="form-group">
            <label htmlFor="dateAfter">Added After</label>
            <input
              type="date"
              id="dateAfter"
              name="dateAfter"
              value={criteria.dateAfter}
              onChange={handleChange}
            />
          </div>

          {/* Date Added Before Input */}
          <div className="form-group">
            <label htmlFor="dateBefore">Added Before</label>
            <input
              type="date"
              id="dateBefore"
              name="dateBefore"
              value={criteria.dateBefore}
              onChange={handleChange}
            />
          </div>

          {/* Postcode Dropdown */}
          <div className="form-group full-width">
            <label htmlFor="postcode">Postcode Area</label>
            <select
              id="postcode"
              name="postcode"
              value={criteria.postcode}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="BR%">BR5</option>
              <option value="y01">Y01</option>
              <option value="BD23">BD23</option>
              <option value="M3">M3</option>
              <option value="ba">H20</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="form-group search-button">
            <button type="submit" className="search-button">
              Search Properties
            </button>
          </div>

          {/* Show All Properties Button */}
          {isFiltered && (
            <div className="form-group show-all-button">
              <button type="button" className="show-all-button" onClick={handleShowAll}>
                Show All Properties
              </button>
            </div>
          )}
        </div>
      </form>  
    </div>        
  );
}

export default SearchForm;