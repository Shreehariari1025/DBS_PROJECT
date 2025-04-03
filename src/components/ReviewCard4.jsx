import React from 'react';
import { FaStar } from 'react-icons/fa';

function ReviewCard4({ review }) {
  // Format the review date nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='w-20xl h-52 bg-gradient-to-br from-black to-red-950 rounded-2xl border-1 border-red-50/25 font-[Inter] flex flex-col justify-evenly items-start p-4 relative mb-4'>
      {/* Review Date */}
      <div className='text-red-50/60'>
        Reviewed on {formatDate(review.review_date)}
      </div>
      
      {/* Rating */}
      <div className="w-16 h-12 bg-red-950 rounded-tr-2xl border-1 absolute top-0 right-0 flex flex-col items-center justify-center">
        <div className="flex items-center">
          <FaStar className="text-red-500 mr-1" />
          <span>{review.rating}</span>
        </div>
      </div>
      
      {/* Review Heading */}
      <div className='text-2xl font-medium'>
        {review.review_heading}
      </div>
      
      {/* Review Content */}
      <div className='text-red-50/70 text-xl'>
        {review.review_text}
      </div>
      
      {/* Reviewer Name */}
      <div className="text-red-50/80">
        By {review.user_name || 'Anonymous'}
      </div>
    </div>
  );
}

export default ReviewCard4;