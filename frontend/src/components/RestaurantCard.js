import { IMG_CDN_URL } from '../constants';
import { FaStar } from 'react-icons/fa';

const RestaurantCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  sla,
  areaName,
  costForTwo,
  avgRatingString,
}) => {
  return (
    <div className='w-64 shadow-[-1px_5px_10px_5px_rgba(42,42,42,0.2)] p-2 m-5 cursor-pointer rounded hover:scale-[1.01]'>
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
        className='w-full rounded-md'
      />
      <h3 className='text-xl font-semibold'>{name}</h3>
      <h5 className='font-[lighter]'>{cuisines.join(', ')}</h5>
      <h5 className='font-[lighter]'>{areaName}</h5>
      <span className='flex justify-center items-center mt-4 mb-1 text-center'>
        <h4
          className={` flex justify-center font-[bolder] text-xs mt-2.5 px-0.5 py-0 ${
            avgRatingString < 4
              ? 'bg-red-500 rounded-md'
              : avgRatingString === '--'
              ? 'bg-white text-black'
              : 'bg-[#00ad1d] rounded-md'
          }`}
        >
          <i className='text-white font-semibold text-sm text-md p-1 pt-[6px]'>
            <FaStar />
          </i>
          <h1 className='text-white font-semibold text-sm text-md p-1'>
            {avgRatingString}
          </h1>
        </h4>
        <h4 className='mx-2'>•</h4>
        <h4 className='font-semibold'>
          {sla?.lastMileTravelString ?? '2.0 km'}
        </h4>
        <h4 className='mx-2'>•</h4>
        <h4 className='font-semibold'>{costForTwo ?? '₹200 for two'}</h4>
      </span>
    </div>
  );
};

export default RestaurantCard;
