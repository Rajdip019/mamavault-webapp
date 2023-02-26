import React from 'react'

interface Props{
    name : string
}

const Tag : React.FC<Props> = ({name}) => {
  return (
    <div className='primary-color w-fit px-4 py-1 text-xs rounded-xl mb-5 text-white bg-[#6061F6]'>
        {name}
    </div>
  )
}

export default Tag