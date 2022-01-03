import React, { useEffect, useState } from "react";
function Result({ tryprice, kayit }) {
  const [vergi, setVergi] = useState([
    { id: 0, name: "Kültür Bakanlığı", oran: 1 },
    { id: 1, name: "TRT bandrolu", oran: 10 },
    { id: 2, name: "OTV", oran: 25 },
    { id: 3, name: "KDV", oran: 18 },
    { id: 4, name: "Toplam vergi", oran: 63.87 },
    { id: 5, name: "Satış fiyatı", fiyat: 0 },
  ]);
  useEffect(() => {
    if (tryprice > 640) {
      console.log("vergi cakiliyor");
      setVergi((oldVergiOranlari) => {
        let newVergiOranlari = [...oldVergiOranlari];
        newVergiOranlari[2].oran = 40;
        newVergiOranlari[4].oran = 83.54;
        newVergiOranlari[5].fiyat = (tryprice * 1.8354).toFixed(2);
        return newVergiOranlari;
      }); //set OTV Vergisi
    }
    if (tryprice > 1500) {
      let newVergiOranlari = [...vergi];
      newVergiOranlari[2].oran = 50;
      newVergiOranlari[4].oran = 96.55;
      newVergiOranlari[5].fiyat = (tryprice * 1.9655).toFixed(2);
      setVergi(newVergiOranlari);
    }
  }, [tryprice]);

  if (!tryprice) return <br />;
  return (
    <div>
      I am result {tryprice} {kayit} <h2>Sonuçlar</h2>
      <ul>
        {vergi.map((vergi) => {
          const vergilendirilmisFiyat = (tryprice * vergi.oran) / 100;
          if (!vergi.oran) {
            return (
              <li key={vergi.id}>
                {vergi.name} = {vergi.fiyat}₺
              </li>
            );
          }
          return (
            <li key={vergi.id}>
              {vergi.name} (%{vergi.oran}) = {vergilendirilmisFiyat.toFixed(2)}₺
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Result;
