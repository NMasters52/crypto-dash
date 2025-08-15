import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
import LimitControler from "./components/LimitControler";
import CoinFilter from "./components/CoinFilter";
import SortSelector from "./components/SortSelector";
const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {

  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc')

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if(!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchCoins();
  }, [limit])

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
      <h1>Crypto Dash 🚀</h1>
      {error && <p className='error'>{error}</p>}
      {isLoading && <p>Loading...</p>}

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

export default App