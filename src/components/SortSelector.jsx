import React from 'react'

const SortSelector = ({sortBy, setSortBy}) => {
  return (
    <div className="controls">
        <label htmlfor="sort">Sort by:</label>
        <select 
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
        >
            <option value='market_cap_desc'>Market Cap (High To Low)</option>
            <option value='market_cap_asc'>Market Cap (Low To High)</option>
            <option value='price_desc'>Price (High To Low)</option>
            <option value='price_asc'>Price (Low To High)</option>
            <option value='change_desc'>24h Change (High To Low)</option>
            <option value='change_asc'>24h Change (Low To High)</option>
        </select>
    </div>
  )
}

export default SortSelector