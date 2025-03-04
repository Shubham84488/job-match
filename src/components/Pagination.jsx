import React from 'react'

const Pagination = ({totalPosts,postsPerPage,setCurrentPage,currentPage}) => {
    let pages=[];

    for(var i=1;i<=Math.ceil(totalPosts/postsPerPage);i++){
        pages[i]=i;
    }
  return (
    <div className='flex gap-2 justify-center mb-4'>
        {pages.map((page,index)=>(
            <button key={index} 
            className={page == currentPage? 'bg-yellow-300 text-black font-extrabold border-black border-2 p-1 rounded-md': "border-2 p-1 rounded-md"}
            onClick={() => setCurrentPage(page)} >
                {page}
            </button>
        ))}
    </div>
  )
}

export default Pagination
