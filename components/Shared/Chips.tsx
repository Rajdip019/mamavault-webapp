import React from 'react'

interface Props{
    name : string
}

const Chip : React.FC<Props> = ({name}) => {
  return (
    <div className='px-4 py-2 text-md rounded-xl primary-color text-white bg-[#6061F6]'>
        {name}
    </div>
  )
}

export default Chip