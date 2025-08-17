import React from 'react'
import CoinCard from "../components/CoinCard";
import LimitControler from "../components/LimitControler";
import CoinFilter from "../components/CoinFilter";
import SortSelector from "../components/SortSelector";
import Spinner from '../components/Spinner';

const HomePage = ({
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    isLoading,
    error
}) => {

const filteredCoins = 
    coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );
  })
  .slice()
  .sort((a,b) => {
    switch (sortBy) {
      case 'market_cap_desc' :
        return b.market_cap - a.market_cap;
      case 'market_cap_asc':
        return a.market_cap - b.market_cap;
      case 'price_desc':
        return b.current_price - a.current_price;
      case 'price_asc':
        return a.current_price - b.current_price;
      case 'change_desc':
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      case 'change_asc':
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
    }
  })

  return (
    <div>
      <h1>🏃‍➡️ Crypto Dash 💰</h1>
      {error && <p className='error'>{error}</p>}
      {isLoading && <Spinner color="white" />}

      <div className="top-controls">
        <CoinFilter filter={filter} setFilter={setFilter} />
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
        <LimitControler limit={limit} setLimit={setLimit} />
      </div>
      
      { !isLoading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? 
          (filteredCoins.map((coin) =>  <CoinCard key={coin.id} coin={coin} />)) : 
          (<p>No Coins Match</p>)}
        </main>
      )
      }
     
    </div>
  )
}

export default HomePage