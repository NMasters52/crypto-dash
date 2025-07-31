import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {

  const [coins, setCoins] = useState(null);
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
        console.log(data);
        setCoins(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchCoins();
  }, [limit])

  return (
    <div>
      <h1>Crypto Dash 🚀</h1>
      {error}
    </div>
  )
}

export default App