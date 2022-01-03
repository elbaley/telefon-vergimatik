import { useEffect, useState } from "react";
import "./App.css";
import Result from "./Result";
function App() {
  const [hesap, setHesap] = useState({
    usdrate: 5,
    kayit: "ithalat",
    price: 0,
    showResult: false,
  });
  const url = "https://api.exchangerate.host/convert?from=USD&to=TRY";
  const fetchExchangeRate = async () => {
    console.log("fetching usd try exchange rate");
    const response = await fetch(url);
    const rate = await response.json();
    setHesap({ ...hesap, usdrate: rate.info.rate.toFixed(2) });
  };
  useEffect(() => {
    fetchExchangeRate();
  }, []);

  const handlePriceChange = (e) => {
    console.log("handling price change");
    setHesap({ ...hesap, price: e.target.value });
  };

  const handleRegisterChange = (e) => {
    console.log("handling register change");
    setHesap({ ...hesap, kayit: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log("handlesubmit");
    setHesap({ ...hesap, showResult: true });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>Telefon Vergimatik</h2>
        <h4>USD - TRY : {hesap.usdrate} </h4>
      </header>
      <main>
        <form>
          <label>
            Telefon Fiyatı $:
            <input
              type="number"
              value={hesap.price === 0 ? " " : hesap.price}
              onChange={handlePriceChange}
              name="name"
            />
          </label>
          <label htmlFor="kayityolu">Kayıt yolu:</label>
          <select
            value={hesap.kayit}
            onChange={handleRegisterChange}
            id="kayityolu"
            name="kayityolu"
          >
            <option value="ithalat">İthalat kayıtlı</option>
            <option value="pasaport">Pasaport kayıtlı</option>
          </select>
          <input type="button" onClick={handleSubmit} value="Submit" />
        </form>

        {hesap.showResult && (
          <Result tryprice={hesap.price * hesap.usdrate} kayit={hesap.kayit} />
        )}
      </main>
    </div>
  );
}

export default App;