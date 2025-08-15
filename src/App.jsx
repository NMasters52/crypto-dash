import { useEffect, useState } from "react";
import CoinCard from "./components/CoinCard";
import LimitControler from "./components/LimitControler";
const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {

  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [limit, setLimit] = useState(10);

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

  return (
    <div>
      <h1>Crypto Dash 🚀</h1>
      <div className="top-controls">
        <LimitControler limit={limit} setLimit={setLimit} />
      </div>
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      { !isLoading && !error && (
        <div className="grid">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
      )
      }
     
    </div>
  )
}

export default App