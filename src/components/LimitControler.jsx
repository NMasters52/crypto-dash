import React from 'react'

const LimitControler = ({ limit, setLimit}) => {
  return (
    <div className="controls">
       <label htmlFor="limit">Show:</label> 
       <select 
            id="limit" 
            value={limit} 
            onChange={(e) => setLimit(e.target.value)}
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="50">50</option>
            <option value="100">100</option>
       </select>
    </div>
  )
}

export default LimitControler