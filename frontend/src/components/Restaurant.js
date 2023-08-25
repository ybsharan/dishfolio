// import { restaurantList } from '../constants';
import RestaurantCard from './RestaurantCard';
import { useState, useEffect } from 'react';
import { SWIGGY_API_URL } from '../constants';
import { Link } from 'react-router-dom';
import { filterData } from '../utils/helper';

const Restaurant = () => {
  const [searchText, setSearchText] = useState('');
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // use useEffect for one time call getRestaurants using empty dependency array
  useEffect(() => {
    getRestaurants();
  }, []);

  // async function getRestaurant to fetch Swiggy API data
  async function getRestaurants() {
    // handle the error using try... catch
    try {
      const response = await fetch(SWIGGY_API_URL);
      const json = await response.json();

      // initialize checkJsonData() function to check Swiggy Restaurant data
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }

      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurants(resData);
      setFilteredRestaurants(resData);
    } catch (error) {
      console.log(error);
    }
  }

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchText, restaurants) => {
    if (searchText !== '') {
      const filteredData = filterData(searchText, restaurants);
      setFilteredRestaurants(filteredData);
      setErrorMessage('');
      if (filteredData?.length === 0) {
        setErrorMessage('No matches restaurant found');
      }
    } else {
      setErrorMessage('');
      setFilteredRestaurants(restaurants);
    }
  };

  // if allRestaurants is empty don't render restaurants cards
  if (!allRestaurants) return null;

  return (
    <>
      <div className='my-6 flex justify-center items-center box-border '>
        <input
          type='text'
          className='p-2 w-96 border-solid border-2 border-gray-500 rounded-[5px_0px_0px_5px] '
          placeholder='Search for restaurants and food...'
          value={searchText}
          // update the state variable searchText when we typing in input box
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className='p-2 w-24 -ml- border-solid border-2 border-gray-500 rounded-[0px_5px_5px_0px] bg-gray-600 text-white hover:bg-gray-500'
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && (
        <div className='text-center font-bold text-2xl'>{errorMessage}</div>
      )}

      {/* if restaurants data is not fetched then display Shimmer UI after the fetched data display restaurants cards */}
      {allRestaurants?.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className='flex flex-wrap m-4 mt-5 justify-center items-center self-stretch'>
          {/* We are mapping restaurants array and passing JSON array data to RestaurantCard component as props with unique key as restaurant.data.id */}
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                to={'/restaurant/' + restaurant?.info?.id}
                key={restaurant?.info?.id}
              >
                <RestaurantCard {...restaurant?.info} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Restaurant;
