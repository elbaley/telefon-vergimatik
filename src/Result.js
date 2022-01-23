import React from 'react';
import { useState, useEffect } from 'react';
import vergiHesapla from './utils/vergiHesapla';
import denemeResim from './images/testphone.png';
function Result({ tryprice, kayit, eurRate }) {
  // first create state array
  let vergicikler = vergiHesapla(tryprice, kayit, eurRate);
  //then declare the state with the array
  const [vergiler, setVergiler] = useState(vergicikler);
  useEffect(() => {
    console.log('either price or vergiler changed');
    //vergicikler = vergiHesapla(tryprice, vergicikler);
    setVergiler(vergiHesapla(tryprice, kayit, eurRate));
  }, [tryprice, kayit, eurRate]);
  const satisfiyati = tryprice + vergiler[vergiler.length - 1].miktar;
  const toplamvergioran = (
    (vergiler[vergiler.length - 1].miktar / tryprice) *
    100
  ).toFixed(0);
  let vergisizlikorani = 100 - toplamvergioran;
  if (toplamvergioran >= 100) {
    vergisizlikorani = 0;
  }
  return (
    <div>
      <h2>Sonuçlar</h2>
      <div className="result">
        <div className="result-item">
          <table role="grid">
            <tbody>
              <tr>
                <th className="vergi">Vergisiz Fiyat</th>
                <td className="vergi-fiyat">{tryprice.toFixed(0)}₺</td>
              </tr>
              {vergiler.map((vergi) => {
                return (
                  <tr key={vergi.id}>
                    <th
                      className={
                        vergi.name === 'Toplam Vergi' ? 'vergi-toplam' : 'vergi'
                      }
                    >
                      {vergi.name}
                      {vergi.oran !== 0 && '(%' + vergi.oran.toFixed(0) + ')'}
                    </th>
                    <td
                      className={
                        vergi.name === 'Toplam Vergi'
                          ? 'vergi-toplam-fiyat'
                          : 'vergi-fiyat'
                      }
                    >
                      {vergi.miktar.toFixed(0)}₺
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th className="satis">Tahmini Satış Fiyatı</th>
                <td className="satisFiyat">{satisfiyati.toFixed(0)}₺</td>
              </tr>
            </tbody>
          </table>
          <p
            style={{
              textAlign: 'start',
            }}
          >
            Asgari ücretle çalışan bir kişi bu telefonu hiç gideri yoksa
            yalnızca {(satisfiyati / 4250).toFixed(2)} ayda satın alabilir.
          </p>
        </div>
        <div className="result-item2">
          <div className="image-container">
            <img
              className="image-grey"
              alt="Vergili telefon grafiği"
              src={denemeResim}
            />
            <div
              style={{
                position: 'absolute',
                content: ' ',
                top: '0',
                left: '0',
                width: '100%',
                borderTopLeftRadius: '40px',
                borderTopRightRadius: '40px',
                height: toplamvergioran + '%',
                backgroundColor: 'rgba(255,0,0,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                content: ' ',
                bottom: '0',
                left: '0',
                width: '100%',

                borderBottomLeftRadius: '40px',
                borderBottomRightRadius: '40px',
                height: vergisizlikorani + '%',
                backgroundColor: 'rgb(16 151 32 / 58%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
