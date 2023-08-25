import { useParams } from 'react-router-dom'; // import useParams for read `resId`
import {
  SWIGGY_API_RESTAURANT_MENU_URL,
  IMG_CDN_URL,
  ITEM_IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
} from '../constants';

import useResMenuData from '../Hooks/useResMenuData';
import { FaStar } from 'react-icons/fa';

const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, menuItems] = useResMenuData(
    SWIGGY_API_RESTAURANT_MENU_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );

  return !restaurant ? (
    <h1>Loading...</h1>
  ) : (
    <div className='mt-12 min-h-[80vh] w-auto'>
      <div className='flex h-[250px] justify-center items-center bg-[#373535] text-[white]'>
        <img
          className='w-[250px] h-[170px] rounded'
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div className='flex flex-col basis-[520px] m-5'>
          <h2 className='text-[40px] max-w-[540px]'>{restaurant?.name}</h2>
          <p className='whitespace-nowrap opacity-70 text-[15px] max-w-[540px]'>
            {restaurant?.cuisines?.join(', ')}
          </p>
          <div className='flex justify-between items-center text-xs font-semibold max-w-[340px] mt-[18px] pb-2.5'>
            <div
              className={`flex items-center gap-1 rounded px-2 py-1 ${
                restaurant?.avgRating < 4
                  ? 'bg-red-500'
                  : restaurant?.avgRating === '--'
                  ? 'bg-white text-black'
                  : 'bg-green-500 text-white'
              }`}
            >
              <i className='text-white font-semibold text-sm text-md p-1 pt-[6px]'>
                <FaStar />
              </i>
              <span>{restaurant?.avgRating}</span>
            </div>
            <div className='restaurant-rating-slash'>|</div>
            <div>{restaurant?.sla?.slaString}</div>
            <div className='restaurant-rating-slash'>|</div>
            <div>{restaurant?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
        <div className='mt-8 w-9/12'>
          <div className='p-5'>
            <h3 className='text-base font-medium'>Recommended</h3>
            <p className='leading-[1.3] text-[rgba(40,44,63,0.45)] tracking-[-0.3px] text-base mt-3.5'>
              {menuItems.length} ITEMS
            </p>
          </div>
          <div className='flex flex-col justify-center'>
            {menuItems.map((item) => (
              <div
                className='flex justify-between p-5 max-h-[250px] border-solid border-b-[1px] border-gray-600'
                key={item?.id}
              >
                <div className='flex flex-col items-start overflow-hidden'>
                  <h3 className='w-7/12 text-lg font-semibold'>{item?.name}</h3>
                  <p className='mt-1 text-base font-semibold text-gray-900'>
                    {item?.price > 0
                      ? new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                        }).format(item?.price / 100)
                      : ' '}
                  </p>
                  <p className='leading-[1.3] text-[rgba(40,44,63,0.45)] w-3/5 tracking-[-0.3px] text-base mt-3.5'>
                    {item?.description}
                  </p>
                </div>
                <div className='flex flex-col justify-center items-end w-52 overflow-hidden'>
                  {item?.imageId && (
                    <img
                      className='h-24 w-24 rounded'
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className='bg-gray-600 text-white cursor-pointer outline-none mt-1 p-1 px-3 rounded hover:bg-gray-400 shadow-md'>
                    {' '}
                    ADD +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
