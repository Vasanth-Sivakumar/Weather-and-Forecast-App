import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoApiOptions } from '../../api'


function Search ({onSearchChange}) {

  const [index, setIndex] = useState(null);

  const loadOptions = (inputValue) => {
    
    return fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${inputValue}`, geoApiOptions)
	  .then(response => response.json())
	  .then(response => {
      return {
        options: response.data.map((city) => { 
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    })
	  .catch(err => console.error(err));
  }

  const handleOnChange = (searchData) => {
    setIndex(searchData);
    onSearchChange(searchData);
  }

      return (
      <AsyncPaginate
      placeholder="Search for your city"
      debounceTimeout={600}
      value={index}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      />
    );
  }

export default Search;