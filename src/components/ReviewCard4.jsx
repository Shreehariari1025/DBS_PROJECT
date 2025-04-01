import React from 'react'

function ReviewCard4() {
  return (
    <div className='w-20xl h-52 bg-gradient-to-br from-black to-red-950 rounded-2xl border-1 border-red-50/25 font-[Inter] flex flex-col justify-evenly items-start p-4 relative'>
        <div className='text-red-50/60'>Reviewed on date</div>
        <div className="w-16 h-12 bg-red-950 rounded-tr-2xl border-1 absolute top-0 right-0">
            <div><i className="fa-sharp fa-solid fa-star fa-sm" style={{ color: "#dc2626 " }}></i></div>
            <div>8.8</div>
        </div>
        <div className='text-2xl'>Mind-blowing and thought-provoking!</div>
        <div className='text-red-50/70 text-xl '>Tenetur odio vitae alias omnis et dolor. Nisi veniam sint assumenda minus ipsum minus consequatur fugit. Porro aut voluptas. Nostrum molestiae velit sit maxime ratione. Repellendus minima porro id quia hic debitis possimus placeat cupiditate. Dolorem enim quia officiis eligendi suscipit reiciendis.</div>
        <div>By John Doe</div>
    </div>
  )
}

export default ReviewCard4