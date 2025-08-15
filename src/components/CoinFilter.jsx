import React from 'react'

const CoinFilter = ({ filter, setFilter}) => {
  return (
    <div className="filter">
        <input 
            type="text" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            placeholder='Filter coins by name or symbol'
        />
    </div>
  )
}

export default CoinFilter