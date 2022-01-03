import { useEffect, useState } from "react";
import "./App.css";
import Result from "./Result";
function App() {
  // const [appState, setAppState] = useState({
  //   usdrate: 5,
  //   kayit: "ithalat",
  //   tryprice: 0,
  //   showResult: false,
  // });
  const [usdrate, setUsdRate] = useState(0);
  const [kayit, setKayit] = useState("ithalat");
  const [tryprice, setTryprice] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const url = "https://api.exchangerate.host/convert?from=USD&to=TRY";
  const fetchExchangeRate = async () => {
    const response = await fetch(url);
    const rate = await response.json();

    setUsdRate(rate.info.rate.toFixed(2));
  };
  useEffect(() => {
    console.log("hello len");
    fetchExchangeRate();
  }, []);

  const handleSubmit = (e) => {
    if (tryprice > 0) {
      setShowResult(true);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h2>Telefon Vergimatik</h2>
        <h4>USD - TRY : {usdrate} </h4>
      </header>
      <main>
        <form>
          <label>
            Telefon Fiyatı $:
            <input
              type="number"
              value={tryprice === 0 ? " " : tryprice}
              onChange={(e) => {
                setTryprice(e.target.value);
              }}
              name="name"
            />
          </label>
          <label htmlFor="kayityolu">Kayıt yolu:</label>
          <select
            value={kayit}
            onChange={(e) => {
              setKayit(e.target.value);
            }}
            id="kayityolu"
            name="kayityolu"
          >
            <option value="ithalat">İthalat kayıtlı</option>
            <option value="pasaport">Pasaport kayıtlı</option>
          </select>
          <input type="button" onClick={handleSubmit} value="Submit" />
        </form>

        {showResult && <Result tryprice={tryprice * usdrate} kayit={kayit} />}
      </main>
    </div>
  );
}

export default App;
