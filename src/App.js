import { useEffect, useState } from "react";
import "./App.css";
import Result from "./Result";
function App() {
  const [hesap, setHesap] = useState({
    usdrate: 5,
    eurrate: 5,
    kayit: "ithalat",
    price: 0,
    showResult: false,
  });

  useEffect(() => {
    const url = "https://api.exchangerate.host/convert?from=USD&to=TRY";
    const fetchExchangeRate = async () => {
      console.log("fetching usd try exchange rate");
      const usdresponse = await fetch(url);
      const usdrate = await usdresponse.json();
      const eurresponse = await fetch(
        "https://api.exchangerate.host/convert?from=EUR&to=TRY"
      );
      const eurrate = await eurresponse.json();
      setHesap((oldHesap) => {
        let newHesap = { ...oldHesap };
        newHesap.usdrate = usdrate.info.rate.toFixed(2);
        newHesap.eurrate = eurrate.info.rate.toFixed(2);
        return newHesap;
      });
    };
    fetchExchangeRate();
  }, []);

  const handlePriceChange = (e) => {
    console.log("handling price change");
    window.scrollTo({ top: 600, left: 0, behavior: "smooth" });

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
          <div className="form-item">
            {" "}
            <label htmlFor="number">Telefon Fiyatı $: </label>
            <input
              type="number"
              value={hesap.price === 0 ? " " : hesap.price}
              onChange={handlePriceChange}
              name="name"
            />
          </div>
          <div className="form-item">
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
          </div>
        </form>
        <input type="button" onClick={handleSubmit} value="Hesapla" />
        {hesap.showResult && (
          <Result
            tryprice={hesap.price * hesap.usdrate}
            kayit={hesap.kayit}
            eurRate={hesap.eurrate}
          />
        )}
      </main>
    </div>
  );
}

export default App;
