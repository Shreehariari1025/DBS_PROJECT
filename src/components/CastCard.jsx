import React from 'react';

function CastCard({ actorName, role, image }) {
  return (
    <div className='bg-red/0 w-48 h-48 font-[Inter] text-red-50 shrink-0'>
      <img className='w-48 h-48 rounded-full object-cover' src={image} alt={actorName} />
      <div className='flex flex-col items-center justify-evenly'>
        <div className='text-xl'>{actorName}</div>
        <div className='text-md text-red-50/50'>{role}</div>
      </div>
    </div>
  );
}

export default CastCard;
