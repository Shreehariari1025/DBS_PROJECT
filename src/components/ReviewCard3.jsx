import React from 'react'

function ReviewCard3() {
  return (
    <div>
        
        <div className='w-96 h-40 bg-gradient-to-br from-black to-red-950 rounded-3xl border border-red-50 font-[Inter] p-5 pt-3 flex flex-col items-left justify-start gap-2 relative'>

        <div className="w-16 h-8 bg-gradient-to-b from-red-50 to-red-500 rounded-tl-2xl rounded-tr-2xl border absolute right-4 -top-8 flex justify-evenly items-center text-black">
        <i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626 " }}></i>
            <div>8.8</div>
        </div>

        <div className='text-red-50/60 text-left'>Reviewed on date</div>
        <div className='text-xl text-left'>Mind-blowing and thought-provoking!</div>
        <button className='text-black w-44 h-10  bg-red-600 rounded-xl'>Read more</button>
        </div>
    </div>
  )
}

export default ReviewCard3